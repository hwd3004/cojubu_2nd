import * as firebase from "firebase";

const fbaseConfig = require('./fbaseConfig.json')

const firebaseConfig = {
  apiKey: fbaseConfig.API_KEY,
  authDomain: fbaseConfig.AUTH_DOMAIN,
  databaseURL: fbaseConfig.DATABASE_URL,
  projectId: fbaseConfig.PROJECT_ID,
  storageBucket: fbaseConfig.STORAGE_BUCKET,
  messagingSenderId: fbaseConfig.MESSAGING_SENDER_ID,
  appId: fbaseConfig.APP_ID,
  measurementId: fbaseConfig.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
