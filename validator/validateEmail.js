const validator = require("validator"),
  isEmpty = require("./isEmpty");

const validateEmail = data => {
  let errors = {};
  data.to = !isEmpty(data.to) ? data.to : "";
  // data.fromEmail = !isEmpty(data.fromEmail) ? data.fromEmail : "";
  // data.fromPassword = !isEmpty(data.fromPassword) ? data.fromPassword : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (validator.isEmpty(data.to)) {
    errors.to = "Email 'to' field is required";
  }
  // if (validator.isEmpty(data.fromEmail)) {
  //   errors.fromEmail = "Email 'from' is required";
  // }
  // if (validator.isEmpty(data.fromPassword)) {
  //   errors.fromPassword = "Email 'from password' is required";
  // }
  if (validator.isEmpty(data.subject)) {
    errors.subject = "Subject is required";
  }
  if (validator.isEmpty(data.body)) {
    errors.body = "Body is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEmail;