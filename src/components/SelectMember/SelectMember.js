import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonCTA from "../ButtonCTA/ButtonCTA";
import "./SelectMember.css";

export default function SelectMember({ memberList }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [memberURL, setMemberURL] = useState("");

  const handleSelection = () => {
    console.log("Im clicked");
    const newSelectedMember = memberList.filter(
      (member) => member.name === selectedName
    );
    setSelectedMember(newSelectedMember);
    console.log(newSelectedMember);
    const newMemberURL = "/members/" + newSelectedMember[0]._id;
    console.log(newMemberURL);
    setMemberURL(newMemberURL);
    setIsConfirmed(true);
  };

  return (
    <>
      <h1 className='page-title'>Secret Santa 2021</h1>
      <div className='select-zone'>
        <h2 className='select-title'>What is your name?</h2>
        <select
          name='choice'
          className='select-menu'
          onChange={(event) => setSelectedName(event.target.value)}
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
        {!isConfirmed ? (
          <>
            <button
              type='button'
              onClick={handleSelection}
              className='confirm-button'>
              Confirm selection
            </button>
          </>
        ) : (
          <Link to={memberURL} className='confirm-button'>
            Go to your profile
          </Link>
        )}
      </div>
    </>
  );
}
