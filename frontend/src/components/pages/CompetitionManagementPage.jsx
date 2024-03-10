import UserManagement from '../context/UserManagement';
import ViewEditCompetitionForm from '../parts/ViewEditCompetitionForm';

const CompetitionManagementPage = () => {
  return (
    <>
      <UserManagement requiredRole='ADMIN'>
        <ViewEditCompetitionForm />
      </UserManagement>
    </>
  );
};

export default CompetitionManagementPage;
