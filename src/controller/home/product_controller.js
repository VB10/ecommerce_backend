const express = require('express');
const ProductService = express.Router();
const admin = require('firebase-admin');
const { validate } = require('express-validation');
const { productValidation } = require('./validation/product_model');

const product = 'product';
ProductService.get('/' + product, (req, res) => {
  admin
    .firestore()
    .collection(product)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.json(data);
    })
    .catch((_) => {});
});

ProductService.post(
  '/' + product,
  validate(productValidation, {}, {}),

  (req, res) => {
    admin
      .firestore()
      .collection(product)
      .doc()
      .set(req.body)
      .then((snapshot) => {
        return res.json(snapshot.writeTime);
      })
      .catch((err) => {});
  }
);

module.exports = { ProductService };
