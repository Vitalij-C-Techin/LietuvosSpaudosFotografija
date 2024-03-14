import ViewEditCompetitionForm from '../../parts/ViewEditCompetitionForm';
import { useParams } from 'react-router-dom';

const CompetitionManagementPage = () => {
  const { uuid } = useParams();

  return <ViewEditCompetitionForm uuid={uuid} />;
};
export default CompetitionManagementPage;
