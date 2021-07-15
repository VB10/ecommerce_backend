

const express = require('express')
const { firebaseConfig } = require('../../..')
const LoginService = express()
const admin = require('firebase-admin');
const loginPath = "/login"
const LoginModel = require('./login_model');

const firebase = admin.initializeApp(firebaseConfig);
LoginService.get(loginPath, async (req, res) => {
    const db = firebase.firestore();
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });

    const items = snapshot.docs.map(doc => doc.data());

    return res.send(items);
})

LoginService.post(loginPath, (req, res) => {
    console.log(req.body.userName);
    console.log(req.body.password);
    const data = new LoginModel(req.body.userName, req.body.password);

    return res.send({
        "data": data
    });
});



module.exports = { LoginService }