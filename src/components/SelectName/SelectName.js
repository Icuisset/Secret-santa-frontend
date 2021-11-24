import React from "react";
import { Link } from "react-router-dom";
import "./SelectName.css";

export default function SelectName({
  memberList,
  selectedName,
  changeSelection,
  pickSantaGiftee,
  selectedMember,
}) {
  return (
    <>
      <h1 className='page-title'>Secret Santa 2021</h1>
      <div className='select-zone'>
        <h2 className='select-title'>What is your name?</h2>
        <select
          name='choice'
          className='select-menu'
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
          <>
            <Link
              to='/giftee'
              className='confirm-button'
              onClick={pickSantaGiftee}>
              Draw your Santa Giftee!
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
}
