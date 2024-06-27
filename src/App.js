import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import MainPage from './Components/MainPage';
import RightSideButton from './Components/RightSideButton';


const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <MainPage />
      <RightSideButton />
    </div>
  );
};

export default App;



