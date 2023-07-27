import { render, screen } from '@testing-library/react';
import React, { useContext } from "react";
import App from './App';
import AppContext from './AppContext';
// const request = require('supertest');


describe('App', () => {
  
  const provided = {
    membersList,
    setMembersList,
    statusList,
    setStatusList,
    renderList,
    setRenderList
  } = useContext(AppContext);

  render(
  <AppContext.Provider value={membersList}>
  <App />
  </AppContext.Provider>
  )

  it('Holds member object from backend', async () => {
    
    expect(membersList)
    .toEqual(expect.objectContaining({
      id: expect.any(Number),
      first_name: expect.any(String), 
      last_name: expect.any(String),
      username: expect.any(String),
      password: expect.any(String),
      branch_id: expect.any(Number),
      rank_id: expect.any(Number),
      office_symbol: expect.any(String),
      org_id: expect.any(Number),
      supervisor_id: expect.toBeInTheDocument(),
      status_id: expect.any(Number),
      is_supervisor: expect.any(Boolean),
      is_commander: expect.any(Boolean) 
    }))
  })

})

 // it('fetch /members --> array of a member', async () => {
  //   return request(App)
  //    .fetch("http://localhost:8080/members")
  //    .expect('Content-Type', /json/)
  //    .expect(200)
  //    .then((response) => {
  //     expect(response.body)
  //     .toEqual(expect.arrayContaining([
  //         expect.objectContaining({
  //         id: expect.any(Number),
  //         first_name: expect.any(String), 
  //         last_name: expect.any(String),
  //         username: expect.any(String),
  //         password: expect.any(String),
  //         branch_id: expect.any(Number),
  //         rank_id: expect.any(Number),
  //         office_symbol: expect.any(String),
  //         org_id: expect.any(Number),
  //         status_id: expect.any(Number),
  //         is_supervisor: expect.any(Boolean),
  //         is_commander: expect.any(Boolean)
  // })]))});    
  // });