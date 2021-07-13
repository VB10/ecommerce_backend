const express = require('express')
const app = express()
const port = 3000
const admin = require('firebase-admin');


const firebase = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://hwacommerce.firebaseio.com'
});
const db = firebase.firestore();


app.get('/',async (req, res)=> {
    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      });
    return res.send('Hello World!');
} )
app.listen(port, () => console.log(`Example app listening on port port!`))


app.get('/users',async (req,res)=>{
    
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    const items = snapshot.docs.map(doc => doc.data());


    return res.send(items);
});

