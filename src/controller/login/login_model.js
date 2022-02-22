const { Joi } = require('express-validation');

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

const forgotValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

const registerValidation = {
  body: Joi.object({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

module.exports = { loginValidation, forgotValidation, registerValidation };
