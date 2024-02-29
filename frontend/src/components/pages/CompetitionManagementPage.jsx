import React, { useState } from 'react';
import ViewEditCompetitionForm from '../parts/ViewEditCompetitionForm';

const CompetitionManagementPage = () => {
  const [competitionData, setCompetitionData] = useState(null);

  const updateCompetitionData = (data) => {
    setCompetitionData(data);
  };

  return (
    <>
      <ViewEditCompetitionForm onUpdate={updateCompetitionData} competitionData={competitionData} />
    </>
  );
};

export default CompetitionManagementPage;
