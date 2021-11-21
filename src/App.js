import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import UserContext from "./contexts/CurrentUserContext";

import "./App.css";
import "./components/SelectName/SelectName";
import Privateroute from "./components/Privateroute/Privateroute";
import Header from "./components/Header/Header";
import SelectName from "./components/SelectName/SelectName";
import Giftee from "./components/Giftee/Giftee";
import Footer from "./components/Footer/Footer";
import SigninPopup from "./components/SigninPopup/SigninPopup";
import SignupPopup from "./components/SignupPopup/SignupPopup";
import SuccessPopup from "./components/SuccessPopup/SuccessPopup";
import AnimatedBackground from "./animation/AnimatedBackground";
import Team from "./components/Team/Team";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import santaApi from "./api/santaApi";
import authorize from "./utils/authorize";
import MemberDashboard from "./components/MemberDashboard/MemberDashboard";

function App() {
  const [apiMembersList, setApiMembersList] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [activeList, setActiveList] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [giftee, setGiftee] = useState();
  const [initialList, setInitialList] = useState();
  const [availableList, setAvailableList] = useState();
  /* test without popup*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* state for popups */
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  /* states for user */
  const [currentUser, setCurrentUser] = useState("");
  const [isWrongCredentials, setWrongCredentials] = useState(false);
  const [isNotAvailableEmail, setIsNotAvailableEmail] = useState(false);
  const [token, setToken] = useState();

  /**
   * Initial Call to API to get all members
   */

  useEffect(() => {
    santaApi
      .getTeamMembers(selectedTeam)
      .then((result) => {
        console.log(result);
        setApiMembersList(result);
        const newInitialList = result.filter((member) => !member.giftee);
        console.log(newInitialList);
        setInitialList(newInitialList);
        const newAvailableList = result.filter(
          (member) => member.available === true
        );
        console.log(newAvailableList);
        setAvailableList(newAvailableList);
      })
      .catch((error) => console.log(error));
  }, [selectedTeam]);

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
        setToken(result.token);
        localStorage.setItem("token", result.token);
        console.log(result.token);
        setIsSigninPopupOpen(false);
        setCurrentUser(email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setWrongCredentials(true);
      });
  };

  /**
   * handle user registration
   */

  const handleSignUp = ({ name, email, password }) => {
    authorize
      .register(name, email, password)
      .then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
        } else {
          setIsSignupPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Error: 409") {
          setIsNotAvailableEmail(true);
        }
      });
  };

  /**
   * handle log out
   */

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser("");
    setIsNotAvailableEmail(false);
    setWrongCredentials(false);
  };

  /**
   * handle the opening and  closing of all popups
   */

  const handlePopupSignupClick = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(true);
  };

  const handlePopupSigninClick = () => {
    setIsSignupPopupOpen(false);
    setIsSigninPopupOpen(true);
  };

  const handleSuccessSigninClick = () => {
    setIsSuccessPopupOpen(false);
    setIsSigninPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(false);
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
            <Header
              signoutClick={handleLogOut}
              signupClick={handlePopupSignupClick}
              signinClick={handlePopupSigninClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path='/'
                element={
                  <HomePage
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    signinClick={handlePopupSigninClick}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/draw'
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
              <Route
                path='/team'
                element={<Team memberList={apiMembersList} />}></Route>
              <Route
                path='/dashboard/'
                element={
                  <Privateroute>
                    <Dashboard />
                  </Privateroute>
                }></Route>
              <Route
                path='/:teamname/:teamid'
                element={
                  <Privateroute>
                    <MemberDashboard />
                  </Privateroute>
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
        signupClick={handlePopupSignupClick}
        isWrongCredentials={isWrongCredentials}
      />
      <SignupPopup
        isOpen={isSignupPopupOpen}
        onClose={closeAllPopups}
        signinClick={handlePopupSigninClick}
        onSignup={handleSignUp}
        isNotAvailableEmail={isNotAvailableEmail}
      />
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        popupName='success'
        signinClick={handleSuccessSigninClick}
      />
    </UserContext.Provider>
  );
}

export default App;
