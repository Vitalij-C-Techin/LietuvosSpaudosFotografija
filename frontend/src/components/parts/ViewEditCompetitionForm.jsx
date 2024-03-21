import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Image, Button, Form, Col, Row } from 'react-bootstrap';
import ModalEditCategory from '../modals/category/ModalEditCategory';
import ModalCreateCategory from '../modals/category/ModalCreateCategory';

import ModalDeleteCompetition from '../modals/competition/ModalDeleteCompetition';
import ModalSaveCreateCompetition from '../modals/competition/ModalSaveCreateCompetition';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import imagePlaceHolder from '../../images/image.jpg';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ViewEditCompetitionForm = ({ uuid, modalHandleOpenCreateCategory }) => {
  const navigate = useNavigate();

  const [modalShowEditCategory, setModalShowEditCategory] = useState(false);
  const [modalShowDeleteCompetition, setModalShowDeleteCompetition] = useState(false);
  const [modalShowCreateCompetition, setModalShowCreateCompetition] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryUUID, setSelectedCategoryUUID] = useState(null);
  const [shouldRefetchCategories, setShouldRefetchCategories] = useState(false);

  const [isFormChanged, setIsFormChanged] = useState(false);
  const { t, i18n } = useTranslation();
  const [photoLimitError, setPhotoLimitError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUploaderror, setPhotoUploadError] = useState('');
  const { getTokenHeader } = useAuth();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/competition/${uuid}`, {
          headers: getTokenHeader()
        });
        const competitionData = response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          name_en: competitionData.data.nameEn || '',
          name_lt: competitionData.data.nameLt || '',
          description_en: competitionData.data.descriptionEn || '',
          description_lt: competitionData.data.descriptionLt || '',
          start_date: competitionData.data.startDate || '',
          end_date: competitionData.data.endDate || '',
          status: competitionData.data.status || '',
          visibility: competitionData.data.visibility || '',
          photo_limit: competitionData.data.photoLimit || ''
        }));

        const categoriesResponse = await axios.get(
          `http://localhost:8080/api/v1/competition/${uuid}/categories`,
          { headers: getTokenHeader() }
        );

        const categoriesData = categoriesResponse.data;
        setCategories([...categoriesData]);
      } catch (error) {
        alert(t('editcomp.error2'), error);
      }
    };
    fetchCompetitionData();
  }, [uuid, useCallback(modalHandleOpenCreateCategory)]);

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
    const allowedTypes = ['image/jpg'];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setPhotoUploadError(t('editcomp.allowedTypes'));
      } else {
        setSelectedFile(file);
        setPhotoUploadError('');
      }
    } else {
      setPhotoUploadError('');
      setSelectedFile(null);
    }
    setIsFormChanged(true);
  };

  const confirmSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/competition/${uuid}`, formData, {
        headers: getTokenHeader()
      });
      navigate('/admin-competitions-list');
    } catch (error) {
      alert(t('editcomp.error3'), error);
    }
  };
  const handleSave = async () => {
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      alert(t('editcomp.dateAllert'));
      return;
    }
    setModalShowCreateCompetition(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/competition/${uuid}`, {
        headers: getTokenHeader()
      });
      navigate('/admin-competitions-list');
    } catch (error) {
      console.log(t('editcomp.error4'), error);
    }
  };

  const handleCategoryOpen = (categoryUUID) => {
    setModalShowEditCategory(true);
    setSelectedCategoryUUID(categoryUUID);
  };

  const handleCategoryChange = async (updatedCategoryUUID, updatedCategoryData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/category/${updatedCategoryUUID}`,
        updatedCategoryData,
        {
          headers: getTokenHeader()
        }
      );
      const updatedCategory = response.data;
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.uuid === updatedCategoryUUID ? updatedCategory : category
        )
      );
    } catch (error) {
      alert(t('editcomp.error'), error);
    }
  };

  const deleteCompetition = async () => {
    setModalShowDeleteCompetition(true);
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

  const modalHandleOpenEditCategory = () => {
    setModalShowEditCategory(true);
  };

  const modalHandleCloseEditCategory = () => {
    setModalShowEditCategory(false);
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
    }
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
                  <Form.Label htmlFor={`photo_limit_${uuid}`}>{t('editcomp.Plimit')}</Form.Label>

                  <Form.Control
                    name="photo_limit"
                    id={`photo_limit_${uuid}`}
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
                    onInput={maxLengthCheck}
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
                    {categories.map((category) => (
                      <div key={category.uuid} onClick={() => handleCategoryOpen(category.uuid)}>
                        <Form.Label>
                          {i18n.language === 'en' ? category.nameEn : category.nameLt}
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
                    <Col xl="12"></Col>
                  </Row>
                </Col>
              </Row>
              <div className="divider"></div>
              <ModalEditCategory
                showModal={modalShowEditCategory}
                onClose={modalHandleCloseEditCategory}
                selectedCategoryUUID={selectedCategoryUUID}
                handleCategoryChange={handleCategoryChange}
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
