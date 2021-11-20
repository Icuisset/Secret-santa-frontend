import React from "react";
import { Navigate } from "react-router";
import UserContext from "../../contexts/CurrentUserContext";

export default function Privateroute({ children }) {
  const currentUser = React.useContext(UserContext);

  return currentUser ? children : <Navigate to='/' />;
}
