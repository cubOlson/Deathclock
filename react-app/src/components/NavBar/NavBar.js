import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className="navParent">
      <div className="buttonParent">
        <div>
          <NavLink to="/" exact={true} className="button" activeClassName="active">
            Home
          </NavLink>
        </div>
        { !user ?
          <div>
            <NavLink to="/login" exact={true} className="button" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        : <div className="welcome"> Logged in as "{user.username}"!</div>}
        <div>
          <NavLink to="/users" exact={true} className="button" activeClassName="active">
            Profile (CREATE)
          </NavLink>
        </div>
        <div className="button">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;