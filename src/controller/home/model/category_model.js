const { Joi } = require('express-validation');

const categoryVaidation = {
  body: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
  }),
};

const latestVaidation = {
  body: Joi.object({
    image: Joi.string().uri().required(),
  }),
};

module.exports = { categoryVaidation, latestVaidation };
