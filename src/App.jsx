import React from 'react';
import './App.css';
import MainScreen from "./components/MainScreen/MainScreen.jsx";
import {ServiceProvider} from "./services/ServiceProvider";

function App() {
  return (
    <div className="App">
        <ServiceProvider>
            <MainScreen/>
        </ServiceProvider>
    </div>
  );
}

export default App;
