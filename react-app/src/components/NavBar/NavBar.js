import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navBar.css'
import logo from '../../images/ALARM.gif'
import PROFILE from '../../images/PROFILE.gif'
import FRIENDS from '../../images/FRIENDS.gif'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className="navParent">
      <div className="buttonParent">
        <NavLink to="/" exact={true} activeClassName="active" className="logo">
          <img src={logo} alt="Main Logo" className="navLogo"/>
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
        : <div className="welcome">
          <p>USER</p>
          <h1>{user.username}</h1>
        </div>}
        { user ?
          <div className="navBoxRight">
            <NavLink to="/friendList" exact={true} className="navLink" activeClassName="active">
              <img src={FRIENDS} alt="friends" className="navLinkImage"/>
              <h2>FRIENDS</h2>
            </NavLink>
            <NavLink to={`/users/${user.id}`} exact={true} className="navLink" activeClassName="active">
              <img src={PROFILE} alt="friends" className="navLinkImage"/>
              <h2>PROFILE</h2>
            </NavLink>
            <LogoutButton className="navLink"/>
          </div>
        : null}
      </div>
    </nav>
  );
}

export default NavBar;