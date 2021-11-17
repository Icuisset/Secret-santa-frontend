import React from "react";
import { Link } from "react-router-dom";

import "./TeamView.css";

export default function TeamView() {
  return (
    <div className='show-zone'>
      <p className='show-text'>Everyone is ready for Santa!</p>
      <Link to='/team' className='show-button'>
        View my Team
      </Link>
      <p className='show-text_between'> - OR - </p>
      <Link to='/draw' className='show-button'>
        Draw your Santa Giftee
      </Link>
    </div>
  );
}
