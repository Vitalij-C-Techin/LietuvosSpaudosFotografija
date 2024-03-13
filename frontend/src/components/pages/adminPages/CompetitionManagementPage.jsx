import ViewEditCompetitionForm from '../../parts/ViewEditCompetitionForm';
import { useParams } from 'react-router-dom';

const CompetitionManagementPage = () => {
  const { uuid } = useParams();

  return <ViewEditCompetitionForm competitionUUID={uuid} />;
};
export default CompetitionManagementPage;
