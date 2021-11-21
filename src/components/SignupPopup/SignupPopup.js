import React, { useState, useCallback } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

import "./SignupPopup.css";

function SignupPopup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [inputsAreValid, setInputsAreValid] = React.useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");

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

  const handleUsernameChange = (event) => {
    setName(event.target.value);
    setUsernameErrorMessage(event.target.validationMessage);
    setInputsAreValid(event.target.closest("form").checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    props.onSignup({
      name,
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
      usernameValue = "",
      usernameMessage = "",
      inputsValid = false
    ) => {
      setEmail(emailValue);
      setEmailErrorMessage(emailMessage);
      setPassword(passwordValue);
      setPasswordErrorMessage(passwordMessage);
      setName(usernameValue);
      setUsernameErrorMessage(usernameMessage);
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
    setEmail("");
    setEmailErrorMessage("");
    setPassword("");
    setPasswordErrorMessage("");
    setName("");
    setUsernameErrorMessage("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      popupName={"signup"}
      title={"Sign up"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      alternativeLink={"Sign in"}>
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
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailErrorMessage ? (
            <span id='profileEmail-error' className='popup__input-error'>
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
              className='popup__input-error_doubleline'>
              {passwordErrorMessage}
            </span>
          ) : null}
        </div>
        <div className='form__input-zone'>
          <label className='form__label' htmlFor='name'>
            Username
          </label>
          <input
            id='name'
            className='form__input'
            name='usernameInput'
            placeholder='Enter your username'
            type='text'
            value={name}
            onChange={handleUsernameChange}
            required
            minLength={2}
            maxLength={30}
          />
          {usernameErrorMessage ? (
            <span id='userName-error' className='popup__input-error_doubleline'>
              {usernameErrorMessage}
            </span>
          ) : null}
        </div>
        {props.isNotAvailableEmail ? (
          <span id='emailnotavailable-error' className='popup__email-error'>
            This email is not available
          </span>
        ) : null}
      </div>
      <button
        type='submit'
        className={`popup__button ${
          !inputsAreValid && "popup__button_deactivated"
        }`}
        aria-label='submit button'>
        Sign up
      </button>
      <div className='popup__alternative-link-zone'>
        <p className='popup__alternative-text'>or</p>
        <button
          type='button'
          className='popup__alternative-link'
          onClick={props.signinClick}>
          Sign in
        </button>
      </div>
    </PopupWithForm>
  );
}

export default SignupPopup;
