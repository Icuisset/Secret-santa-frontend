import React from "react";
import "./ButtonCTA.css";

export default function ButtonCTA({ children, onClick }) {
  return (
    <button type='button' className='button-CTA' onClick={onClick}>
      {children}
    </button>
  );
}
