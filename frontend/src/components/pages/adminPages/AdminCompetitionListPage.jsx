import AdminCompetitionListForm from '../../parts/AdminCompetitionsListForm';
import UserManagement from '../../context/UserManagement'

const AdminCompetitionListPage = () => {
  return (
    <>
      <UserManagement requiredRole='ADMIN'>
        <AdminCompetitionListForm />
      </UserManagement>
    </>
  );
};
export default AdminCompetitionListPage;
