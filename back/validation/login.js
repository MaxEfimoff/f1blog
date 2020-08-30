const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Некорректный Email';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Поле Email обязательно к заполнению';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Поле Пароль обязательно к заполнению';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
