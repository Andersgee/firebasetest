import React, { useState, useEffect } from "react";
import { Counter } from "./features/counter";
import { googleauth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <>
      <div>{"you are logged in. here is your face"}</div>
      <img src={user.photoURL} />
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.phoneNumber}</div>
    </>
  ) : (
    <>
      <div>{"your are NOT logged in"}</div>
      <button onClick={() => googleauth(setUser)}>Login</button>
    </>
  );
}
