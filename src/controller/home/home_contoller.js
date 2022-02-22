const express = require('express');
const HomeService = express.Router();
const { StatusCodes } = require('http-status-codes');
const admin = require('firebase-admin');
const { validate } = require('express-validation');
const {
  categoryVaidation,
  latestVaidation,
} = require('./validation/category_model');

const { parseSnapshotAndMerge } = require('./../../product/parser_utility');

const categories = 'categories';
const latest = 'latest';
HomeService.get('/' + categories, (req, res) => {
  admin
    .firestore()
    .collection(categories)
    .get()
    .then((snapshot) => {
      return res.json(parseSnapshotAndMerge(snapshot));
    })
    .catch((_) => {});
});

HomeService.get('/' + latest, (_, res) => {
  admin
    .firestore()
    .collection(latest)
    .get()
    .then((snapshot) => {
      return res.json(parseSnapshotAndMerge(snapshot));
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

HomeService.post(
  '/' + latest,
  validate(latestVaidation, {}, {}),

  (req, res) => {
    admin
      .firestore()
      .collection(latest)
      .doc()
      .set(req.body)
      .then((snapshot) => {
        return res.json(snapshot.writeTime);
      })
      .catch((err) => {});
  }
);

module.exports = { HomeService };
