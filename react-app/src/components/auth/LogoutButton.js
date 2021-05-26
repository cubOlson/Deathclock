import React from "react";
import { useDispatch } from "react-redux"
import { logout } from "../../store/session";

import '../NavBar/navBar.css'
import LOGOUT from '../../images/LOGOUT.gif'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} id="logoutButton">
    <img src={LOGOUT} alt="logout" className="navLinkImage" />
    <h2>LOGOUT</h2>
  </button>;
};

export default LogoutButton;
