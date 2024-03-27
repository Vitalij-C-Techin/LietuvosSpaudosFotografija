import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image, Modal, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';
import { useParams } from 'react-router';
import EmptyMessage from '../messages/EmptyMessage';
import Photo from '../utils/Photo';

const placeholderImage = 'https://content.hostgator.com/img/weebly_image_sample.png';

const UserCategoryPage = () => {
  const [t, i18n] = useTranslation();
  const { getTokenHeader } = useAuth();

  const params = useParams();
  const uuid = params.uuid;

  const [isLoading, setIsLoading] = useState(true);

  const [submission, setSubmission] = useState(null);
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [tmpPhotos, setTmpPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const addPhoto = (photo) => {
    setPhotos([...photos, photo]);
  };

  const removePhoto = (photo) => {
    setPhotos(
      photos.filter((p) => {
        return p.uuid != photo.uuid;
      })
    );

    requestPhotoDelete(photo);
  };

  const addTmpPhoto = (photos) => {
    setTmpPhotos([...tmpPhotos, ...photos]);
  };

  const removeTmpPhoto = (file) => {
    setTmpPhotos(
      tmpPhotos.filter((p) => {
        return p.name != file.name;
      })
    );
  };

  const removeTmpPhotos = () => {
    setTmpPhotos([]);
  };

  const uploadTmpPhotos = async () => {
    setIsUploading(true);

    for (let i = 0; i < tmpPhotos.length; i++) {
      await requestPhotoUpload(tmpPhotos[0]);
    }

    setIsUploading(false);
  };

  const onDrop = (files) => {
    addTmpPhoto(files);
  };

  const requestPhotoUpload = async (file) => {
    let url = Config.apiDomain + Config.endpoints.album.addPhoto;
    url = url.replace('{uuid}', album.uuid);

    let formData = new FormData();
    formData.append('image', file);

    await axios
      .post(url, formData, {
        headers: getTokenHeader()
      })
      .then((response) => {
        console.log('Photo uploaded: ', file, response.data);

        addPhoto(response.data);
        removeTmpPhoto(file);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return true;
  };

  const requestPhotoDelete = async (photo) => {
    let url = Config.apiDomain + Config.endpoints.photo.manage;
    url = url.replace('{uuid}', photo.uuid);

    await axios
      .delete(url, {
        headers: getTokenHeader()
      })
      .then((response) => {
        console.log('Photo deleted: ', photo, response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return true;
  };

  const requestData = async () => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.submission.get;
    url = url.replace('{uuid}', uuid);

    await axios
      .get(url, {
        headers: getTokenHeader()
      })
      .then((response) => {
        setSubmission(response.data.submission);

        const album = response.data.albums[0] || null;

        if (!!album) {
          setAlbum(album);
        }

        setPhotos(album.photoList);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    requestData();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    }
  });

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('userCategoryEdit.title')}</h3>
        </Card>
      </Container>

      <Container className="justify-content-xl-center my-5">
        <input {...getInputProps()} />
        <div className="lsf-photo-drop-list" {...getRootProps()}></div>
      </Container>

      <UploadPhotoList photos={tmpPhotos} removePhoto={removeTmpPhoto} />

      {!!tmpPhotos.length && (
        <>
          <Container className="justify-content-xl-center my-3">
            <Button className="lsf-button w-100" onClick={uploadTmpPhotos}>
              {t('userCategoryEdit.upload')}
            </Button>
          </Container>
        </>
      )}

      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('userCategoryEdit.myPhotos')}</h3>
        </Card>
      </Container>

      <MyPhotoList photos={photos} removePhoto={removePhoto} />

      <Container className="justify-content-xl-center my-5">
        <p>{t('userCategoryEdit.doubleClickToRemovePhoto')}</p>
      </Container>
    </>
  );
};

const MyPhotoList = ({ photos, removePhoto }) => {
  const [t, i18n] = useTranslation();

  if (!!!photos.length) {
    return <EmptyMessage />;
  }

  const list = photos.map((p, i) => {
    return <MyPhoto key={i} photo={p} removePhoto={removePhoto} />;
  });

  return (
    <>
      <Container>
        <Row>{list}</Row>
      </Container>
    </>
  );
};

const MyPhoto = ({ photo, removePhoto }) => {
  const p = new Photo(photo);

  const onDouble = () => {
    removePhoto(photo);
  };

  return (
    <Col xs={6} md={4} xl={3}>
      <Image src={p.getPhotoSmallUrl()} className="lst-photo" onDoubleClick={onDouble} />
    </Col>
  );
};

const UploadPhotoList = ({ photos, removePhoto }) => {
  const [t, i18n] = useTranslation();

  if (!!!photos.length) {
    return;
  }

  const list = photos.map((p, i) => {
    return <UploadPhoto key={i} photo={p} removePhoto={removePhoto} />;
  });

  return (
    <>
      <Container>
        <Row>{list}</Row>
      </Container>
    </>
  );
};

const UploadPhoto = ({ photo, removePhoto }) => {
  const onClick = () => {
    removePhoto(photo);
  };

  return (
    <Col xs={6} md={4} xl={3}>
      <Image src={URL.createObjectURL(photo)} className="lst-photo" onDoubleClick={onClick} />
    </Col>
  );
};

export default UserCategoryPage;
