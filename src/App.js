import './App.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import StoryList from './Components/StoryList';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <StoryList />
    </div>
  );
}

export default App;