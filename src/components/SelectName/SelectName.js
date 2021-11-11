import React, { useEffect } from 'react';
import { useState } from 'react';
import './SelectName.css';

export default function SelectName({memberList}) {

    const [selectedName, setSelectedName] = useState("");
    const [activeList, setActiveList] =useState([]);

    const availableList = memberList.filter((member)=>(member.available === true));

    const initialList = Array.from(availableList).map((member,index)=>(member.name));

    const changeSelection = (newName) =>{
        setSelectedName(newName);
        console.log(newName);
    };

    useEffect(() => {
        const newActiveList = initialList.filter((name)=>(name !==selectedName));
        setActiveList(newActiveList);
        console.log(newActiveList);
    }, [selectedName]);


    return (
        <div className="selectname-zone">
            <h2>What is your name?</h2>
            <select name="choice"onChange={(event) => changeSelection(event.target.value)}
          value={selectedName}>
                {Array.from(memberList).map((member, index)=>(
                   <option key={index} value={member.name}>{member.name}</option> 
                ))}
      </select>
        </div>
    )
}

