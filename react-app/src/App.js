import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UserFollow from './components/UserFollow/UserFollow';
import Clock from './components/Clock/clock'
import CreateClockForm from './components/ClockForm/ClockForm'
import FClocksBox from './components/FClocksBox/FClocksBox'
import HomePage from './components/HomePage/HomePage'
import { authenticate } from './store/session'

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <FClocksBox />
      <Switch>

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path="/" exact={true} >
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute path="/userTest" exact={true} >
          <UserFollow />
        </ProtectedRoute>

        <ProtectedRoute path="/clockTest" exact={true} >
          <Clock />
        </ProtectedRoute>

        <ProtectedRoute path="/clockForm" exact={true} >
          <CreateClockForm />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
