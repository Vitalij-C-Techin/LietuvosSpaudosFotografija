import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const lngs = [
  { code: 'en', lang: 'English' },
  { code: 'lt', lang: 'Lithuanian' }
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div>
      {lngs.map((lng) => (
        <button
          key={lng.code}
          onClick={() => handleLangChange(lng.code)}
          style={{
            fontWeight: i18n.language === lng.code ? 'bold' : 'normal'
          }}
        >
          {lng.lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
