import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const lngs = [
  { code: 'en', lang: 'EN' },
  { code: 'lt', lang: 'LT' }
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <Row className='justify-content-center' data-testid="language-switch">
      {lngs.map((lng) => (
        <Col md="2" className='px-0'>
        <Button
        className='px-0'
          variant="outline"
          bg="transparent"
          key={lng.code}
          onClick={() => handleLangChange(lng.code)}
          data-testid="language-switch-button"
          style={{
            fontWeight: i18n.language === lng.code ? 'bold' : 'normal', width:'100%'
          }}
        >
          {lng.lang}
        </Button>
        </Col>
      ))}
    </Row>
  );
};

export default LanguageSwitch;
