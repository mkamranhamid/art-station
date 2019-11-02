import * as firebase from 'firebase';
const config = {
  apiKey: process.env.,
  authDomain: process.env.,
  databaseURL: process.env.,
  projectId: process.env.,
  storageBucket: process.env.,
  messagingSenderId: process.env.
}
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos")