import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Table as BootstrapTable } from 'react-bootstrap';
import { Table } from './Utils/StyledComponents';
import MemberInfo from './MemberInfo';
import AppContext from "../AppContext";


const MemberData = ({ filteredMembers }) => {
  const { renderList } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const showAllMembers = !filteredMembers || filteredMembers.length === 0;

  // Check if renderList is empty or undefined
  if (!renderList || renderList.length === 0) {
    return <div>No member data available.</div>;
  }

  const sortedMembers = [...renderList].sort((a, b) => a.last_name.localeCompare(b.last_name));

  const handleRowClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <>
    {/* // <div style={{position: 'relative', left: '33%', right: "33%", height: "auto", width: "33%" }}>
    //below is the refactor for the map/user page
    <div style={{  position: 'relative', left: '25vw', height: '35vh', width: '50vw', marginTop: '7vh', overflow: 'auto' }}>  */}
      
      {/* <div style={{ position: 'relative', width: '40vw', height: '29vh', overflow: 'auto' }}> */}
      <Table 
        headers={['id', 'First Name', 'Last Name', 'Status', 'Address']}
        rows={
          showAllMembers ? 
            sortedMembers.map(member => [member.id, member.first_name, member.last_name, member.status, member.address]):
            filteredMembers.map(member => [member.id, member.first_name, member.last_name, member.status, member.address])
        }

        onClick={(member) => handleRowClick(member)}
      />
      {/* </div> */}
      {selectedMember && (
        <div className="modal" style={
          { display: "block", 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "rgba(0, 0, 0, 0.5)", 
          zIndex: 999,
          backdropFilter: 'blur(4px)',
          }}>
          <div style={{ position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "none", padding: "0px", maxWidth: "500px" }}>
            <MemberInfo memberId={selectedMember} closeModal={() => setSelectedMember(null)} />
          </div>
        </div>
      )}
      </>
  );
};



export default MemberData;
