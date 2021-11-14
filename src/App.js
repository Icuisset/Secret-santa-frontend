import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./contexts/CurrentUserContext";

import "./App.css";
import "./components/SelectName/SelectName";
import SelectName from "./components/SelectName/SelectName";
import Giftee from "./components/Giftee/Giftee";
import Footer from "./components/Footer/Footer";
import SigninPopup from "./components/SigninPopup/SigninPopup";
import AnimatedBackground from "./animation/AnimatedBackground";

import santaApi from "./api/santaApi";
import authorize from "./utils/authorize";

function App() {
  const [apiMembersList, setApiMembersList] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [activeList, setActiveList] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [giftee, setGiftee] = useState();
  const [initialList, setInitialList] = useState();
  const [availableList, setAvailableList] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isWrongCredentials, setWrongCredentials] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * Initial Call to API to get all members
   */

  useEffect(() => {
    santaApi
      .getTeamMembers()
      .then((result) => {
        console.log(result);
        setApiMembersList(result);
        const newInitialList = result.filter(
          (member) => member.giftee === null
        );
        setInitialList(newInitialList);
        const newAvailableList = result.filter(
          (member) => member.available === true
        );
        setAvailableList(newAvailableList);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * Handle Name selected and draw
   */
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

  /**
   *  Handle Log in steps
   */

  /**
   * check token is valid and return user id and email
   */

  const handleCheckTokenIsValid = (JWT) => {
    authorize
      .checkTokenIsValid(JWT)
      .then((result) => {
        console.log(result.name, result);
        setCurrentUser(result);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle user authorization with token
   */

  const handleSignIn = ({ email, password }) => {
    authorize
      .authorizeWithToken(email, password)
      .then((result) => {
        console.log(result);
        if (result.statusCode === 401) {
          console.log(result);
        }
        const JWT = localStorage.getItem("jwt");
        if (JWT) {
          handleCheckTokenIsValid(JWT);
        }
        setToken(result.token);
        localStorage.setItem("token", result.token);
        console.log(result.token);
        setIsSigninPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
        if (err === "Error: 401") {
          setWrongCredentials(true);
        }
      });
  };

  /**
   * handle auto login
   */

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");

    console.log(JWT);
    if (JWT) {
      handleCheckTokenIsValid(JWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsSigninPopupOpen(true);
    } else {
      setIsSigninPopupOpen(false);
    }
  }, [isLoggedIn]);

  /**
   * handle the closing of all popups
   */

  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setWrongCredentials(false);
    console.log("popup closed");
  };

  return (
    <UserContext.Provider value={currentUser}>
      <>
        <Router>
          <div className='page-container'>
            <div className='background'>
              <AnimatedBackground />
            </div>
            <h1 className='page-title'>Secret Santa 2021</h1>
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
            <Footer />
          </div>
        </Router>
      </>
      <SigninPopup
        isOpen={isSigninPopupOpen}
        onClose={closeAllPopups}
        onSignin={handleSignIn}
        isWrongCredentials={isWrongCredentials}
      />
    </UserContext.Provider>
  );
}

export default App;
