/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "./PopupWithForm.css";

function PopupWithForm(props) {
  /* only to test CSS for now */

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay' />
      <div
        className={`popup__container popup__container_type_${props.popupName}`}>
        <form
          className={`popup__form popup__form_type_${props.popupName}`}
          method='POST'
          name={props.popupName}
          onSubmit={props.onSubmit}>
          <h3 className='popup__title'>{props.title}</h3>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
