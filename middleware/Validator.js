// Validator.js
const { validationResult } = require('express-validator'); 
const { asyncErrorHandler } = require('./ErrorHandler');  // Correct path and destructuring
const errorCodes = require('../errors/ErrorCodes');
const ApplicationError = require('../errors/ApplicationError');

// Validation middleware
const validation = asyncErrorHandler((req, res, next) => {
  const errors = validationResult(req);
  const { request_id } = req;
  if (errors.isEmpty()) {
    return next();
  }
  let { msg } = errors.errors[0];
  if (errors.errors[0].nestedErrors && errors.errors[0].nestedErrors.length > 0) {
    errors.errors[0].nestedErrors.forEach(element => {
      if (msg !== element.msg) {
        msg = element.msg;
      }
    });
  }
  const error = errorCodes['100001'];
  error.message = msg;
  error.request_id = request_id;
  throw new ApplicationError(error);
});

module.exports = { validation };  // Use module.exports for exporting
