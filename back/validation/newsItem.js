const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateNewsItemInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.title, { min: 6, max: 50 })) {
    errors.title = "Title needs to be between 6 and 50 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text needs to be between 100 and 1000 characters";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};