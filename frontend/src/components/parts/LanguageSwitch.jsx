import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { Row, Col, Dropdown } from 'react-bootstrap';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
  };

  return (
    <Dropdown.Item
      style={{ backgroundColor: 'transparent' }}
      onClick={() => handleLangChange(currentLang === 'en' ? 'lt' : 'en')}
    >
      <Row className="justify-content-center" data-testid="language-switch">
        <Col>
          <Button
            className="p-0"
            variant="outline"
            bg="transparent"
            data-testid="language-switch-button"
            style={{
              fontWeight: '600',
              width: '100%'
            }}
          >
            {currentLang === 'en' ? 'Change Language' : 'Pakeisti kalbą'}
          </Button>
        </Col>
      </Row>
    </Dropdown.Item>
  );
};

export default LanguageSwitch;
