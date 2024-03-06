import { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Form, Col } from 'react-bootstrap';
import ModalCategory from '../modals/ModalCategory';
import ModalCreateCategory from '../modals/ModalCreateCategory';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import imagePlaceHolder from '../../images/image.jpg';

const ViewEditCompetitionForm = ({ competitionData, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cname: '',
    description: '',
    StartDate: '',
    photoLimit: '',
    status: '',
    visibility: ''
  });

  useEffect(() => {
    const initialFormData = JSON.stringify(competitionData);
    const currentFormData = JSON.stringify(formData);
    setIsFormChanged(initialFormData !== currentFormData);
  }, [competitionData, formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'photoLimit' && (value < 1 || value > 50)) {
      setError('Photo limit must be between 1 and 50');
    } else {
      setFormData({ ...formData, [name]: value });
      setIsFormChanged(true);
    }
  };

  const handleSave = () => {
    if (isFormChanged && typeof onUpdate === 'function') {
      const confirmSave = window.confirm(t('editcomp.message'));
      if (confirmSave) {
        onUpdate(formData);
        setIsFormChanged(false);
        navigate('/admin-competitions-list');
      }
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
      <Container className="view-edit-competition-container">
        {/* <Col xs="12" xl="6"> */}
        <Container className="justify-content-xl-center my-5">
          <Card className="image-header-text">
            <h2>{t('editcomp.header')}</h2>
          </Card>
          <Button variant="secondary" onClick={handleSave} disabled={!isFormChanged}>
            {t('editcomp.Save')}
          </Button>
          <Button variant="secondary" className="lsf-Button w-40">
            {t('editcomp.delete')}
          </Button>
        </Container>
        <div className="divider"></div>
        <Container className="justify-content-xl-center my-5">
          <Container className="image-container mb-3">
            <Image src={imagePlaceHolder}></Image>
            <Button variant="secondary"> {t('editcomp.compPicButton')}</Button>
          </Container>
          <Form.Label htmlFor="cname">{t('editcomp.name')}</Form.Label>

          <Form.Control
            type="text"
            id="cname"
            name="cname"
            value={formData.cname}
            onChange={handleInputChange}
          />
          <Form.Label htmlFor="description">{t('editcomp.description')}</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
          ></Form.Control>

          <Form.Label htmlFor="photoLimit">{t('editcomp.Plimit')}</Form.Label>
          <Form.Control
            name="photoLimit"
            id="photoLimit"
            value={formData.photoLimit}
            onChange={handleInputChange}
            min="1"
            max="50"
          ></Form.Control>
          <Form.Label htmlFor="status">{t('editcomp.status')}</Form.Label>
          <Form.Select
            id="status"
            name="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value=""></option>
            <option value="active">{t('editcomp.active')}</option>
            <option value="closed">{t('editcomp.closed')}</option>
          </Form.Select>
          <Form.Label htmlFor="visibility">{t('editcomp.visible')}</Form.Label>
          <Form.Select
            name="visibility"
            id="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
          >
            <option value="1">{t('editcomp.active2')}</option>
            <option value="2">{t('editcomp.closed2')}</option>
          </Form.Select>
          <Form.Label htmlFor="StartDate">{t('editcomp.Sdate')}</Form.Label>
          <Form.Control
            type="date"
            id="StartDate"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleInputChange}
          />
          <Form.Label htmlFor="EndDate">{t('editcomp.Edate')}</Form.Label>
          <Form.Control type="date" id="EndDate" name="EndDate" />
        </Container>
        <div className="divider"></div>
        <Container className="justify-content-xl-center my-5">
          <h6>{t('editcomp.Addcategory')}</h6>
        </Container>
        <div className="divider"></div>
        <Container className="justify-content-xl-center mt-3 mb-5">
          <Button variant="secondary" onClick={handleCreateCategory}>
            {t('modalCategory.titleAdd')}
          </Button>
          <Button variant="secondary" onClick={handleAddCategory}>
            {t('modalCategory.titleEdit')}
          </Button>
          <ModalCreateCategory
            showModal={showCreateCategoryModal}
            onClose={handleCloseCreateCategoryModal}
          />
          <ModalCategory showModal={showAddCategoryModal} onClose={handleCloseAddCategoryModal} />
        </Container>
        {/* </Col> */}
      </Container>
    </>
  );
};

export default ViewEditCompetitionForm;
