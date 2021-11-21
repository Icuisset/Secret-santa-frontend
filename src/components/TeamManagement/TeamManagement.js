import React from "react";
import "./TeamManagement.css";

export default function TeamManagement({ team, handleViewMembers }) {
  return (
    <div className='teamslist-item'>
      <div>
        <h3>{team.name}</h3>
        <p>TEAM ID = {team._id}</p>
      </div>
      <button
        type='button'
        onClick={() => {
          handleViewMembers(team._id);
        }}
        className='dashboard-button'>
        View Members
      </button>
    </div>
  );
}
