import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/Overview";
import Header from "./components/Header";
import AppContext from "./AppContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Subordinates from "./components/Subordinates";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { colorPalette, Background } from "./components/Utils/StyledComponents";
import Toaster from "./components/Utils/Toaster";

function App() {
  const [membersList, setMembersList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  const getLoggedInUserId = () => {
    if (document.cookie.length > 0) {
      const cookies = document.cookie.split(";");
      if (cookies.length > 0) {
        const memberId = cookies[0].split("=")[1];
        if (memberId) {
          return memberId;
        }
      }
      return 0;
    }
  };

  const fetchData = async () => {
    try {
      const membersResponse = await fetch("http://localhost:8080/members");
      const membersData = await membersResponse.json();
      setMembersList(membersData.members);

      const statusesResponse = await fetch("http://localhost:8080/members/statuses");
      const statusesData = await statusesResponse.json();
      setStatusList(statusesData.statuses);

      const statusTypeResponse = await fetch("http://localhost:8080/status_types");
      const statusTypeData = await statusTypeResponse.json();
      setStatusTypeList(statusTypeData.status_types);

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const dataNotInitialized = membersList.length === 0 && statusList.length === 0 && statusTypeList.length === 0;
    if (dataNotInitialized) {
      fetchData();
    }

    const loggedInUserId = getLoggedInUserId();
    if (userId !== loggedInUserId) {
      setUserId(loggedInUserId);
    }
  }, [membersList, statusList, statusTypeList, userId]);

  useEffect(() => {
    if (membersList.length > 0 && statusList.length > 0 && !isDataReady) {
      // Merge data and set renderList
      const mergedData = membersList.map((member) => {
        const status = statusList.find((stat) => stat.id === member.status_id);
        if (status) {
          return {
            ...member,
            address: status.address,
            status: status.type,
          };
        } else {
          return member;
        }
      });
      setRenderList(mergedData);
      setIsDataReady(true);
    }
  }, [membersList, statusList, isDataReady]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const cookies = document.cookie;
  // console.log("cookie length: " + cookies.length);

  const provided = {
    membersList,
    setMembersList,
    statusList,
    setStatusList,
    statusTypeList,
    renderList,
    setRenderList,
    userId,
    setUserId,
    isDarkMode,
    setIsDarkMode,
  };

  let homeLink = () => {
    // console.log(cookies.length);
    if (cookies.length === 0) {
      return <Route path="/" element={<Login />} />;
    } else {
      // We pass the `mergedList` from the `App` component as a prop to `Overview`.
      return <Route path="/" element={<Overview mergedList={renderList} />} />;
    }
  };

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
              <Route path="/subordinates" element={<Subordinates />}/>

            </Routes>
          </Router>
        </AppContext.Provider>
      </Background>
    </ThemeProvider>
  );
}

export default App;
