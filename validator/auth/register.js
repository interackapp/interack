const validator = require("validator"),
  isEmpty = require("../isEmpty");

const validateRegisterInput = data => {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (!validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "First name must be min 2 and max 30 characters.";
  }
  if (!validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Last name must be min 2 and max 30 characters.";
  }

  if (validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }
  if (validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
