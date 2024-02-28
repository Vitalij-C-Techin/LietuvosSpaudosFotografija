import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import CategoryModal from '../modals/CategoryModal';
import CreateCategory from '../modals/CreateCategory';
import { useTranslation } from 'react-i18next';

const ViewEditCompetition = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    cname: '',
    description: '',
    StartDate: '',
    photoLimit: '',
    status: '',
    visibility: ''
  });

  useEffect(() => {
    const initialFormData = JSON.stringify(formData);
    const currentFormData = JSON.stringify({
      cname: '',
      description: '',
      StartDate: '',
      photoLimit: '',
      status: selectedStatus,
      visibility: ''
    });
    setIsFormChanged(initialFormData !== currentFormData);
  }, [formData, selectedStatus]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (isFormChanged && window.confirm('Are you sure you want to save changes?')) {
      handleSave(formData);
    }
  };

  const handleCreateCategory = () => {
    setShowCreateCategoryModal(true);
  };

  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setShowCreateCategoryModal(false);
  };

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
  };

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h2>{t('editcomp.header')}</h2>
        </Card>
        <Button className="lsf-button w-40" style={{ marginRight: 'auto' }}>
          {t('editcomp.delete')}
        </Button>
        <hr style={{ inlineSize: '500px' }} />
      </Container>
      <Container className="justify-content-xl-center my-5">
        <Card>
          <h5>{t('editcomp.name')}</h5>
        </Card>
        <input
          type="text"
          id="cname"
          name="cname"
          value={formData.cname}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="description">{t('editcomp.description')}</label>
        <br />
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="5"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <label style={{ paddingLeft: '2rem' }} htmlFor="StartDate">
          {t('editcomp.Sdate')}
        </label>
        <label style={{ paddingLeft: '4rem' }} htmlFor="photoLimit">
          {t('editcomp.Plimit')}
        </label>
        <label style={{ paddingLeft: '4rem' }} htmlFor="status">
          {t('editcomp.status')}
        </label>
        <br />
        <input
          type="date"
          id="StartDate"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleInputChange}
        />
        <select
          style={{ marginLeft: '2rem' }}
          name="photoLimit"
          id="photoLimit"
          value={formData.photoLimit}
          onChange={handleInputChange}
        >
          <option value="1">{t('editcomp.solo')}</option>
          <option value="2">{t('editcomp.number')}</option>
          <option value="3">{t('editcomp.group')}</option>
        </select>
        <select
          style={{ marginLeft: '3rem' }}
          id="status"
          name="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value=""></option>
          <option value="active">{t('editcomp.active')}</option>
          <option value="closed">{t('editcomp.closed')}</option>
        </select>
        <br />
        <br />
        <label style={{ paddingLeft: '4rem' }} htmlFor="visibility">
          {t('editcomp.visible')}
        </label>
        <label style={{ paddingLeft: '4rem' }} htmlFor="EndDate">
          {t('editcomp.Edate')}
        </label>
        <br />
        <select
          style={{ marginLeft: '3rem' }}
          name="visibility"
          id="visibility"
          value={formData.visibility}
          onChange={handleInputChange}
        >
          <option value="1">{t('editcomp.active2')}</option>
          <option value="2">{t('editcomp.closed2')}</option>
        </select>
        <input style={{ marginLeft: '2rem' }} type="date" id="EndDate" name="EndDate" />
        <br />
        <hr style={{ inlineSize: '500px' }} />
      </Container>
      <Container className="justify-content-xl-center my-5">
        <h6 style={{ marginLeft: '7rem' }}>{t('editcomp.Addcategory')}</h6>
        <hr style={{ inlineSize: '500px' }} />
      </Container>
      <Container className="justify-content-xl-center my-5">
        <button onClick={handleSave} disabled={!isFormChanged}>
          Save
        </button>
        <button onClick={handleCreateCategory}>{t('editcomp.Ccategory')}</button>
        <button onClick={handleAddCategory}>{t('editcomp.Acategory')}</button>
        <CreateCategory
          showModal={showCreateCategoryModal}
          onClose={handleCloseCreateCategoryModal}
        />
        <CategoryModal showModal={showAddCategoryModal} onClose={handleCloseAddCategoryModal} />
      </Container>
    </>
  );
};

export default ViewEditCompetition;
