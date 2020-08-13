import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID,
  databaseURL: process.env.DATABASE_URL,
  authDomain: process.env.AUTH_DOMAIN,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export { database };