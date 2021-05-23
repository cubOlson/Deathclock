import React from "react";
import { useDispatch } from "react-redux"
import { logout } from "../../store/session";

import '../NavBar/navBar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} id="logoutButton">
    <h1>X</h1>
    <p>Logout</p>
  </button>;
};

export default LogoutButton;
