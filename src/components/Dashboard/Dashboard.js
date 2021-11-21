import React, { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import santaApi from "../../api/santaApi";
import TeamManagement from "../TeamManagement/TeamManagement";
import "./Dashboard.css";

export default function Dashboard() {
  const currentUser = useContext(UserContext);

  const [teams, setTeams] = useState();
  const [newTeam, setNewTeam] = useState();

  const handleCreateTeam = (team) => {
    const token = localStorage.getItem("token");
    console.log(token);
    santaApi
      .createTeam(team, token)
      .then((result) => {
        console.log(result);
        updateTeamsList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTeamsList = () => {
    const userToken = localStorage.getItem("token");
    console.log(userToken);
    santaApi
      .getUserTeams(userToken)
      .then((result) => {
        console.log(result);
        setTeams(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateTeamsList();
  }, [currentUser]);

  const handleViewMembers = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <div className='dashboard'>
      <h2>Create a new Team</h2>
      <div>
        <input value={newTeam} onChange={(e) => setNewTeam(e.target.value)} />
        <button
          type='button'
          onClick={() => {
            handleCreateTeam(newTeam);
          }}>
          Create Team
        </button>
      </div>
      <h2>List of existing teams for {currentUser}</h2>
      {teams ? (
        Array.from(teams).map((team, index) => (
          <TeamManagement
            key={index}
            team={team}
            handleViewMembers={handleViewMembers}
          />
        ))
      ) : (
        <p>You have not created any team yet</p>
      )}
    </div>
  );
}
