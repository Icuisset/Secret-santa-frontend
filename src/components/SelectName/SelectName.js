import React from "react";
import { Link } from "react-router-dom";
import "./SelectName.css";

export default function SelectName({
  memberList,
  selectedName,
  changeSelection,
  pickSantaGiftee,
}) {
  return (
    <div className='selectname-zone'>
      <h2>What is your name?</h2>
      <select
        name='choice'
        onChange={(event) => changeSelection(event.target.value)}
        value={selectedName}>
        <option value=''>-- Please select your name --</option>
        {memberList
          ? Array.from(memberList).map((member, index) => (
              <option key={index} value={member.name}>
                {member.name}
              </option>
            ))
          : null}
      </select>
      {selectedName !== "" ? (
        <Link to='/giftee' className='confirm-button' onClick={pickSantaGiftee}>
          Show me my Santa Giftee!
        </Link>
      ) : null}
    </div>
  );
}
