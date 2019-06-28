"use strict";

require("dotenv").config();
const firebase = require("firebase-admin");

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUT_DIR);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const db = firebase.firestore();

// TODO: SET DATA
let docRef = db.collection("users").doc("alovelace");

let setAda = docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
  die: 1905
});

let aTuringRef = db.collection("users").doc("aturing");

let setAlan = aTuringRef.set({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912
});

// TODO: READ ALL DATA
db.collection("users")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, "=>", doc.data());
    });
  })
  .catch(err => {
    console.log("Error getting documents", err);
  });

// TODO: READ INDIVIDUAL DATA
const user = db.collection("users").doc("alovelace");

user
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.log("Error getting document:", error);
  });

// TODO: UPDATE DOCUMENT
let updateaTuringRef = db.collection("users").doc("aturing");

let updateAlan = updateaTuringRef.update({
  die: 2002 // add new field
});

// TODO: DELETE INDIVIDUAL DOCUMENT
db.collection("users")
  .doc("alovelace")
  .delete()
  .then(function() {
    console.log("Document successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
