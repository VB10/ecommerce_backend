const express = require('express');
const HomeService = express.Router();
const { StatusCodes } = require('http-status-codes');
const admin = require('firebase-admin');
const { validate } = require('express-validation');
const { categoryVaidation } = require('./model/category_model');

const categories = 'categories';
HomeService.get('/' + categories, (req, res) => {
  admin
    .firestore()
    .collection(categories)
    .get()
    .then((snapshot) => {
      const responseContent = snapshot.docs.map((doc) => doc.data());
      return res.json(responseContent);
    })
    .catch((err) => {});
});

HomeService.post(
  '/' + categories,
  validate(categoryVaidation, {}, {}),

  (req, res) => {
    admin
      .firestore()
      .collection(categories)
      .doc()
      .set(req.body)
      .then((snapshot) => {
        return res.json(snapshot.writeTime);
      })
      .catch((err) => {});
  }
);

module.exports = { HomeService };
