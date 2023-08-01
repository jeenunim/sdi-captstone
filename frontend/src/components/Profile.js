import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../AppContext";
import { Container, Button, Heading, Subheading, Divider, Field, EditButton,  CancelButton, Input, Select } from './Utils/StyledComponents';
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components';
import { notify } from './Utils/Toaster';

const ButtonMenu = Styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Profile = () => {

  const { userId } = useContext(AppContext);

  const [ isEditMode, setIsEditMode ] = useState(false);

  const [ member, setMember ] = useState();
  const [ branch, setBranch ] = useState();
  const [ rank, setRank ] = useState();
  const [ status, setStatus ] = useState();
  const [ supervisor, setSupervisor ] = useState();

  const [ branches, setBranches ] = useState();
  const [ ranks, setRanks ] = useState();
  const [ statusTypes, setStatusTypes ] = useState();
  const [ members, setMembers ] = useState();

  const navigate = useNavigate();


  if (userId === 0) {
    navigate('/login')
  }

  useEffect(() => {
    console.log('UserId: ', userId);
    if (userId > 0) {
      fetch(`http://localhost:8080/member/${userId}`)
        .then(res => res.json())
        .then(data => {
          setMember(data.member);
        })
        .catch(err => {
          console.error(err);
          notify('Failed to fetch member!', 'error');
        })
      fetch(`http://localhost:8080/member/${userId}/branch`)
        .then(res => res.json())
        .then(data => {
          setBranch(data.branch);
        })
        .catch(err => {
          console.error(err);
          notify(`Failed to fetch member's branch of service!`, 'error');
        })
      fetch(`http://localhost:8080/member/${userId}/rank`)
        .then(res => res.json())
        .then(data => {
          setRank(data.rank);
        })
        .catch(err => {
          console.error(err);
          notify(`Failed to fetch member's rank!`, 'error');
        })
      fetch(`http://localhost:8080/member/${userId}/status`)
        .then(res => res.json())
        .then(data => {
          setStatus(data.status);
        })
        .catch(err => {
          console.error(err);
          notify(`Failed to fetch member's status!`, 'error');
        })
      fetch(`http://localhost:8080/member/${userId}/supervisor`)
        .then(res => res.json())
        .then(data => {
          setSupervisor(data.supervisor);
        })
        .catch(err => {
          console.error(err);
          notify(`Failed to fetch member's supervisor!`, 'error');
        })

      //Dropdown menus
      fetch('http://localhost:8080/members')
        .then(res => res.json())
        .then(data => {
          setMembers(data.members);
        })
      fetch('http://localhost:8080/branches')
        .then(res => res.json())
        .then(data => {
          setBranches(data.branches);
        })
      fetch('http://localhost:8080/ranks')
        .then(res => res.json())
        .then(data => {
          setRanks(data.ranks);
        })
      fetch('http://localhost:8080/status_types')
        .then(res => res.json())
        .then(data => {
          setStatusTypes(data.status_types);
        })
    }
  }, []);

  const handleSaveChanges = () => {
    // ToDo: feth patch /member/:memberId
    Promise.all([(`http://localhost:8080/member/${userId}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: member.first_name,
            last_name: member.last_name,
            branch_id: member.branch_id,
            rank_id: member.rank_id,
        })
      }),
    // ToDo: fetch patch /member/:memberId/supervisor
    fetch(`http://localhost:8080/member/${userId}/supervisor`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            supervisor_id: member.supervisor_id
        })
      }),
    // ToDo: fetch patch /member/:memberId/status
    fetch(`http://localhost:8080/member/${userId}/status`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: {
              status_type_id: status.status_type_id,
              description: status.description,
              address: status.address
            }
        })
      })
    ])
    .then(data => {
      console.log(data);
      notify('Data successfully updated!', 'success');
      toggleEditMode();
    })
    .catch(err => {
      console.error(err);
      notify('Failed to update...', 'error');
    })
  }

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const render = () => {
    if (isEditMode) {
      return (
        <>
          <ButtonMenu>
            <CancelButton onClick={toggleEditMode}/>
          </ButtonMenu>
          <Heading>Edit Profile</Heading>
          <Subheading>Account</Subheading>
          <Field 
            name='Username' 
            data={member?.username} 
          />
          <Field 
            name='Supervisor' 
            data={
              <Select  
                placeholder='Select Supervisor...' 
                defaultValue= {`${supervisor?.first_name} ${supervisor?.last_name}`}
                optionsData={members?.map(member => `${member.first_name} ${member.last_name}`)} 
                onBlur={(event) => {
                  const supervisorFullName = event.target.value;
                  const supervisorFound = members.find(member => `${member.first_name} ${member.last_name}` === supervisorFullName);
                  const supervisorId = supervisorFound?.id;
                  const { supervisor_id, ...updatedMember } = member;

                  updatedMember.supervisor_id = supervisorId;
                  setMember(updatedMember)
                }}
              />
            } 
          />
          <Divider />
          <Subheading>Personal</Subheading>
          <Field 
            name='First Name' 
            data={
              <Input 
                placeholder='First Name'
                defaultValue={member?.first_name}
                onBlur={(event) => {
                  const firstName = event.target.value;
                  const { first_name, ...updatedMember } = member;

                  updatedMember.first_name = firstName;
                  setMember(updatedMember);
                }}
              />
            } 
          />
          <Field 
            name='Last Name' 
            data={
              <Input 
                placeholder='Last Name'
                defaultValue={member?.last_name}
                onBlur={(event) => {
                  const lastName = event.target.value;
                  const { last_name, ...updatedMember } = member;

                  updatedMember.last_name = lastName;
                  setMember(updatedMember);
                }}
              />
            } 
          />
          <Field 
            name='Branch' 
            data={
              <Select 
                defaultValue={branch?.name}
                placeholder='Select Military Branch...' 
                optionsData={branches?.map(branch => branch.name)}
                onBlur={(event) => {
                  const branchName = event.target.value;
                  const branchFound = branches?.find(branch => branch.name === branchName);
                  const branchId = branchFound?.id;
                  const { branch_id, ...updatedMember } = member;

                  updatedMember.branch_id = branchId;
                  setMember(updatedMember);
                }}
              />
            } 
          />
          <Field 
            name='Rank' 
            data={
              <Select 
                defaultValue={rank?.title}
                placeholder='Select Rank...' 
                optionsData={ranks?.map(rank => rank.title)} 
                onBlur={(event) => {
                  const rankTitle = event.target.value;
                  const rankFound = ranks?.find(rank => rank.title === rankTitle);
                  const rankId = rankFound?.id;
                  const { rank_id, ...updatedMember } = member;

                  updatedMember.rank_id = rankId;
                  setMember(updatedMember);
                }}
              />
            } 
          />
          <Divider />
          <Subheading>Status</Subheading>
          <Field 
            name='Type' 
            data={
              <Select 
                defaultValue={status?.type}
                placeholder='Select Status Type...' 
                optionsData={statusTypes?.map(status => status.name)}
                onBlur={(event) => {
                  const statusTypeName = event.target.value;
                  const statusTypeFound = statusTypes.find(statusType => statusType.name === statusTypeName);
                  const statusTypeId = statusTypeFound?.id;
                  const { status_type_id, ...updatedStatus } = status;
                  
                  updatedStatus.status_type_id = statusTypeId;
                  setStatus(updatedStatus);
                }}
              />
            } 
          />
          <Field
            name='Address'
            data={
              <Input 
                placeholder='Address'
                defaultValue={status?.address}
                onBlur={(event) => {
                  const statusAddress = event.target.value;
                  const { address, ...updatedStatus } = status;
                  
                  updatedStatus.address = statusAddress;
                  setStatus(updatedStatus);
                }}
              />
            }
          />
          <Field 
            name='Description' 
            data={
              <Input 
                placeholder='Description'
                defaultValue={status?.description}
                onBlur={(event) => {
                  const statusDescription = event.target.value;
                  const { description, ...updatedStatus } = status;
                  
                  updatedStatus.description = statusDescription;
                  setStatus(updatedStatus);
                }}
              />
            } 
          />
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </>
      );
    } else {
      return (
        <>
          <ButtonMenu>
            <EditButton onClick={toggleEditMode}/>
          </ButtonMenu>
          <Heading>Profile</Heading>
          <Subheading>Account</Subheading>
          <Field name='Username' data={member?.username} />
          <Field name='Supervisor' data={supervisor && `${supervisor.first_name} ${supervisor.last_name}`} />
          <Divider />
          <Subheading>Personal</Subheading>
          <Field name='First Name' data={member?.first_name} />
          <Field name='Last Name' data={member?.last_name} />
          <Field name='Branch' data={branch?.name} />
          <Field name='Rank' data={rank?.title} />
          <Divider />
          <Subheading>Status</Subheading>
          <Field name='Type' data={status?.type} />
          <Field name='Address' data={status?.address} />
          <Field name='Description' data={status?.description} />
        </>
      );
    }
  }

  return (
    <Container>
      {render()}
  </Container>
  );
}

export default Profile