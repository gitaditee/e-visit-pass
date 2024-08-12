
import firebase from "firebase/compat/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBrF5WQclVgonTWOAlriuM7WSZYRfF3G_c",
  authDomain: "otpgen-b7a9f.firebaseapp.com",
  projectId: "otpgen-b7a9f",
  storageBucket: "otpgen-b7a9f.appspot.com",
  messagingSenderId: "149101557161",
  appId: "1:149101557161:web:481bdbc279598e6b4d40b8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
