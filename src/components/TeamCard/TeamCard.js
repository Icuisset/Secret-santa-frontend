import React from "react";

import "./TeamCard.css";

export default function TeamCard({ member }) {
  return (
    <div className='team-card'>
      <img
        src={member.avatar}
        alt='member avatar'
        className='team-card__avatar'
        width='200'
        height='200'
      />
      <div className='team-card__text-zone'>
        <p className='team-card__text team-card__text_script'>Dear SANTA,</p>
        <p className='team-card__text'>{member.message}</p>
        <p className='team-card__text team-card__signature'>{member.name}</p>
      </div>
    </div>
  );
}
