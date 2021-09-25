const { Joi } = require('express-validation');

const cardValidation = {
  body: Joi.object({
    id: Joi.string().required(),
    count: Joi.number().required(),
  }),
};

module.exports = { cardValidation };
