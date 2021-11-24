import React from "react";
import { Link } from "react-router-dom";
import ButtonCTA from "../ButtonCTA/ButtonCTA";
import ButtonSCD from "../ButtonSCD/ButtonSCD";

import "./Header.css";

export default function Header(props) {
  return (
    <>
      <header className='header'>
        <Link className='header-link header-link_logo' to={"/"}>
          SecretSantaTEAM
        </Link>
        <div>
          {props.isLoggedIn ? (
            <>
              <Link className='header-link' to={"/"}>
                Home
              </Link>
              <Link className='header-link' to={"/dashboard"}>
                Dashboard
              </Link>
              <ButtonCTA onClick={props.signoutClick}> Sign out</ButtonCTA>
            </>
          ) : (
            <div>
              <ButtonSCD onClick={props.signupClick}>Sign up</ButtonSCD>
              <ButtonCTA onClick={props.signinClick}>Sign in</ButtonCTA>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
