import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";

import "./App.css";
import "./components/SelectName/SelectName";
import SelectName from "./components/SelectName/SelectName";
import Giftee from "./components/Giftee/Giftee";

import initialMembersList from "./utils/initialValues";

function App() {
  const availableList = initialMembersList.filter(
    (member) => member.available === true
  );
  const [selectedName, setSelectedName] = useState("");
  const [activeList, setActiveList] = useState(availableList);

  const changeSelection = useCallback((newName) => {
    setSelectedName(newName);
    console.log(newName);
    const newActiveList = availableList.filter(
      (member) => member.name !== newName
    );
    setActiveList(newActiveList);
    console.log(newActiveList);
  }, []);

  const pickSantaGiftee = useCallback(() => {
    console.log("it's coming");
  }, []);

  return (
    <Router>
      <div className='santa'>
        <h1>Merchandising Secret Santa 2021</h1>
        <Routes>
          <Route
            path='/'
            element={
              <SelectName
                memberList={initialMembersList}
                selectedName={selectedName}
                changeSelection={changeSelection}
                pickSantaGiftee={pickSantaGiftee}
              />
            }
          />
          <Route path='/giftee' element={<Giftee />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
