//import firebase from "firebase"; //not recommended to import everything.
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCNod2jvNPlE3UjmofnmurpX02_FQ9bbGY",
  authDomain: "andytest-ca4f8.web.app",
  //projectId: "andytest-ca4f8",
  //messagingSenderId: "336124957761",
};
//https://firebase.google.com/docs/auth/web/google-signin?authuser=0

//https://console.developers.google.com/apis/credentials?project=andytest-ca4f8
firebase.initializeApp(config);

export function googleauth(setUser) {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      //console.log("res: ", res);
      //const token = res.credential.accessToken;
      //const user = res.user;
      //const {photoURL, displayName, email, phoneNumber} = res.user
      setUser(res.user);
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
}
