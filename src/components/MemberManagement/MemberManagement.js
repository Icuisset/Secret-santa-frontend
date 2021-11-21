import React from "react";
import "./MemberManagement.css";

export default function MemberManagement({ member, handleDeleteMember }) {
  return (
    <div className='membermgt-item'>
      <div>
        <h3 className='membermmgt-title'>{member.name}</h3>
        <p>Team Private ID = {member._id}</p>
      </div>
      <div className='membermgt-actions'>
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
