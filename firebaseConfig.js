/* eslint-disable quotes */
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyALmYITtSHbKy7erv84H4rhrF5drsFQK0A",
  authDomain: "flash-shopper-mobile.firebaseapp.com",
  databaseURL: "https://flash-shopper-mobile.firebaseio.com",
  projectId: "flash-shopper-mobile",
  storageBucket: "flash-shopper-mobile.appspot.com",
  messagingSenderId: "799514006504",
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp
