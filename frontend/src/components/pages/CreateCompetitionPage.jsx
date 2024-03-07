import React, { useState } from 'react';
import CreateCompetitionForm from '../parts/CreateCompetitionForm';

const CreateCompetition = () => {
  const [competitionData, setCompetitionData] = useState(null);

  const updateCompetitionData = (data) => {
    setCompetitionData(data);
  };
  return (
    <>
      <CreateCompetitionForm onUpdate={updateCompetitionData} competitionData={competitionData}/>
    </>
  );
};
export default CreateCompetition;
