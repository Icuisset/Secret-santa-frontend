import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import "./components/SelectName/SelectName";
import SelectName from "./components/SelectName/SelectName";
import Giftee from "./components/Giftee/Giftee";

import initialMembersList from "./utils/initialValues";
import santaApi from "./api/santaApi";

function App() {
  const [apiMembersList, setApiMembersList] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [activeList, setActiveList] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [giftee, setGiftee] = useState();
  const [initialList, setInitialList] = useState();
  const [availableList, setAvailableList] = useState();

  useEffect(() => {
    santaApi
      .getTeamMembers()
      .then((result) => {
        console.log(result);
        setApiMembersList(result);
        const newInitialList = result.filter(
          (member) => member.santee === null
        );
        setInitialList(newInitialList);
        const newAvailableList = result.filter(
          (member) => member.available === true
        );
        setAvailableList(newAvailableList);
      })
      .catch((error) => console.log(error));
  }, []);

  const changeSelection = (newName) => {
    setSelectedName(newName);
    console.log(newName);
    const newActiveList = availableList.filter(
      (member) => member.name !== newName
    );
    const newSelectedMember = apiMembersList.filter(
      (member) => member.name === newName
    );
    setActiveList(newActiveList);
    setSelectedMember(newSelectedMember);
    console.log(newActiveList, newSelectedMember);
  };

  const getRandomListItem = (list) => {
    const randomNumber = Math.floor(Math.random() * activeList.length);
    return list[randomNumber];
  };

  const updateGiftee = (id, name) => {
    santaApi
      .updateMemberGiftee(id, name)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAvailability = (id) => {
    santaApi
      .updateMemberAvailability(id)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const drawSantaGiftee = () => {
    console.log("it's coming");
    console.log(selectedMember[0]._id, selectedMember[0].name);
    const randomGiftee = getRandomListItem(activeList);
    setGiftee(randomGiftee);
    console.log(randomGiftee.name);
    updateGiftee(selectedMember[0]._id, randomGiftee.name);
    updateAvailability(randomGiftee._id);
  };

  return (
    <Router>
      <div className='santa'>
        <h1>Merchandising Secret Santa 2021</h1>
        <Routes>
          <Route
            path='/'
            element={
              <SelectName
                memberList={initialList}
                selectedName={selectedName}
                changeSelection={changeSelection}
                pickSantaGiftee={drawSantaGiftee}
              />
            }
          />
          <Route
            path='/giftee'
            element={
              <Giftee giftee={giftee} selectedName={selectedName} />
            }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
