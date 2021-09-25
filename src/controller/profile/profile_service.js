const express = require('express');

const ProfileService = express.Router();

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
const { createError } = require('../../utility/error_utility');

const profile = '/profile';
ProfileService.get(profile, async (req, res) => {
  try {
    const result = await admin.auth().verifyIdToken(req.headers.token);
    const user = await admin.auth().getUser(result.uid);
    return res.json(user);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(createError(error));
  }
});

module.exports = { ProfileService };
