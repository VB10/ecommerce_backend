const express = require('express');
const SearchService = express.Router();
const admin = require('firebase-admin');

const { StatusCodes } = require('http-status-codes');
const { SEARCH_ERROR_MESSAGE } = require('../../constant/message_constant');
const { SEARCH_KEY_MINUMUM } = require('../../constant/project_constant');
const { createError } = require('../../utility/error_utility');

const search = '/search';
const product = 'product';

SearchService.get(search, (req, res) => {
  if (!req.query.key || req.query.key.length < SEARCH_KEY_MINUMUM) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json(createError(SEARCH_ERROR_MESSAGE));
  }
  const term = req.query.key.toLowerCase();
  admin
    .firestore()
    .collection(product)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs
        .filter((doc) => doc.data().title.toLowerCase().includes(term))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      return res.json(items);
    })
    .catch((error) => {
      console.log(error);
      return res.status(StatusCodes.NOT_FOUND).json(error);
    });
});

exports = module.exports = { SearchService };
