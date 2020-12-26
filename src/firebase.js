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

  const ref = firebase.firestore().doc(`users/${uid}`);
  const res = await ref.get();

  if (res.exists) {
    return await fetchuser(uid);
  } else {
    await ref.set({ uid, photoURL, displayName, email, phoneNumber });
    user.firstvisit = true;
    return user;
  }
}

async function fetchuser(uid) {
  const ref = firebase.firestore().doc(`users/${uid}`);
  const res = await ref.get();
  return res.data();
}

export async function fetchusers() {
  const ref = firebase.firestore().collection("users");
  const res = await ref.get();
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

function pairstr(a, b) {
  //return [a,b].join("-")
  //actually, make sure the string is always the same regardless if a,b or b,a is input
  const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true });
  return [a, b].sort(sortAlphaNum).join("-");
}

export async function storemessage(message, uid1, uid2) {
  //should not use client created Date... but its literally forbidden
  //to store server generated timestamp inside an array for some reason
  const id = pairstr(uid1, uid2);
  const ref = firebase.firestore().doc(`messages/${id}`);
  const doc = await ref.get();
  const date = JSON.stringify(new Date());
  if (doc.exists) {
    //push to array named messages
    const entry = { date, message };
    ref.update({ messages: firebase.firestore.FieldValue.arrayUnion(entry) });
  } else {
    //create an array named messages, fill it with the first entry
    const entry = { date, message };
    ref.set({ messages: [entry] });
  }
}

export const fetchmessages = (setMessages, id) => () => {
  //call with a useEffect(fetchposts(setPosts))

  firebase
    .firestore()
    .doc(`messages/${id}`)
    .onSnapshot((res) => {
      const d = res.data();
      //console.log("setting messages: ", d.messages);
      setMessages(d.messages);
    });
};
