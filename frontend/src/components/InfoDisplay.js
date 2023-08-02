import React, { useContext, useEffect, useState } from "react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import { HeaderContainer, Container, NavItem, Input, Field, PieChart, Subheading, Divider } from './Utils/StyledComponents';
import AppContext from "../AppContext";

export default function InfoDisplay() {
  const { statusList, statusTypeList, setRenderList, userId, renderList, membersList } = useContext(AppContext);
  const [rawSubordinatesList, setRawSubordinatesList] = useState([]);
  const [showSubordinates, setShowSubordinates] =useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

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
    dataToMerge = filteredMembers.length > 0 ? filteredMembers : membersList;
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

  const filterMembers = (query) => {
    if (!query) {
      setFilteredMembers([]); // If the search query is empty, show all members
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = membersList.filter(
      (member) =>
        member.first_name.toLowerCase().includes(lowerCaseQuery) ||
        member.last_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMembers(filtered);
  };

  useEffect(() => {
    filterMembers(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setRenderListData();
  }, [showSubordinates, rawSubordinatesList, membersList, statusList]);


  const chartData = statusTypeList.map(status => {
    const count = renderList.filter(member => member.status == status.name)
      .reduce((total, member) => {
        return (total + 1)
      }, 0);
    return [status.name, count];
  });
  chartData.unshift(['Status', 'Member Count']);

  const currentUser = membersList.find((member) => member.id == userId)

    return (
      <>
        <GoogleMap />
        {(currentUser && currentUser.is_supervisor) &&
          (<HeaderContainer>
            <NavItem onClick={() => setShowSubordinates(false)}>Overview</NavItem>
            <NavItem onClick={() => setShowSubordinates(true)}>My Troops</NavItem>
          </HeaderContainer>)
        }
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap'
        }}>
          <Container style={{minWidth: '50vw'}}>
          <Input  
            type="text"
            placeholder="Search for member by first or last name..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <MemberData filteredMembers={filteredMembers} />
        </Container>
        <Container style={{
          minWidth: '40vw',
          maxHeight: '40vh'
        }}>
          <Subheading>Member Status</Subheading>
          <Divider />
          <PieChart data={chartData} />
        </Container>
        </div>
      </>
    )
}

