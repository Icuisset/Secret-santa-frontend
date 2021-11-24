import React from "react";
import { Link } from "react-router-dom";
import "./MemberManagement.css";

export default function MemberManagement({ member, handleDeleteMember }) {
  const profileLink = "/members/" + member._id;
  return (
    <div className='membermgt-item'>
      <div>
        <h3 className='membermmgt-title'>{member.name}</h3>
      </div>
      <div className='membermgt-actions'>
        <Link to={profileLink} className='teammgt-button'>
          View Profile
        </Link>
        <button
          type='button'
          onClick={() => {
            handleDeleteMember(member._id);
          }}
          className='membermgt-button membermgt-button_secondary'>
          Delete Member
        </button>
      </div>
    </div>
  );
}
