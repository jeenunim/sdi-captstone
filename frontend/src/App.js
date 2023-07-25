import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GoogleMap from "./components/GoogleMap";
import Header from "./components/Header";
import AppContext from "./AppContext";
import "./App.css";

function App() {
  const [membersList, setMembersList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [mergedList, setMergedList] = useState([]);

  useEffect(() => {
    // Fetch members data
    fetch("http://localhost:8080/members")
      .then((res) => res.json())
      .then((data) => {
        setMembersList(data);
      })
      .catch((error) => {
        console.error("Error fetching members data:", error);
      });
    console.log('Members List: ', membersList)
    // Fetch locations data
    fetch("http://localhost:8080/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocationsList(data);
      })
      .catch((error) => {
        console.error("Error fetching locations data:", error);
      });
  }, []);

  

  useEffect(() => {
      const mergedData = [];
    
      membersList.forEach(member => {
        const { first_name, last_name, location_id, status } = member;
        const location = locationsList.find(loc => loc.id === location_id);
    
        if (location) {
          const mergedMember = { first_name, last_name, location_id, status, location: location.location };
          mergedData.push(mergedMember);
        }
      });
  
    setMergedList(mergedData);
  }, [membersList, locationsList]);
  

  const provided = {
    membersList,
    setMembersList,
    locationsList,
    setLocationsList,
    mergedList,
  };

  return (
    <AppContext.Provider value={provided}>
      <Router>
        <Header />
        <Routes>
          <Route path="/maps" element={<GoogleMap />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
