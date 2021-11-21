import React from "react";
import "./TeamManagement.css";

export default function TeamManagement({
  team,
  handleViewMembers,
  handleDeleteTeam,
}) {
  return (
    <div className='teamslist-item'>
      <div>
        <h3>{team.name}</h3>
        <p>Team ID = {team._id}</p>
      </div>
      <div>
        <button
          type='button'
          onClick={() => {
            handleViewMembers(team._id);
          }}
          className='dashboard-button'>
          View Members
        </button>
        <button
          type='button'
          onClick={() => {
            handleDeleteTeam(team._id);
          }}
          className='dashboard-button dashboard-button_secondary'>
          Delete Team
        </button>
      </div>
    </div>
  );
}
