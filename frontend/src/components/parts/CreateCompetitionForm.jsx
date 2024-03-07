import { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Form, Col, Row } from 'react-bootstrap';
import ModalCategory from '../modals/ModalCategory';
import ModalCreateCategory from '../modals/ModalCreateCategory';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import imagePlaceHolder from '../../images/image.jpg';
import axios from 'axios';

const CreateCompetitionForm = ({ competitionData, onUpdate }) => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [photoLimitError, setPhotoLimitError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: 'aaa',
    end_date: '2024-11-20',
    name: 'aaa',
    photo_limit: '23',
    start_date: '2024-07-12',
    status: 'active',
    visibility: 'visible',
    name_lt: 'ssss',
    name_en: 'ssss',
    description_lt: 'ssss'
  });

  //TODO add post request correct link
  //TODO delete all console.log
  //TODO check for photo submission
  //TODO corect layout of photo upload

  const handleSave = async () => {
    if (isFormChanged && typeof onUpdate === 'function' && !photoLimitError) {
      const confirmSave = window.confirm(t('editcomp.message'));
      if (confirmSave) {
        try {
          // const formDataWithFile = new FormData();
          // formDataWithFile.append('image', selectedFile);
          // Object.entries(formData).forEach(([key, value]) => {
          //   formDataWithFile.append(key, value);
          // });
          await axios.post('http://localhost:8080/api/v1/competition', formData);
          setIsFormChanged(false);
          console.log('competition created');
          navigate('/admin-competitions-list');
        } catch (error) {
          console.error('Error creating competition:', error);
        }
      }
    }
  };

  useEffect(() => {
    const initialFormData = JSON.stringify(competitionData);
    const currentFormData = JSON.stringify(formData);
    setIsFormChanged(initialFormData !== currentFormData);
  }, [competitionData, formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'photoLimit') {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 50)) {
        setFormData({
          ...formData,
          [name]: value
        });
        setPhotoLimitError('');
      } else {
        setPhotoLimitError(t('editcomp.error2'));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  //TODO add more allowedTypes by need
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setPhotoLimitError('');
    } else {
      setSelectedFile(null);
      setPhotoLimitError('wrong file');
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
          <Row>
            <Col xl="6">
              <Card className="image-header-text">
                <h2>{t('editcomp.header1')}</h2>
              </Card>
            </Col>
            <Col xl="2">
              <Button variant="secondary" onClick={handleSave} disabled={!isFormChanged}>
                {t('editcomp.Save')}
              </Button>
            </Col>
            <Col xl="2">
              <Button variant="secondary" className="lsf-Button w-40">
                {t('editcomp.delete')}
              </Button>
            </Col>
          </Row>
        </Container>
        <div className="divider"></div>
        <Row>
          <Col>
            <Container className="justify-content-xl-center my-5">
              <Row>
                <Col>
                  <Container className="image-container mb-3">
                    <Image
                      src={selectedFile ? URL.createObjectURL(selectedFile) : imagePlaceHolder}
                      rounded
                    />
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>{t('editcomp.compPicButton')}</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col xl="4">
                  <Form.Label htmlFor="name">{t('editcomp.name')}</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    autoComplete="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xl="6">
                  <Form.Label htmlFor="description">{t('editcomp.description')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="photo_limit">{t('editcomp.Plimit')}</Form.Label>
                  {photoLimitError && <p className="text-danger">{photoLimitError}</p>}
                  <Form.Control
                    name="photo_limit"
                    id="photo_limit"
                    value={formData.photo_limit}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    placeholder={t('editcomp.error2')}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label htmlFor="status">{t('editcomp.status')}</Form.Label>
                  <Form.Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="active">{t('editcomp.active')}</option>
                    <option value="closed">{t('editcomp.closed')}</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label htmlFor="visibility">{t('editcomp.visible')}</Form.Label>
                  <Form.Select
                    name="visibility"
                    id="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="visible">{t('editcomp.active2')}</option>
                    <option value="hidden">{t('editcomp.closed2')}</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="start_date">{t('editcomp.Sdate')}</Form.Label>
                  <Form.Control
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="end_date">{t('editcomp.Edate')}</Form.Label>
                  <Form.Control
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className="py-5">
            <Container className="justify-content-xl-center mt-3 mb-5">
              <Row>
                <Col>
                  <Button variant="secondary" onClick={handleCreateCategory}>
                    {t('modalCategory.titleAdd')}
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={handleAddCategory}>
                    {t('modalCategory.titleEdit')}
                  </Button>
                </Col>
              </Row>
              <ModalCreateCategory
                showModal={showCreateCategoryModal}
                onClose={handleCloseCreateCategoryModal}
              />
              <ModalCategory
                showModal={showAddCategoryModal}
                onClose={handleCloseAddCategoryModal}
              />
              <div className="divider mt-5 "></div>
              <Container className="justify-content-xl-center my-5">
                <h6>{t('editcomp.Addcategory')}</h6>
              </Container>
              <div className="divider"></div>
            </Container>
            {/* </Col> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCompetitionForm;
