const Validator = require('validator');
const isEmpty = require('./is-empty.js');

const validateRegisterInput = (data) => {
  let errors = {};

  // If user leaves empty field we turn it into empty string
  // so that Validator.isEmpty() could validate it
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name length should be between 2 and 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Имя не должно быть короче 2 и длиннее 30 знаков';
  }

  // Name shouldn't be empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Поле Имя обязательно к заполнению';
  }

  // Email should be in correct format
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Некорректный Email';
  }

  // Email shouldn't be empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Поле Email обязательно к заполнению';
  }

  // Password shouldn't be empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Поле Пароль обяъательно к заполнению';
  }

  // Password length should be between 6 and 30 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Пароль не должен быть короче 6 и длиннее 30 знаков';
  }

  // Password and password2 fields should match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Пароли не совпадают';
  }

  // Password2 shouldn't be empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Поле Подтверждение пароля обяъательно к заполнению';
  }

  return {
    errors: errors,
    // Check if errors is an empty object
    // We can't use Validator.isEmpty() because it checks only strings
    // If everything is ok errors object will still be empty in the end
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
