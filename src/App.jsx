import React from 'react';
import './App.css';
import MainScreen from "./components/MainScreen/MainScreen.jsx";
import {ServiceProvider} from "./services/ServiceProvider";

function App() {
  return (
    <ServiceProvider>
        <MainScreen/>
    </ServiceProvider>
  );
}

export default App;
