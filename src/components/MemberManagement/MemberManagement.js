import React from "react";
import { Link } from "react-router-dom";
import "./MemberManagement.css";

export default function MemberManagement() {
  return (
    <div className='members-zone'>
      <p>Hello</p>
      <Link to='/dashboard' className='dahsboard-button'>
        Go Back to Teams
      </Link>
    </div>
  );
}
