const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const admin = require('firebase-admin');
const firebaseApp = require('firebase');
const {
  DATABASE_URL,
  FIREBASE_CONFIG_NORMAL,
} = require('./src/constant/project_constant');
const { LoginService } = require('./src/controller/login/login_service');
const { ValidationError } = require('express-validation');
const { HomeService } = require('./src/controller/home/home_contoller');
const { ProductService } = require('./src/controller/home/product_controller');
const { SearchService } = require('./src/controller/home/search_controller');

const firebaseConfig = {
  credential: admin.credential.applicationDefault(),
  databaseURL: DATABASE_URL,
};

admin.initializeApp(firebaseConfig);
firebaseApp.initializeApp(FIREBASE_CONFIG_NORMAL);
app.use(express.json());
app.use('', LoginService);
app.use('', HomeService);
app.use('', ProductService);
app.use('', SearchService);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  console.log(err);
  next();
});

app.listen(port, () => console.log(`App is runnig`));
