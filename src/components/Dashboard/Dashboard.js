import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import santaApi from "../../api/santaApi";
import "./Dashboard.css";

export default function Dashboard() {
  const currentUser = useContext(UserContext);

  const [teams, setTeams] = useState();

  useEffect(() => {
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
  }, [currentUser]);

  return (
    <div className='dashboard'>
      <p>I will manage dashboard here for {currentUser}</p>
      {teams ? (
        Array.from(teams).map((team, index) => (
          <div>
            {team.name} {team._id}
          </div>
        ))
      ) : (
        <p>You have not created any team yet</p>
      )}
    </div>
  );
}
