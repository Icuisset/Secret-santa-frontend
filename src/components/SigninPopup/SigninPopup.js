import React, { useState, useCallback } from "react";
import UserContext from "../../contexts/CurrentUserContext";

import "./SigninPopup.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function SigninPopup(props) {
  const user = React.useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* below states are only to test CSS for now */
  const [inputsAreValid, setInputsAreValid] = React.useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrorMessage(event.target.validationMessage);
    setInputsAreValid(event.target.closest("form").checkValidity());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordErrorMessage(event.target.validationMessage);
    setInputsAreValid(event.target.closest("form").checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    props.onSignin({
      email,
      password,
    });
    resetForm();
  };

  const resetForm = useCallback(
    (
      emailValue = "",
      emailMessage = "",
      passwordValue = "",
      passwordMessage = "",
      inputsValid = false
    ) => {
      setEmail(emailValue);
      setEmailErrorMessage(emailMessage);
      setPassword(passwordValue);
      setPasswordErrorMessage(passwordMessage);
      setInputsAreValid(inputsValid);
    },
    [
      setEmail,
      setEmailErrorMessage,
      setPassword,
      setPasswordErrorMessage,
      setInputsAreValid,
    ]
  );

  React.useEffect(() => {
    setEmail(user.email);
    setEmailErrorMessage("");
    setPassword("");
    setPasswordErrorMessage("");
  }, [user, props.isOpen]);

  return (
    <PopupWithForm
      popupName={"signin"}
      title={"Sign in"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className='form__inputs-zone'>
        <div className='form__input-zone'>
          <label className='form__label' htmlFor='profileEmail'>
            Email
          </label>
          <input
            id='profileEmail'
            className='form__input'
            name='emailInput'
            placeholder='Enter email'
            type='email'
            value={email || ""}
            onChange={handleEmailChange}
            required
          />
          {emailErrorMessage ? (
            <span id='profileEmail-error' className='popup__input-error_email'>
              {emailErrorMessage}
            </span>
          ) : null}
        </div>
        <div className='form__input-zone'>
          <label className='form__label' htmlFor='profilePassword'>
            Password
          </label>
          <input
            id='profilePassword'
            className='form__input'
            name='passwordInput'
            placeholder='Enter password'
            type='text'
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={2}
            maxLength={40}
          />
          {passwordErrorMessage ? (
            <span
              id='profilePassword-error'
              className='popup__input-error_password'>
              {passwordErrorMessage}
            </span>
          ) : null}
        </div>
        {props.isWrongCredentials ? (
          <span id='credentials-error' className='popup__credentials-error'>
            Please enter correct email address and password.
          </span>
        ) : null}
      </div>
      <button
        type='submit'
        className={`popup__button ${
          !inputsAreValid && "popup__button_deactivated"
        }`}
        aria-label='submit button'>
        Sign in
      </button>
    </PopupWithForm>
  );
}

export default SigninPopup;
