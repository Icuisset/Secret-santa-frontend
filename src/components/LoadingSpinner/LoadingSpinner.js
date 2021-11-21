import React from "react";

import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className='results-loading'>
      <i className='circle-preloader'></i>
      <p className='results-loading__message'>Searching for Santa...</p>
    </div>
  );
}

export default LoadingSpinner;
