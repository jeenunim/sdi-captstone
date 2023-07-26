import React, { useContext } from "react";
import { Table } from 'react-bootstrap';
import AppContext from "../AppContext";

const MemberData = () => {
  const { renderList } = useContext(AppContext);

  // Check if renderList is empty or undefined
  if (!renderList || renderList.length === 0) {
    return <div>No member data available.</div>;
  }

  return (
    <div>
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
              <td>{item.status_id}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MemberData;
