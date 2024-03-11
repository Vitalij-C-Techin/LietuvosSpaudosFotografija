import UserManagement from '../../context/UserManagement';
import ViewEditCompetitionForm from '../../parts/ViewEditCompetitionForm';
import React from 'react';
import { useParams } from 'react-router-dom';

const CompetitionManagementPage = () => {
  const { uuid } = useParams();

  return (
    <UserManagement requiredRole="ADMIN">
      <ViewEditCompetitionForm competitionUUID={uuid} />
    </UserManagement>
  );
};
export default CompetitionManagementPage;
