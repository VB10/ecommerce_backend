const DATABASE_URL = 'https://hwacommerce.firebaseio.com';

const FIREBASE_CONFIG_NORMAL = {
  apiKey: '',
  authDomain: '',
  projectId: 'hwacommerce',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const SEARCH_KEY_MINUMUM = 3;

const SECURE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token?key=';

exports = module.exports = {
  SEARCH_KEY_MINUMUM,
  DATABASE_URL,
  FIREBASE_CONFIG_NORMAL,
  SECURE_TOKEN_URL,
};
