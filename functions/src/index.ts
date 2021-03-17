import axios from "axios";
import * as functions from "firebase-functions";
import * as cors from 'cors';
import * as admin from 'firebase-admin';
admin.initializeApp();
const corsHandler = cors({origin: true});


exports.testHttps = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=20000&keyword=${req.query.store}&key=${functions.config().googlemaps.key}`
    )
    .then((result) => {
      console.log(result.data);
      res.status(200).send(result.data);
    })
    .catch((err) => {
      return `[firebase] error returning find a place google api request`;
    });
  });
  
});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
      favourites: []
    });
});
