import React from "react";
import { Link } from "react-router-dom";

import "./Team.css";

import TeamCard from "../TeamCard/TeamCard";

export default function Team({ memberList }) {
  return (
    <div className='team-zone'>
      <p className='team-text'>My Santa Team</p>
      {memberList
        ? Array.from(memberList).map((member, index) => (
            <TeamCard key={index} member={member} />
          ))
        : null}
      <Link to='/' className='back-button'>
        Go Back
      </Link>
    </div>
  );
}
