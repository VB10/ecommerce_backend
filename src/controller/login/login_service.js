const express = require('express');

const LoginService = express.Router();

const loginPath = '/login';
const registerPath = '/register';
const forgotPath = '/forgot';
const LoginModel = require('./login_model');

const { StatusCodes } = require('http-status-codes');

const firebaseApp = require('firebase');
const { validate } = require('express-validation');

LoginService.post(
  registerPath,
  validate(LoginModel.loginValidation, {}, {}),
  (req, res) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((result) => res.send(result.user))
      .catch((err) => {
        console.log(err);
        return res.send(err);
      });
  }
);

LoginService.post(
  loginPath,
  validate(LoginModel.loginValidation, {}, {}),
  (req, res) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((result) => {
        return res.send(result.user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(StatusCodes.NOT_FOUND).send(err);
      });
  }
);

LoginService.post(
  forgotPath,
  validate(LoginModel.forgotValidation, {}, {}),
  (req, res) => {
    firebaseApp.default
      .auth()
      .sendPasswordResetEmail(req.body.email)
      .then(() => {
        return res.send({ message: 'Password forgot mail sended' });
      })
      .catch((err) => {
        return res.status(StatusCodes.NOT_FOUND).send(err);
      });
  }
);

module.exports = { LoginService };
