import './App.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import StoryList from './Components/StoryList';
import UserInfo from './Components/UserInfo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
    <AppHeader />
      <Router>
      <Switch>
            <Route path="/user">
              <UserInfo  />
            </Route>
            <Route path="/">
              <StoryList />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}