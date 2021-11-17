import React from "react";

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
    </div>
  );
}
