import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './authForm.css'

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ecname, setEcname] = useState("");
  const [ecPhone, setEcPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, fullname, phoneNumber, ecname, ecPhone, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const updateEcname = (e) => {
    setEcname(e.target.value);
  };

  const updateEcPhone = (e) => {
    setEcPhone(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="authFormParent">
      <form onSubmit={onSignUp} className="authForm">
          <label>User Name</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
          <label>Full Name (optional)</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updateFullname}
            value={fullname}
          ></input>
          <label>Phone Number</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updatePhoneNumber}
            value={phoneNumber}
          ></input>
          <label>Emergency Contact Name (optional)</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updateEcname}
            value={ecname}
          ></input>
          <label>Emergency Contact Phone Number</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updateEcPhone}
            value={ecPhone}
          ></input>
          <label>Email</label>
          <input
            className="authInput"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          <label>Password</label>
          <input
            className="authInput"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
          <label>Repeat Password</label>
          <input
            className="authInput"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
