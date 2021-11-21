import React from "react";
import { Link } from "react-router-dom";
import "./TeamManagement.css";

export default function TeamManagement({
  team,
  handleViewMembers,
  handleDeleteTeam,
}) {
  const teamLink = "/" + team.name + "/" + team._id;
  return (
    <div className='teammgt-item'>
      <div>
        <h3 className='teammgt-title'>{team.name}</h3>
        <p>Team Private ID = {team._id}</p>
      </div>
      <div className='teammgt-actions'>
        <Link
          to={teamLink}
          onClick={() => {
            handleViewMembers(team._id);
          }}
          className='dashboard-button'>
          View Members
        </Link>
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
