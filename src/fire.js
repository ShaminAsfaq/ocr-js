import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCegZEouiY8yW4dFFCcrXj69W5pBq_fuNc",
    authDomain: "ocr-js-93748.firebaseapp.com",
    databaseURL: "https://ocr-js-93748.firebaseio.com",
    projectId: "ocr-js-93748",
    storageBucket: "ocr-js-93748.appspot.com",
    messagingSenderId: "546619364931",
    appId: "1:546619364931:web:61edf2883b5a42fe2be6f6",
    measurementId: "G-4MG0GH1RLB"
  };

  var fire = firebase.initializeApp(firebaseConfig);
  export default fire;
