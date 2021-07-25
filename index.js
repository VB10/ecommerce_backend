const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const admin = require('firebase-admin');
const firebaseApp = require('firebase');
const { DATABASE_URL } = require('./src/constant/project_constant');
const { LoginService } = require('./src/controller/login/login_service');
const { ValidationError } = require('express-validation')

const firebaseConfig = {
  credential: admin.credential.applicationDefault(),
  databaseURL: DATABASE_URL
};

var firebaseConfigNormal = {
  apiKey: "AIzaSyBSyr1XPZDfYcG3HzyZKzuoJGNXs-nh6TM",
  authDomain: "hwacommerce.firebaseapp.com",
  projectId: "hwacommerce",
  storageBucket: "hwacommerce.appspot.com",
  messagingSenderId: "331041399851",
  appId: "1:331041399851:web:a0a2409241f68879c5766e",
  measurementId: "G-4Y08WNPYWL"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfigNormal);
admin.initializeApp(firebaseConfig);
firebaseApp.initializeApp(firebaseConfigNormal);
// module.exports = { firebaseConfig, firebaseApp }
app.use(express.json());
app.use(LoginService.path(), LoginService);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

app.listen(port, () => console.log(`App is runnig`));