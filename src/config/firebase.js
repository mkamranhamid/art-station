import firebase from 'firebase';
const config = {
  apiKey: process.env.REACT_APP_FIREBAE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBAE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBAE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBAE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBAE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBAE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBAE_MEASUREMENT_ID,
}
firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

export { auth, database, firestore, storage }