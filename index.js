const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const admin = require('firebase-admin');
const { DATABASE_URL } = require('./src/constant/project_constant');
const { LoginService } = require('./src/controller/login/login_service');

const firebaseConfig = {
  credential: admin.credential.applicationDefault(),
  databaseURL: DATABASE_URL
};
module.exports = { firebaseConfig }
app.use(express.json());
app.use(LoginService.path(), LoginService);

app.listen(port, () => console.log(`App is runnig`))

