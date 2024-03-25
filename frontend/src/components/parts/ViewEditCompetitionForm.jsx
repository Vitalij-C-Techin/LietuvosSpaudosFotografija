import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Form, Col, Row } from 'react-bootstrap';
import ModalCategory from '../modals/ModalCategory';
import ModalCreateCategory from '../modals/ModalCreateCategory';
import ModalDeleteCompetition from '../modals/ModalDeleteCompetition';
import ModalSaveCreateCompetition from '../modals/ModalSaveCreateCompetition';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import imagePlaceHolder from '../../images/image.jpg';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';
import Photo from '../utils/Photo';

const ViewEditCompetitionForm = ({ uuid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [modalShowCreateCategory, setModalShowCreateCategory] = useState(false);
  const [modalShowAddCategory, setModalShowAddCategory] = useState(false);
  const [modalShowDeleteCompetition, setModalShowDeleteCompetition] = useState(false);
  const [modalShowCreateCompetition, setModalShowCreateCompetition] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [photoLimitError, setPhotoLimitError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUploadError, setPhotoUploadError] = useState('');
  const { getTokenHeader } = useAuth();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    let url = Config.apiDomain + Config.endpoints.competitions.edit;
    url = url.replace('{uuid}', uuid);

    axios
      .get(url, {
        headers: getTokenHeader()
      })
      .then((response) => {
        console.log('Response data', response.data.data);

        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [uuid]);

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
        console.error('Error:', error);
      });

    return imageData;
  };

  const getImage = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    const url = new Photo(formData.photo).getPhotoSmallUrl();
    if (!!url) {
      return url;
    }

    return imagePlaceHolder;
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
      setPhotoUploadError('');

      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setPhotoUploadError(t('editcomp.allowedTypes'));

      return;
    }

    setSelectedFile(file);
    setPhotoUploadError('');
  };

  const confirmSave = async () => {
    const data = formData;

    const imageReponse = await uploadImage(selectedFile);
    if (!!imageReponse) {
      data.photo = imageReponse;
      data.image_uuid = imageReponse.uuid;
    }

    console.log("Data save", data);

    let url = Config.apiDomain + Config.endpoints.competitions.edit;
    url = url.replace('{uuid}', uuid);

    axios
      .put(url, data, {
        headers: getTokenHeader()
      })
      .then((response) => {
        navigate('/admin-competitions-list');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSave = async () => {
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      alert(t('editcomp.dateAllert'));
      return;
    }

    setModalShowCreateCompetition(true);
  };

  const handleDelete = async () => {
    let url = Config.apiDomain + Config.endpoints.competitions.edit;
    url = url.replace('{uuid}', uuid);

    axios
      .delete(url, {
        headers: getTokenHeader()
      })
      .then(() => {
        navigate('/admin-competitions-list');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const deleteCompetition = async () => {
    setModalShowDeleteCompetition(true);
  };

  const modalHandleOpenCreateCategory = () => {
    setModalShowCreateCategory(true);
  };

  const modalHandleCloseCreateCategory = () => {
    setModalShowCreateCategory(false);
  };

  const modalHandleOpenAddCategory = () => {
    setModalShowAddCategory(true);
  };

  const modalHandleCloseAddCategory = () => {
    setModalShowAddCategory(false);
  };

  const modalHandelOpenDeleteCompetition = () => {
    setModalShowDeleteCompetition(true);
  };

  const modalHandelCloseDeleteCompetition = () => {
    setModalShowDeleteCompetition(false);
  };

  const modalHandleCloseCreateCompetition = () => {
    setModalShowCreateCompetition(false);
  };

  return (
    <>
      <Container className="view-edit-competition-container">
        <Container className="competition-header-container my-5">
          <Row>
            <Col xl="6">
              <Card className="image-header-text">
                <h2>{t('editcomp.headerView')}</h2>
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
                    onClick={deleteCompetition}
                  >
                    {t('editcomp.delete')}
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
                    <Image src={getImage()} rounded />
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
                        value={formData.name_en || ''}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md="6" xl="12">
                      <Form.Label htmlFor="name_lt">{t('editcomp.name2')}</Form.Label>
                      <Form.Control
                        type="text"
                        id="name_lt"
                        name="name_lt"
                        value={formData.name_lt || ''}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={{ order: 'first' }} xl={{ order: 'last', span: 12 }}>
                      <Row>
                        {photoUploadError && <p className="text-danger">{photoUploadError}</p>}
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
                    value={formData.description_en || ''}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Col>

                <Col xl="6">
                  <Form.Label htmlFor="description_lt">{t('editcomp.description2')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description_lt"
                    id="description_lt"
                    value={formData.description_lt || ''}
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
                    value={formData.photo_limit || ''}
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
                    value={formData.status || ''}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="COMING">{t('editcomp.coming')}</option>
                    <option value="EVALUATES">{t('editcomp.evaluates')}</option>
                    <option value="GOING">{t('editcomp.going')}</option>
                    <option value="FINISHED">{t('editcomp.finished')}</option>
                  </Form.Select>
                </Col>
                <Col xs="12" md="4">
                  <Form.Label htmlFor="visibility">{t('editcomp.visible')}</Form.Label>
                  <Form.Select
                    name="visibility"
                    id="visibility"
                    value={formData.visibility || ''}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="PUBLIC">{t('editcomp.public')}</option>
                    <option value="PRIVATE">{t('editcomp.private')}</option>
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
                    value={formData.start_date || ''}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="end_date">{t('editcomp.Edate')}</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date || ''}
                    onChange={handleInputChange}
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
                  </Container>
                </Col>
                <Col xs="6" xl="4" className="justify-content-xl-center">
                  <Row>
                    <Col xl="12">
                      <Button variant="secondary" onClick={modalHandleOpenCreateCategory}>
                        {t('modalCategory.titleAdd')}
                      </Button>
                    </Col>
                    <Col xl="12">
                      <Button variant="secondary" onClick={modalHandleOpenAddCategory}>
                        {t('modalCategory.titleEdit')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="divider"></div>
              <ModalCreateCategory
                showModal={modalShowCreateCategory}
                onClose={modalHandleCloseCreateCategory}
              />
              <ModalCategory
                showModal={modalShowAddCategory}
                onClose={modalHandleCloseAddCategory}
              />
              <ModalDeleteCompetition
                showModal={modalShowDeleteCompetition}
                onClose={modalHandelCloseDeleteCompetition}
                confirmDelete={handleDelete}
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

export default ViewEditCompetitionForm;
