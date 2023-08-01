import React, { useContext, useEffect, useState } from "react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import { HeaderContainer as Container, NavItem } from './Utils/StyledComponents';
import AppContext from "../AppContext";

export default function InfoDisplay() {
  const { statusList, statusTypeList, setRenderList, userId, renderList, membersList } = useContext(AppContext);
  const [rawSubordinatesList, setRawSubordinatesList] = useState([]);
  const [showSubordinates, setShowSubordinates] =useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/member/${userId}/subordinates`)
      .then((res) => res.json())
      .then((data) => {
        setRawSubordinatesList(data.subordinates);
      });
  }, [userId]);


const setRenderListData = () => {
  let dataToMerge = [];
  if (showSubordinates) {
    dataToMerge = rawSubordinatesList;
  } else {
    dataToMerge = membersList;
  }

  if (dataToMerge.length > 0 && statusList.length > 0) {
    const mergedData = dataToMerge.map((member) => {
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
  }
};

useEffect(() => {
  setRenderListData();
}, [showSubordinates, rawSubordinatesList, membersList, statusList]);


const currentUser = membersList.find((member) => member.id == userId)
if (currentUser.is_supervisor) {
  return (
    <main>
      <GoogleMap />
      <Container>
            <NavItem onClick={() => setShowSubordinates(false)}>
                Overview
            </NavItem>
            <NavItem onClick={() => setShowSubordinates(true)}>
                My Troops
            </NavItem>
        </Container>
      <MemberData />
    </main>
  );
} else {
    return (
        <main>
        <GoogleMap />
        <MemberData />
      </main>  
    );
}
}

