import React, { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import santaApi from "../../api/santaApi";
import TeamManagement from "../TeamManagement/TeamManagement";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./Dashboard.css";

export default function Dashboard() {
  const currentUser = useContext(UserContext);

  const [teams, setTeams] = useState();
  const [newTeam, setNewTeam] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const userToken = localStorage.getItem("token");
    console.log(userToken);
    santaApi
      .getUserTeams(userToken)
      .then((result) => {
        console.log(result);
        setTeams(result);
        setIsLoading(false);
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

  const handleDeleteTeam = (id) => {
    console.log(id, "is going to be deleted");
    const userToken = localStorage.getItem("token");
    console.log(userToken);
    santaApi
      .deleteTeam(id, userToken)
      .then((result) => {
        console.log(result);
        updateTeamsList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='dashboard'>
      <h2>Create a new Team</h2>
      <div>
        <input
          className='dashboard-input'
          type='text'
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
        />
        <button
          className='dashboard-button'
          type='button'
          onClick={() => {
            handleCreateTeam(newTeam);
          }}>
          Create Team
        </button>
      </div>
      <h2 className='dashboard-title'>
        List of existing Teams for {currentUser}
      </h2>
      {isLoading ? <LoadingSpinner /> : null}
      {teams ? (
        Array.from(teams).map((team, index) => (
          <TeamManagement
            key={index}
            team={team}
            handleViewMembers={handleViewMembers}
            handleDeleteTeam={handleDeleteTeam}
          />
        ))
      ) : (
        <p>You have not created any team yet</p>
      )}
    </div>
  );
}
