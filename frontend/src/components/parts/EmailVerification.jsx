import i18n from '../../modules/language/i18n';

export const validateEmail = (email, t) => {
  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  return {
    isValid,
    errorMessage: isValid ? null : t('emailVerification.invalidEmailFormat'),
  };
};
