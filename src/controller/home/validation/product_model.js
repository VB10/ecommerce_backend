const { Joi } = require('express-validation');

const productValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    money: Joi.number().required(),
    categoryId: Joi.string().required(),
  }),
};

module.exports = { productValidation };
