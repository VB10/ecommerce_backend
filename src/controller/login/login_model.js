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

module.exports = { loginValidation, forgotValidation };
