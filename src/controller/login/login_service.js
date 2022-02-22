const express = require('express');

const LoginService = express.Router();

const loginPath = '/login';
const registerPath = '/register';
const forgotPath = '/forgot';
const refreshToken = '/refreshToken';
const LoginModel = require('./login_model');

const { StatusCodes } = require('http-status-codes');

const firebaseApp = require('firebase');
const { validate } = require('express-validation');
const admin = require('firebase-admin');
const axios = require('axios').default;
const {
  FIREBASE_CONFIG_NORMAL,
  SECURE_TOKEN_URL,
} = require('../../constant/project_constant');

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

LoginService.post(
  registerPath,
  validate(LoginModel.registerValidation, {}, {}),
  async (req, res) => {
    try {
      const user = await admin.auth().createUser({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
      });

      console.log(user);
      const token = await admin.auth().createCustomToken(user.uid);
      const data = await firebaseApp.default
        .auth()
        .signInWithCustomToken(token);

      return res.json({ token: data.user });
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).send(error);
    }
  }
);

LoginService.get(refreshToken, async (req, res) => {
  const data = {
    refresh_token: req.headers.authorization,
    grant_type: 'refresh_token',
  };

  const url = SECURE_TOKEN_URL + FIREBASE_CONFIG_NORMAL.apiKey;
  axios
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => {
      return res.status(StatusCodes.NOT_FOUND).json(err);
    });
});

module.exports = { LoginService };
