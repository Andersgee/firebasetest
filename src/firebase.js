//import firebase from "firebase"; //not recommended to import everything.
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCNod2jvNPlE3UjmofnmurpX02_FQ9bbGY",
  authDomain: "andytest-ca4f8.web.app",
  projectId: "andytest-ca4f8",
  //messagingSenderId: "336124957761",
};
//https://firebase.google.com/docs/auth/web/google-signin?authuser=0

//https://console.developers.google.com/apis/credentials?project=andytest-ca4f8
firebase.initializeApp(config);

const auth = firebase.auth;
const db = firebase.firestore();

export function googleauth(setUser) {
  const provider = new auth.GoogleAuthProvider();

  auth()
    .signInWithPopup(provider)
    .then((res) => {
      //console.log("res: ", res);
      //const token = res.credential.accessToken;
      let user = res.user;
      storeuser(user).then((fetcheduser) => {
        setUser(fetcheduser);
      });

      //fetchallusers().then((all) => console.log("allusers: ", all));
    })
    .catch((error) => {
      console.error("couldnt sign in", error);
      setUser(null);
    });
}

async function storeuser(user) {
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  const { uid, photoURL, displayName, email, phoneNumber } = user;
  if (!snapshot.exists) {
    try {
      await userRef.set({ uid, photoURL, displayName, email, phoneNumber });
      user.firstvisit = true; //this is a new user
      return user;
    } catch (error) {
      console.error("couldnt store user document", error);
    }
  } else {
    return await fetchuser(uid); //already exist (and might have more data in it)
  }
}

async function fetchuser(uid) {
  try {
    const user = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...user.data(),
    };
  } catch (error) {
    console.error("couldnt fetch user", error);
  }
}

export async function fetchallusers() {
  let allusers = [];
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allusers.push(doc.data());
      });
    });
  return await allusers;
}
