import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom'
import { Table, button } from 'react-bootstrap';
import AppContext from "../AppContext";

const MemberData = () => {

    const {
        mergedList
      } = useContext(AppContext);
      console.log(mergedList)
    return (
        <>
        <div>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Member Status</th>
                    <th>Member Location</th>
                  </tr>
                </thead>
                <tbody>
                  {mergedList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.status}</td>
                      <td>{item.location}</td>
                    </tr>
                  ))}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default MemberData