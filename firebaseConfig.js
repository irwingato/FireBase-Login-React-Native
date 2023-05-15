import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "SUA_CHAVE_API",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_ID_DOPROJETO",
    storageBucket: "SEU_STORAGE_BUCKET_DO_FIREBASE",
    messagingSenderId: "SEU_MESSAGIN_SENDER_ID",
    appId: "SEU_ID_APP"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;