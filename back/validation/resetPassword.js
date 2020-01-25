const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Поле Email обязательно к заполнению";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Некорректный Email";
  }
  
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
