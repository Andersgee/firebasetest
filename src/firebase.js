//see:
//https://firebase.google.com/docs/auth/web/google-signin?authuser=0
//https://console.developers.google.com/apis/credentials?project=andytest-ca4f8

//also for environment vars
//https://firebase.google.com/docs/functions/config-env

//import firebase from "firebase"; //not recommended to import everything.
//console.log(firebase);

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCNod2jvNPlE3UjmofnmurpX02_FQ9bbGY",
  authDomain: "fejsbuk.andyfx.net",
  databaseURL:
    "https://andytest-ca4f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "andytest-ca4f8",
  storageBucket: "andytest-ca4f8.appspot.com",
  messagingSenderId: "336124957761",
  appId: "1:336124957761:web:8965ff3f00f3f8786522c0",
};
firebase.initializeApp(config);

//btw this is probably how to avoid keys here... :
//import admin from 'firebase-admin';
//admin.initializeApp();

const provider = new firebase.auth.GoogleAuthProvider();

export function googleauth(setUser) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      //const token = res.credential.accessToken;
      storeuser(res.user).then((user) => {
        setUser(user);
      });
    })
    .catch((e) => {
      console.log("couldnt sign in", e);
      //setUser(null);
    });
}

async function storeuser(user) {
  //have to check if user already exist, otherwise this function
  //would just be firestore().collection("users").add(user)
  const { uid, photoURL, displayName, email, phoneNumber } = user;

  const doc = firebase.firestore().doc(`users/${uid}`);
  const res = await doc.get();

  if (res.exists) {
    return await fetchuser(uid);
  } else {
    await doc.set({ uid, photoURL, displayName, email, phoneNumber });
    user.firstvisit = true;
    return user;
  }
}

async function fetchuser(uid) {
  const res = await firebase.firestore().doc(`users/${uid}`).get();
  return res.data();
}

export async function fetchusers() {
  const res = await firebase.firestore().collection("users").get();
  return res.docs.map((d) => d.data());
}

export function storepost(post) {
  //firestore().collection("posts").add(post);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  firebase
    .firestore()
    .collection("posts")
    .add({ timestamp, ...post });
}

export const fetchposts = (setPosts) => () => {
  //call with a useEffect(fetchposts(setPosts))
  firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc")
    .onSnapshot((res) => {
      const posts = res.docs.map((d) => d.data());
      setPosts(posts);
    });
};

export async function storemessage(message, uid1, uid2) {
  let ref = firebase.firestore().doc(`messages/${uid1}-${uid2}`);
  //const doc = await ref.get();
  //if (doc.exists) {

  //AFTER FINALLY DOING IT RIGHT, TURNS OUT CANT HAVE TIMESTAMP IN ARRAY...
  const timestamp = "b"; //firebase.firestore.FieldValue.serverTimestamp();

  const entry = {
    messages: [{ timestamp: timestamp, message: "initial contact" }],
  };
  ref.set(entry);

  // this is how to "push" to an array
  // (arrays are not ordered so push an object with a timestamp aswell)
  //const entry = { timestamp: timestamp, message: message };
  //ref.update({ messages: firebase.firestore.FieldValue.arrayUnion(entry) });
}

export const fetchmessages = (setMessages, uid1, uid2) => () => {
  //call with a useEffect(fetchposts(setPosts))
  firebase
    .firestore()
    .collection(`messages/${uid1}-${uid2}`)
    .onSnapshot((res) => {
      const messages = res.docs.map((d) => d.data());
      setMessages(messages);
    });
};
