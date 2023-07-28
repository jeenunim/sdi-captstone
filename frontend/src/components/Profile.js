import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AppContext from "../AppContext";

const Profile = () => {
    const { mergedList, renderList, setRenderList } = useContext(AppContext);

    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split("; ");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split("=");
          if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
          }
        }
      
        return null;
      }
      let currentUserId = getCookie('memberId')
      console.log('current user: ' + currentUserId)
      // const currentUserData = mergedList.find((obj) => obj.id === currentUserId);
      // console.log(currentUserData)


    console.log("getCookie", getCookie('memberId'))
    console.log(renderList.map((item) => item))

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
            {renderList?.find(e => e.id === getCookie('memberId'))?.map((item) => (
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
}

export default Profile