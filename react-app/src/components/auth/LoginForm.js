import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import './authForm.css'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoLogin = async (e) => {
    await setEmail('demo@aa.io')
    await setPassword('password')
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signUpPage">
      <div className="signUpInfo">
        <h1> Welcome to the DeathClock App!</h1>
        <p>Here at DeathClock we believe in preparedness through effective risk-management.</p>
        <p>
          Sign Up to gain access to our persistent DeathClocks, which track the time you spend engaging in risky activities such 
          as camping, backpacking, scuba-diving, general adventuring and the like. 
        </p>
        <p>
          If your clock runs down the app will alert your friends to possible trouble on your end,
          and if you include your location in the clock they may even be able to come and help in the event you are incapacitated. 
        </p>
        <p>
          We always recommend you use the buddy sytem, but if it can't be helped, set a DeathClock.
        </p>
      </div>
      <div className="authFormParent">
        <form onSubmit={onLogin} className="authForm">
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="authInput"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="authInput"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type="submit">Login</button>
            <button onClick={e => demoLogin(e)}>Demo Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
