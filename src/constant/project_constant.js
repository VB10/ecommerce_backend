const DATABASE_URL = 'https://hwacommerce.firebaseio.com';

const FIREBASE_CONFIG_NORMAL = {
  apiKey: 'AIzaSyBSyr1XPZDfYcG3HzyZKzuoJGNXs-nh6TM',
  authDomain: 'hwacommerce.firebaseapp.com',
  projectId: 'hwacommerce',
  storageBucket: 'hwacommerce.appspot.com',
  messagingSenderId: '331041399851',
  appId: '1:331041399851:web:a0a2409241f68879c5766e',
  measurementId: 'G-4Y08WNPYWL',
};

const SEARCH_KEY_MINUMUM = 3;

const SECURE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token?key=';

exports = module.exports = {
  SEARCH_KEY_MINUMUM,
  DATABASE_URL,
  FIREBASE_CONFIG_NORMAL,
  SECURE_TOKEN_URL,
};
