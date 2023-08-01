import React, { useContext, useEffect, useState } from 'react';
import AppContext from "../AppContext";
import { Container, Heading, Subheading, Divider, Field, EditButton, CancelButton, Input, Select } from './Utils/StyledComponents';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import { notify } from './Utils/Toaster';

const MemberInfo = ({ memberId, closeModal }) => {
  const [member, setMember] = useState();
  const [branch, setBranch] = useState();
  const [rank, setRank] = useState();
  const [status, setStatus] = useState();
  const [supervisor, setSupervisor] = useState();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetch(`http://localhost:8080/member/${memberId}`)
        .then(res => res.json())
        .then(data => {
          setMember(data.member);
        })
        .catch(err => {
          console.error(err);
        });
      fetch(`http://localhost:8080/member/${memberId}/branch`)
        .then(res => res.json())
        .then(data => {
          setBranch(data.branch);
        })
        .catch(err => {
          console.error(err);
        });
      fetch(`http://localhost:8080/member/${memberId}/rank`)
        .then(res => res.json())
        .then(data => {
          setRank(data.rank);
        })
        .catch(err => {
          console.error(err);
        });
      fetch(`http://localhost:8080/member/${memberId}/status`)
        .then(res => res.json())
        .then(data => {
          setStatus(data.status);
        })
        .catch(err => {
          console.error(err);
        });
      fetch(`http://localhost:8080/member/${memberId}/supervisor`)
        .then(res => res.json())
        .then(data => {
          setSupervisor(data.supervisor);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [memberId]);

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  if (!showModal) {
    return null;
  }

  return (
    <Container>
      <CancelButton onClick={handleCloseModal}>&times;</CancelButton>
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
    </Container>
  );
};

export default MemberInfo;
