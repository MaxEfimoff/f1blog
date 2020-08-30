const Validator = require('validator');
const isEmpty = require('./is-empty.js');

const validateSetNewPasswordInput = (data) => {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Поле Пароль обязательно к заполнению';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Пароль не должен быть короче 6 и длиннее 30 знаков';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSetNewPasswordInput;
