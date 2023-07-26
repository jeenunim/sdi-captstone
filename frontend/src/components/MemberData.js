import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom'
import { Table, button } from 'react-bootstrap';
import AppContext from "../AppContext";

const MemberData = () => {

    const {
        membersList
      } = useContext(AppContext);
      console.log(membersList)

  useEffect(() => {
    fetch("http://localhost:8080/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocationsList(data);
      })
      .catch((error) => {
        console.error("Error fetching locations data:", error);
      });
  }, []);
    return (
        <>
        <div>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    {/* <th>Member Status</th>
                    <th>Member Location</th> */}
                  </tr>
                </thead>
                <tbody>
                  {membersList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      {/* <td>{item.status}</td>
                      <td>{item.location}</td> */}
                    </tr>
                  ))}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default MemberData