import React from "react";
import "./MemberManagement.css";

export default function MemberManagement({ member, handleDeleteMember }) {
  return (
    <div className='teammgt-item'>
      <div>
        <h3 className='teammgt-title'>{member.name}</h3>
        <p>Team Private ID = {member._id}</p>
      </div>
      <div className='teammgt-actions'>
        <button
          type='button'
          onClick={() => {
            handleDeleteMember(member._id);
          }}
          className='dashboard-button dashboard-button_secondary'>
          Delete Team
        </button>
      </div>
    </div>
  );
}
