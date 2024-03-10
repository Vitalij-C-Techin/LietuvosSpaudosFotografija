import UserManagement from '../../context/UserManagement';
import AdminUserParticipationRequestForm from '../../parts/AdminUserParticipationRequestForm';
const AdminUserParticipationRequestPage = () => {
  return (
    <>
      <UserManagement requiredRole="ADMIN">
        <AdminUserParticipationRequestForm />
      </UserManagement>
    </>
  );
};
export default AdminUserParticipationRequestPage;
