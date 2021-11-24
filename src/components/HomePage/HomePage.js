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
            <p className='page-message'>
              Enter your team secret ID to view your team, <br />
              update your member profile and draw your giftee
            </p>
            <input
              className='page-input'
              value={teamID}
              placeholder='Enter your team secret ID'
              onChange={(e) => setTeamID(e.target.value)}
            />
            <button
              className='show-button'
              type='button'
              onClick={() => {
                setSelectedTeam(teamID);
              }}>
              Confirm Existing Team ID
            </button>
            {!isLoggedIn ? (
              <>
                <p>- OR -</p>
                <button
                  type='button'
                  className='show-button'
                  onClick={signinClick}>
                  Sign in to create a new team
                </button>
              </>
            ) : (
              <>
                <p>- OR -</p>
                <Link className='show-button' to='/dashboard'>
                  Create and manage teams
                </Link>
              </>
            )}
          </>
        ) : null}
        {selectedTeam ? (
          <>
            <Link to='/update' className='show-button'>
              Update your profile
            </Link>
            <p className='show-text_between'> - OR - </p>
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
