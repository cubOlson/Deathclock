import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import UserEditForm from './auth/UserEditForm'

import { getClockThunk } from '../store/clock'
import Clock from './Clock/clock'

function User() {

  const dispatch = useDispatch()

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

  return (
    <div>
      {!check ?
        <ul>
          <li>
            <strong>User Id</strong> {userId}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Full Name</strong> {user.fullname ? user.fullname : null}
          </li>
          <li>
            <strong>Bio</strong> {user.bio ? user.bio : null}
          </li>
          <li>
            <strong>Phone Number</strong> {user.phoneNumber ? user.phoneNumber : null}
          </li>
          <li>
            <strong>Emergency Contact Name</strong> {user.ecname ? user.ecname : null}
          </li>
          <li>
            <strong>Emergency Contact Phone Number</strong> {user.ecPhone ? user.ecPhone : null}
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
          {currentUser.id===parseInt(userId) ? <button onClick={e => setCheck(true)}>Edit</button> 
          : clock.id ? <Clock clock={clock}/> : null}
        
        </ul>
      : <div><UserEditForm /><button onClick={e => setCheck(false)}>Cancel</button></div>}
    </div>
  );
}
export default User;
