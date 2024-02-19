import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const lngs = [
  { code: 'en', lang: 'English' },
  { code: 'lt', lang: 'Lithuanian' }
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);

    localStorage.setItem("language", code);
  };

  return (
    <div data-testid="language-switch">
      {lngs.map((lng) => (
        <Button
          variant="outline"
          bg="transparent"
          key={lng.code}
          onClick={() => handleLangChange(lng.code)}
          data-testid="language-switch-button"
          style={{
            fontWeight: i18n.language === lng.code ? 'bold' : 'normal'
          }}
        >
          {lng.lang}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
