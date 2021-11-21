import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MemberManagement from "../MemberManagement/MemberManagement";
import santaApi from "../../api/santaApi";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  let params = useParams();
  let teamID = params.teamid;
  let teamName = params.teamname;

  const [members, setMembers] = useState();
  const [newMember, setNewMember] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMember = (member) => {
    const token = localStorage.getItem("token");
    console.log(token);
    santaApi
      .createMember(teamID, member, token)
      .then((result) => {
        console.log(result);
        updateMembersList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMembersList = () => {
    setIsLoading(true);
    santaApi
      .getTeamMembers(teamID)
      .then((result) => {
        console.log(result);
        setMembers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteMember = (id) => {
    console.log(id, "is going to be deleted");
    const userToken = localStorage.getItem("token");
    console.log(userToken);
    santaApi
      .deleteMember(id, userToken)
      .then((result) => {
        console.log(result);
        updateMembersList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateMembersList();
  }, []);

  return (
    <div className='members-zone'>
      <p>Hello</p>
      <div className='dashboard'>
        <h2>Create a new Team</h2>
        <div>
          <input
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button
            type='button'
            onClick={() => {
              handleCreateMember(newMember);
            }}>
            Create Member
          </button>
        </div>
        <h2 className='dashboard-title'>
          List of existing Members for {teamName}
        </h2>
        {isLoading ? <LoadingSpinner /> : null}
        {members ? (
          Array.from(members).map((member, index) => (
            <MemberManagement
              key={index}
              member={member}
              handleDeleteTeam={handleDeleteMember}
            />
          ))
        ) : (
          <p>You have not created any member yet</p>
        )}
      </div>
      <Link to='/dashboard' className='dahsboard-button'>
        Go Back to Teams
      </Link>
    </div>
  );
}
