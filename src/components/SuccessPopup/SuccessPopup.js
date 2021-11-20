/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "./SuccessPopup.css";

function SuccessPopup(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay' onClick={props.onClose} />
      <div
        className={`popup__container popup__container_type_${props.popupName}`}>
        <h3 className='popup__title-message'>
          Registration successfully completed!
        </h3>
        <button
          type='button'
          className='popup__next-link'
          href='#'
          onClick={props.signinClick}>
          Sign in
        </button>
        <button
          type='button'
          className='close-button'
          aria-label='close button'
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default SuccessPopup;
