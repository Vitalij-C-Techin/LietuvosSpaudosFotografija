import { useState } from 'react';
import { Container, Card, Image, Button, Form, Col, Row } from 'react-bootstrap';
import ModalCreateCategory from '../modals/category/ModalCreateCategory';
import ModalCancelCreation from '../modals/competition/ModalCancelCreation';
import ModalSaveCreateCompetition from '../modals/competition/ModalSaveCreateCompetition';
import { useTranslation } from 'react-i18next';
import { json, useNavigate } from 'react-router-dom';
import imagePlaceHolder from '../../images/image.jpg';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';

const CreateCompetitionForm = () => {
  const [modalShowCreateCategory, setModalShowCreateCategory] = useState(false);
  const [modalShowAddCategory, setModalShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modalShowCancelCreation, setModalShowCancelCreation] = useState(false);
  const [modalShowCreateCompetition, setModalShowCreateCompetition] = useState(false);
  const [photoUploaderror, setUploadPhotoError] = useState('');
  const [photoLimitError, setPhotoLimitError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { getTokenHeader } = useAuth();
  const [formData, setFormData] = useState({
    end_date: '',
    photo_limit: '',
    start_date: '',
    status: '',
    visibility: '',
    name_lt: '',
    name_en: '',
    description_lt: '',
    description_en: ''
  });

  const uploadImage = async (file) => {
    if (!!!file) {
      return false;
    }

    let imageData = false;

    const url = Config.apiDomain + Config.endpoints.photo.add;

    const data = new FormData();
    data.append('image', file, file.name);

    await axios
      .post(url, data, {
        headers: {
          'Content-Type': `multipart/form-data`,
          ...getTokenHeader()
        }
      })
      .then((response) => {
        imageData = response.data;
      })
      .catch((error) => {
        alert('Error:', error);
      });

    return imageData;
  };

  const handleSave = async () => {
    if (!isFormDataValid(formData)) {
      alert(t('editcomp.valid'));
      return;
    }
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      alert(t('editcomp.dateAllert'));
      return;
    }
    setModalShowCreateCompetition(true);
  };

  const handleCreateCategory = (categoryData) => {
    setCategories([...categories, categoryData]);
    setModalShowCreateCategory(false);
  };

  const confirmSave = async () => {
    const data = formData;

    const imageReponse = await uploadImage(selectedFile);
    if (!!imageReponse) {
      data.image_uuid = imageReponse.uuid;
    }

    const url = Config.apiDomain + Config.endpoints.competitions.create;

    axios
      .post(url, data, {
        headers: getTokenHeader()
      })
      .then((response) => {
        navigate('/admin-competitions-list');
      })
      .catch((error) => {
        alert(t('editcompt.error1'));
      });
  };

  const isFormDataValid = (data) => {
    const requiredFields = [
      'end_date',
      'photo_limit',
      'start_date',
      'status',
      'visibility',
      'name_lt',
      'name_en',
      'description_lt',
      'description_en'
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'photo_limit') {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 50)) {
        setFormData({
          ...formData,
          [name]: value
        });
        setPhotoLimitError('');
      } else {
        setPhotoLimitError(t('editcomp.limitError'));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!file) {
      setUploadPhotoError('');

      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setUploadPhotoError(t('editcomp.allowedTypes'));

      return;
    }

    setSelectedFile(file);
    setUploadPhotoError('');
  };

  const modalHandleOpenCreateCategory = () => {
    setModalShowCreateCategory(true);
  };

  const modalHandleCloseCreateCategory = () => {
    setModalShowCreateCategory(false);
  };

  const modalHadleOpenCancelCreation = () => {
    setModalShowCancelCreation(true);
  };

  const modalHandleCloseCancelCreation = () => {
    setModalShowCancelCreation(false);
  };

  const modalHandleCloseCreateCompetition = () => {
    setModalShowCreateCompetition(false);
  };

  const maxLengthCheck = (event) => {
    let date = event.target.value;
    if (date) {
      let dateArr = date.split('-');
      if (dateArr[0] && dateArr[0].length > 4) {
        dateArr[0] = dateArr[0].substr(0, 4);
        date = dateArr.join('-');
        event.target.value = date;
      }
      if (date.length === 4) {
        const nextInput = event.target.nextElementSibling;
        if (nextInput && nextInput.tagName === 'INPUT') {
          nextInput.focus();
        }
      }
    }
  };

  return (
    <>
      <Container className="view-edit-competition-container">
        <Container className="competition-header-container my-5">
          <Row>
            <Col xl="6">
              <Card className="image-header-text">
                <h2>{t('editcomp.headerCreate')}</h2>
              </Card>
            </Col>
            <Col>
              <Row className="justify-content-center" xl="6">
                <Col xl="4">
                  <Button variant="secondary" onClick={handleSave}>
                    {t('editcomp.Save')}
                  </Button>
                </Col>
                <Col xl="4">
                  <Button
                    variant="secondary"
                    className="lsf-Button w-40"
                    onClick={modalHadleOpenCancelCreation}
                  >
                    {t('editcomp.cancel')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="divider"></div>
        <Row className="competition-form-row pb-5">
          <Col>
            <Container className="mt-4">
              <Row className="container-image-row">
                <Col md="4" xl="6">
                  <Container className="image-container mb-3">
                    <Image
                      src={selectedFile ? URL.createObjectURL(selectedFile) : imagePlaceHolder}
                      rounded
                    />
                  </Container>
                </Col>
                <Col>
                  <Row className="competition-title-row">
                    <Col md="6" xl="12">
                      <Form.Label htmlFor="name_en">{t('editcomp.name')}</Form.Label>
                      <Form.Control
                        type="text"
                        id="name_en"
                        name="name_en"
                        value={formData.name_en}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md="6" xl="12">
                      <Form.Label htmlFor="name_lt">{t('editcomp.name2')}</Form.Label>
                      <Form.Control
                        type="text"
                        id="name_lt"
                        name="name_lt"
                        value={formData.name_lt}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={{ order: 'first' }} xl={{ order: 'last', span: 12 }}>
                      <Row>
                        {photoUploaderror && <p className="text-danger">{photoUploaderror}</p>}
                        <Form.Group controlId="formFile">
                          <Form.Label>{t('editcomp.compPicButton')}</Form.Label>
                          <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="competition-description-row">
                <Col xl="6">
                  <Form.Label htmlFor="description_en">{t('editcomp.description')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description_en"
                    id="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Col>

                <Col xl="6">
                  <Form.Label htmlFor="description_lt">{t('editcomp.description2')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description_lt"
                    id="description_lt"
                    value={formData.description_lt}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Col>
              </Row>
              <Row className="competition-selections-row">
                <Col xs="12" md="4">
                  <Form.Label htmlFor="photo_limit">{t('editcomp.Plimit')}</Form.Label>

                  <Form.Control
                    name="photo_limit"
                    id="photo_limit"
                    value={formData.photo_limit}
                    onChange={handleInputChange}
                    type="number"
                    min="1"
                    max="50"
                  ></Form.Control>
                  {photoLimitError && <p className="text-danger">{photoLimitError}</p>}
                </Col>
                <Col xs="12" md="4">
                  <Form.Label htmlFor="status">{t('editcomp.status')}</Form.Label>
                  <Form.Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="coming">{t('editcomp.coming')}</option>
                    <option value="evaluates">{t('editcomp.evaluates')}</option>
                    <option value="going">{t('editcomp.going')}</option>
                    <option value="finished">{t('editcomp.finished')}</option>
                  </Form.Select>
                </Col>
                <Col xs="12" md="4">
                  <Form.Label htmlFor="visibility">{t('editcomp.visible')}</Form.Label>
                  <Form.Select
                    name="visibility"
                    id="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="public">{t('editcomp.public')}</option>
                    <option value="private">{t('editcomp.private')}</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="competition-date-row">
                <Col>
                  <Form.Label htmlFor="start_date">{t('editcomp.Sdate')}</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    onInput={maxLengthCheck}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="end_date">{t('editcomp.Edate')}</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    onInput={maxLengthCheck}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xl="6" className="pb-5">
            <Container className="justify-content-xl-center mt-3 mb-5">
              <div className="divider mt-5 "></div>
              <Row className="py-3">
                <Col xs="6" xl="8" className="justify-content-xl-center py-3">
                  <Container className="pt-3">
                    <h2>{t('editcomp.Addcategory')}</h2>
                    {categories.map((category, index) => (
                      <div key={index}>
                        <Form.Label>
                          {i18n.language === 'en'
                            ? category.category_name_en
                            : category.category_name_lt}
                        </Form.Label>
                      </div>
                    ))}
                  </Container>
                </Col>
                <Col xs="6" xl="4" className="justify-content-xl-center">
                  <Row>
                    <Col xl="12">
                      <Button variant="secondary" onClick={modalHandleOpenCreateCategory}>
                        {t('modalCreate.titleCreate')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="divider"></div>
              <ModalCreateCategory
                showModal={modalShowCreateCategory}
                onClose={modalHandleCloseCreateCategory}
                onCreateCategory={handleCreateCategory}
              />
              <ModalCancelCreation
                showModal={modalShowCancelCreation}
                onClose={modalHandleCloseCancelCreation}
              />
              <ModalSaveCreateCompetition
                showModal={modalShowCreateCompetition}
                onClose={modalHandleCloseCreateCompetition}
                confirmSave={confirmSave}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCompetitionForm;
