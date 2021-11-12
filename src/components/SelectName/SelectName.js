import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SelectName.css";

export default function SelectName({ memberList }) {
  const availableList = memberList.filter(
    (member) => member.available === true
  );

  const [selectedName, setSelectedName] = useState("");
  const [activeList, setActiveList] = useState(availableList);

  const changeSelection = (newName) => {
    setSelectedName(newName);
    console.log(newName);
    const newActiveList = availableList.filter(
      (member) => member.name !== newName
    );
    setActiveList(newActiveList);
    console.log(newActiveList);
  };

  const handleClick = () => {
    console.log("Find your happy Santee!");
  };

  return (
    <div className='selectname-zone'>
      <h2>What is your name?</h2>
      <select
        name='choice'
        onChange={(event) => changeSelection(event.target.value)}
        value={selectedName}>
        <option value=''>-- Please select your name --</option>
        {Array.from(memberList).map((member, index) => (
          <option key={index} value={member.name}>
            {member.name}
          </option>
        ))}
      </select>
      {selectedName !== "" ? (
        <Link to='/giftee' className='confirm-button'>
          Show me my Santa Giftee!
        </Link>
      ) : null}
    </div>
  );
}
