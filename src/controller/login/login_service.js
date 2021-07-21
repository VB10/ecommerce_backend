

const express = require('express')
const { firebase } = require('./../../../index')
const LoginService = express()
// const admin = require('firebase-admin');
const loginPath = "/login"
const LoginModel = require('./login_model');

// const firebase = admin.initializeApp(firebaseConfig);
LoginService.get(loginPath, async (req, res) => {

    firebase.default.auth().signInWithEmailAndPassword("a", "b").then((result) => {

        return res.send(result.user);
    }).catch((err) => {

    });
    // const items = snapshot.docs.map(doc => doc.data());
    // admin
    //     .auth()
    //     .getUserByProviderUid("zD0SY6iWObQSkGotIF9yS9dbTS93")

    // return res.send(items);
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