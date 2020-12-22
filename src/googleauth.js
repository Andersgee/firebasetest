//import firebase from "firebase"; //not recommended to import everything.
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCNod2jvNPlE3UjmofnmurpX02_FQ9bbGY",
  authDomain: "andytest-ca4f8.web.app",
  projectId: "andytest-ca4f8",
  messagingSenderId: "336124957761",
};
//https://firebase.google.com/docs/auth/web/google-signin?authuser=0
firebase.initializeApp(config);

export default function googleauth() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("result: ", result);

      /*
      var token = result.credential.accessToken;
      var user = result.user;
      */
    })
    .catch((error) => {
      console.log("error: ", error);
      /*
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      */
    });

  return provider;
}
