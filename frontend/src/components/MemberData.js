import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import AppContext from "../AppContext";

const MemberData = () => {
  const { renderList } = useContext(AppContext);
  const navigate = useNavigate();

  // Check if renderList is empty or undefined
  if (!renderList || renderList.length === 0) {
    return <div>No member data available.</div>;
  }

  return (
    // <div style={{position: 'relative', left: '33%', right: "33%", height: "auto", width: "33%" }}>
    //below is the refactor for the map/user page
    <div style={{  position: 'relative', left: '25vw', height: '35vh', width: '50vw', marginTop: '3vh', overflow: 'auto' }}> 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Member Status</th>
            <th>Member Address</th>
          </tr>
        </thead>
        <tbody>
          {renderList.map((item) => (
            <tr key={item.id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.status}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MemberData;
