import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Table as BootstrapTable } from 'react-bootstrap';
import { Table } from './Utils/StyledComponents'
import AppContext from "../AppContext";


const MemberData = ({ filteredMembers }) => {
  const { renderList } = useContext(AppContext);
  const navigate = useNavigate();

  const showAllMembers = !filteredMembers || filteredMembers.length === 0;

  // Check if renderList is empty or undefined
  if (!renderList || renderList.length === 0) {
    return <div>No member data available.</div>;
  }

  const sortedMembers = [...renderList].sort((a, b) => a.last_name.localeCompare(b.last_name));

  return (
    // <div style={{position: 'relative', left: '33%', right: "33%", height: "auto", width: "33%" }}>
    //below is the refactor for the map/user page
    // <div style={{  position: 'relative', left: '25vw', height: '35vh', width: '50vw', marginTop: '7vh', overflow: 'auto' }}> 
      <>
      <Table 
        headers={['First Name', 'Last Name', 'Status', 'Address']}
        rows={
          showAllMembers ? 
            sortedMembers.map(member => [member.first_name, member.last_name, member.status, member.address]):
            filteredMembers.map(member => [member.first_name, member.last_name, member.status, member.address])
        }
      />
      </>
  );
};

export default MemberData;
