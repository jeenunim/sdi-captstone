import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../AppContext";
import { Container, Button, Heading, Subheading, Divider, Field, EditButton, SaveButton, CancelButton } from './Utils/StyledComponents';
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components';

const ButtonMenu = Styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Profile = () => {

  const { userId } = useContext(AppContext);

  const [ isEditMode, setIsEditMode ] = useState(false);

  const [ member, setMember ] = useState();
  const [ rank, setRank ] = useState();
  const [ status, setStatus ] = useState();
  const [ supervisor, setSupervisor ] = useState();

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
        })
      fetch(`http://localhost:8080/member/${userId}/rank`)
        .then(res => res.json())
        .then(data => {
          setRank(data.rank);
        })
        .catch(err => {
          console.error(err);
        })
      fetch(`http://localhost:8080/member/${userId}/status`)
        .then(res => res.json())
        .then(data => {
          setStatus(data.status);
        })
        .catch(err => {
          console.error(err);
        })
      fetch(`http://localhost:8080/member/${userId}/supervisor`)
        .then(res => res.json())
        .then(data => {
          setSupervisor(data.supervisor);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, []);

  const handleSaveChanges = () => {
    
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
          <Field name='Username' data={member?.username} />
          <Field name='Supervisor' data={supervisor && `${supervisor.first_name} ${supervisor.last_name}`} />
          <Divider />
          <Subheading>Personal</Subheading>
          <Field name='First Name' data={member?.first_name} />
          <Field name='Last Name' data={member?.last_name} />
          <Field name='Rank' data={rank?.title} />
          <Divider />
          <Subheading>Status</Subheading>
          <Field name='Type' data={status?.type} />
          <Field name='Address' data={status?.address} />
          <Button>Save Changes</Button>
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
          <Field name='Rank' data={rank?.title} />
          <Divider />
          <Subheading>Status</Subheading>
          <Field name='Type' data={status?.type} />
          <Field name='Address' data={status?.address} />
        </>
      );
    }
  }

  // function getCookie(name) {
  //     const cookieString = document.cookie;
  //     const cookies = cookieString.split("; ");
    
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].split("=");
  //       if (cookie[0] === name) {
  //         return decodeURIComponent(cookie[1]);
  //       }
  //     }
    
  //     return null;
  //   }

  //     // const currentUserData = mergedList.find((obj) => obj.id === currentUserId);
  //     // console.log(currentUserData)

  // const currentUserData = renderList.find(e => e.id == getCookie('memberId'))
  // console.log("current user data: ", currentUserData)
  // // console.log("rank: ", rank.title)


  // if (!renderList || renderList.length === 0) {
  //   return <div>No member data available.</div>;
  // }
  return (
    <Container>
      {render()}
  </Container>
  );
}

export default Profile