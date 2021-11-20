import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./TeamView.css";

export default function TeamView({ selectedTeam, setSelectedTeam }) {
  const [teamID, setTeamID] = useState("");

  return (
    <div className='show-zone'>
      <p className='show-text'>Ready for Santa?</p>
      {!selectedTeam ? (
        <>
          <input value={teamID} onChange={(e) => setTeamID(e.target.value)} />
          <button
            type='button'
            onClick={() => {
              setSelectedTeam(teamID);
            }}>
            Confirm Team ID
          </button>
        </>
      ) : null}
      {selectedTeam ? (
        <>
          <Link to='/team' className='show-button'>
            View your Team
          </Link>
          <p className='show-text_between'> - OR - </p>
          <Link to='/draw' className='show-button'>
            Draw your Santa Giftee
          </Link>
        </>
      ) : null}
    </div>
  );
}
