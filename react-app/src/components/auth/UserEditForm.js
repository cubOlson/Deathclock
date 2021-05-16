import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { editUserThunk } from '../../store/session';

import './authForm.css'

const UserEditForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)


  const [username, setUsername] = useState(user.username);
  const [fullname, setFullname] = useState(user.fullname);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [ecname, setEcname] = useState(user.ecname);
  const [ecPhone, setEcPhone] = useState(user.ecPhone);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);

  
  if (!user) {
    return null
}

  const onEdit = async (e) => {
    await dispatch(editUserThunk(username, fullname, phoneNumber, ecname, ecPhone, bio, email));
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

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="authFormParent">
      <form onSubmit={onEdit} className="authForm">
          <label>User Name</label>
          <input
            className="authInput"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            required
          ></input>
          <label>Full Name (optional)</label>
          <input
            className="authInput"
            type="text"
            name="fullname"
            onChange={updateFullname}
            value={fullname}
          ></input>
          <label>Phone Number</label>
          <input
            className="authInput"
            type="text"
            name="phoneNumber"
            onChange={updatePhoneNumber}
            value={phoneNumber}
            required
          ></input>
          <label>Emergency Contact Name (optional)</label>
          <input
            className="authInput"
            type="text"
            name="ecname"
            onChange={updateEcname}
            value={ecname}
          ></input>
          <label>Emergency Contact Phone Number</label>
          <input
            className="authInput"
            type="text"
            name="ecPhone"
            onChange={updateEcPhone}
            value={ecPhone}
            required
          ></input>
          <label>Short Bio</label>
          <input
            className="authInput"
            type="text"
            name="bio"
            onChange={updateBio}
            value={bio}
          ></input>
          <label>Email</label>
          <input
            className="authInput"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required
          ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserEditForm;
