const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const admin = require('firebase-admin');
const firebase = require('firebase');
const { DATABASE_URL } = require('./src/constant/project_constant');
const { LoginService } = require('./src/controller/login/login_service');

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
firebase.initializeApp(firebaseConfigNormal);


module.exports = { firebaseConfig, firebase }
app.use(express.json());
app.use(LoginService.path(), LoginService);

app.listen(port, () => console.log(`App is runnig`));