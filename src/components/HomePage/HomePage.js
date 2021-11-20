import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./HomePage.css";

export default function TeamView({
  selectedTeam,
  setSelectedTeam,
  signinClick,
  isLoggedIn,
}) {
  const [teamID, setTeamID] = useState("");

  return (
    <>
      <h1 className='page-title'>Secret Santa 2021</h1>
      <div className='show-zone'>
        {!selectedTeam ? (
          <>
            <input value={teamID} onChange={(e) => setTeamID(e.target.value)} />
            <button
              type='button'
              onClick={() => {
                setSelectedTeam(teamID);
              }}>
              Confirm Existing Team ID
            </button>
            {!isLoggedIn ? (
              <>
                <p>- OR -</p>
                <button type='button' onClick={signinClick}>
                  Sign in to create a new team
                </button>
              </>
            ) : null}
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
    </>
  );
}
