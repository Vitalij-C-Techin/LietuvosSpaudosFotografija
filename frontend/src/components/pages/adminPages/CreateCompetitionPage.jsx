import React from 'react';
import CreateCompetitionForm from '../../parts/CreateCompetitionForm';
import UserManagement from '../../context/UserManagement';

const CreateCompetition = () => {
  return (
    <>
      <UserManagement requiredRole='ADMIN'>
        <CreateCompetitionForm />
      </UserManagement>
    </>
  );
};
export default CreateCompetition;
