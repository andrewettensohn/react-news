import './App.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import StoryList from './Components/StoryList';
import UserInfo from './Components/UserInfo'
import Container from '@material-ui/core/Container';
import Item from './Components/Item'
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
      <Container>
        <Router>
          <Switch>
            <Route path="/user">
              <UserInfo />
            </Route>
            <Route path="/item">
              <Item />
            </Route>
            <Route path="/">
              <StoryList />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}