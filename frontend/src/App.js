import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/Overview";
import Header from "./components/Header";
import AppContext from "./AppContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";
import { ThemeProvider } from 'styled-components'
import { colorPalette, Background } from "./components/Utils/StyledComponents";

import Toaster from './components/Utils/Toaster';

function App() {
  const [membersList, setMembersList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getLoggedInUserId = () => {
    if (document.cookie.length > 0) {
      const cookies = document.cookie.split(';');
      if (cookies.length > 0) {
        const memberId = cookies[0].split('=')[1];
        if (memberId) {
          return memberId;
        }
      }
      return 0;
    }
  }

  const initializeData = async () => {
    fetch("http://localhost:8080/members")
    .then(res => res.json())
    .then(data => {
      console.log(data.members)
      setMembersList(data.members);
    }) 
    try {
      // const membersResponse = await fetch("http://localhost:8080/members");
      // const membersData = await membersResponse.json();
      // setMembersList(membersData.members);

      const statusesResponse = await fetch("http://localhost:8080/members/statuses");
      const statusesData = await statusesResponse.json();
      setStatusList(statusesData.statuses);
      console.log('statusList: ',statusList)

      const statusTypeResponse = await fetch("http://localhost:8080/status_types");
      const statusTypeData = await statusTypeResponse.json();
      setStatusTypeList(statusTypeData.status_types);
      console.log('statusTypeList: ', statusTypeList)

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const dataNotInitialized = (membersList.length === 0 && statusList.length === 0 && statusTypeList.length === 0);
    if (dataNotInitialized) {
      initializeData();
    }

    console.log('getLoggedInUserId() from cookies:', getLoggedInUserId());
    if (userId !== getLoggedInUserId) {
      setUserId(getLoggedInUserId());
    }
    
    if (membersList.length > 0 && statusList.length > 0) {
      const mergedData = membersList.map((member) => {
        const status = statusList.find((stat) => stat.id === member.status_id);
        // const statusType = statusTypeList.find((statType) => statType.member_id === member.id)
        if (status) {
          return {
            ...member,
            address: status.address,
            status: status.type
          };
        } else {
          return member;
        }
      });
      setRenderList(mergedData);
    }
  }, [membersList, statusList, statusTypeList, userId]);

  console.log('membersList',membersList);
  console.log('statusList: ', statusList);
  console.log('statusTypeList: ',statusTypeList);
  console.log('renderList: ', renderList)

  if (membersList.length > 0 && statusList.length > 0 && statusTypeList.length > 0) {

  let cookies = document.cookie;
  console.log('cookie length: ' + cookies.length);


  const provided = {
    membersList,
    setMembersList,
    statusList,
    setStatusList,
    renderList,
    setRenderList,
    userId,
    setUserId,
    isDarkMode,
    setIsDarkMode
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let homeLink = () => {
    console.log(cookies.length);
    if (cookies.length === 0) {
      return (
        <Route path="/" element={<Login />} />
      )
    } else {
      return (
        <Route path="/" element={<Overview />} />
      )
    }
  }

  return (
    <ThemeProvider theme={isDarkMode ? colorPalette.dark : colorPalette.light}>
      <Background>
        <Toaster />
        <AppContext.Provider value={provided}>
        <Router>
          <Header />
          <Routes>
            {homeLink()}
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AppContext.Provider>
      </Background>
    </ThemeProvider>
  );
}
}
export default App;
