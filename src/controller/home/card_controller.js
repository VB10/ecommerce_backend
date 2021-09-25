const express = require('express');
const CardService = express.Router();
const admin = require('firebase-admin');

const { StatusCodes } = require('http-status-codes');
const {
  SEARCH_ERROR_MESSAGE,
  PRODUCT_NOT_ENOUGH,
} = require('../../constant/message_constant');
const { SEARCH_KEY_MINUMUM } = require('../../constant/project_constant');
const { createError } = require('../../utility/error_utility');
const { cardValidation } = require('./validation/card_model');
const { validate } = require('express-validation');

const search = '/search';
const product = 'product';

CardService.get(search, validate(cardValidation, {}, {}), (req, res) => {
  admin
    .firestore()
    .collection(product)
    .path(req.body.id)
    .get()
    .then((snapshot) => {
      const isHaveProduct = snapshot.doc.data().count >= req.body.count;
      if (isHaveProduct) {
        return res.json({
          isDone: 'true',
        });
      } else {
        return res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json(createError(PRODUCT_NOT_ENOUGH));
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(StatusCodes.NOT_FOUND).json(error);
    });
});

exports = module.exports = { CardService };
