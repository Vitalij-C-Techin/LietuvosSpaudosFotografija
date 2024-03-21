import ViewEditCompetitionForm from '../../parts/ViewEditCompetitionForm';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalCreateCategory from '../../modals/category/ModalCreateCategory';

const CompetitionManagementPage = () => {
  const { uuid } = useParams();
  const [modalShowCreateCategory, setModalShowCreateCategory] = useState(false);

  const modalHandleOpenCreateCategory = () => {
    setModalShowCreateCategory(true);
  };

  const modalHandleCloseCreateCategory = () => {
    setModalShowCreateCategory(false);
  };

  return (
    <>
      <ViewEditCompetitionForm
        uuid={uuid}
        modalHandleOpenCreateCategory={modalHandleOpenCreateCategory}
      />
      <ModalCreateCategory
        showModal={modalShowCreateCategory}
        onClose={() => modalHandleCloseCreateCategory()}
        uuid={uuid}
      />
    </>
  );
};
export default CompetitionManagementPage;
