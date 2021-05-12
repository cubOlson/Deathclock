import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navBar.css'
import logo from '../../images/ALARM.gif'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className="navParent">
      <div className="buttonParent">
        <NavLink to="/" exact={true} activeClassName="active" className="logo">
          <img src={logo} className="navLogo"/>
          <h1>DeathClock</h1>
        </NavLink>
        { !user ?
          <div>
            <NavLink to="/login" exact={true} className="button" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} className="button" activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        : <div className="welcome"> Logged in as "{user.username}"!</div>}
        { user ?
          <div>
            <NavLink to="/friendList" exact={true} className="button" activeClassName="active">
              Friends
            </NavLink>
            <LogoutButton className="welcome"/>
          </div>
        : null}
      </div>
    </nav>
  );
}

export default NavBar;