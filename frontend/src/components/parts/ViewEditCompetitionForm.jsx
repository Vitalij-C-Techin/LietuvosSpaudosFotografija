import { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Form } from 'react-bootstrap';
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
    setFormData({ ...formData, [name]: value });
    setIsFormChanged(true);
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
        <Container className="justify-content-xl-center my-5">
          <Card className="image-header-text">
            <h2>{t('editcomp.header')}</h2>
          </Card>
          <Button variant="secondary" className="lsf-Button w-40">
            {t('editcomp.delete')}
          </Button>
        </Container>
        <div className="divider"></div>
        <Container className="justify-content-xl-center my-5">
          <Container className="image-container">
            <Image src={imagePlaceHolder}></Image>
            <Button variant="secondary">Add picture</Button>
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
          <Form.Select
            name="photoLimit"
            id="photoLimit"
            value={formData.photoLimit}
            onChange={handleInputChange}
          >
            <option value="1">{t('editcomp.solo')}</option>
            <option value="2">{t('editcomp.number')}</option>
            <option value="3">{t('editcomp.group')}</option>
          </Form.Select>
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
        <Container className="justify-content-xl-center my-5">
          <Button variant="secondary" onClick={handleSave} disabled={!isFormChanged}>
            {t('editcomp.Save')}
          </Button>
          <Button variant="secondary" onClick={handleCreateCategory}>
            {t('editcomp.Ccategory')}
          </Button>
          <Button variant="secondary" onClick={handleAddCategory}>
            {t('editcomp.Acategory')}
          </Button>
          <ModalCreateCategory
            showModal={showCreateCategoryModal}
            onClose={handleCloseCreateCategoryModal}
          />
          <ModalCategory showModal={showAddCategoryModal} onClose={handleCloseAddCategoryModal} />
        </Container>
      </Container>
    </>
  );
};

export default ViewEditCompetitionForm;
