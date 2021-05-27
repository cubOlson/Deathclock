import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { unfollowUserThunk } from '../store/user'
import { getNonFollowersThunk } from '../store/follows'
import { getFriendClocksThunk } from '../store/friendClocks'
import UserEditForm from './auth/UserEditForm'

import { getClockThunk } from '../store/clock'
import Clock from './Clock/clock'

import './User.css'

function User() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [user, setUser] = useState({});
  const [check, setCheck] = useState(false)
  const currentUser = useSelector(state => state.session.user)
  const clock = useSelector(state => state.clock)

  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(getClockThunk(userId))
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  const handleRemoveFollow = async (e) => {
    await dispatch(unfollowUserThunk(user.id))
    await dispatch(getNonFollowersThunk(currentUser.id))
    await dispatch(getFriendClocksThunk(currentUser.id))
    
    history.push('/')
}

  return (
    <div id="userInfoContainer">
      {!check ?
        <div id="userInfoBox">
          <p>USER ID: {userId}</p>
          <p>USERNAME: {user.username}</p>
          <p>FULL NAME: {user.fullname ? user.fullname : null}</p>
          <p>BIO: {user.bio ? user.bio : null}</p>
          <p> PHONE NUMBER: {user.phoneNumber ? user.phoneNumber : null}</p>
          <p>EMERGENCY CONTACT: {user.ecname ? user.ecname : "No name,"} , {user.ecPhone ? user.ecPhone : "no number"}</p>
          {currentUser.id===parseInt(userId) ? <button onClick={e => setCheck(true)}>Edit</button> 
          : clock.id ? 
          <div>
            <Clock clock={clock}/>
            <button onClick={e => handleRemoveFollow(e)}>Unfollow User</button>
          </div> : <button onClick={e => handleRemoveFollow(e)}>Unfollow User</button>}
        
        </div>
      : <div><UserEditForm /><button onClick={e => setCheck(false)}>Cancel</button></div>}
    </div>
  );
}
export default User;
