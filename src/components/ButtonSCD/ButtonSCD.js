import React from "react";
import "./ButtonSCD.css";

export default function ButtonSCD({ children, onClick }) {
  return (
    <button type='button' className='button-SCD' onClick={onClick}>
      {children}
    </button>
  );
}
