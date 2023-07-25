import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import GoogleMap from './components/GoogleMap';
import Header from './components/Header';
import AppContext from "./AppContext.js";
// import Login from './components/Login';
import './App.css';


function App() {
 const [state, setState] = useState()


  const provided = {
    state,
    setState
  };

  return (
    <AppContext.Provider value={provided}>
    <Router>
      <Header/>
      <Routes>
      {/* <Route path="/" element={<Login />} /> */}
        <Route path="/maps" element={<GoogleMap />} />
      </Routes>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
