import React, { useState } from "react";
//import { Counter } from "./features/counter";
import { googleauth } from "./firebase";
import useAllusers from "./hooks/useAllusers";

export default function App() {
  const [user, setUser] = useState(null);
  const allusers = useAllusers();

  return user ? (
    <>
      <div>{user.firstvisit ? "welcome (first time)" : "welcome (back)"}</div>
      <div>{"you are logged in. here is your user"}</div>
      <hr />
      <img src={user.photoURL} alt={user.displayName} />
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.phoneNumber}</div>
      <hr />
      <div>{"and here are all the users"}</div>
      <hr />
      {allusers.isLoading && <div>{"fetching all users"}</div>}
      {allusers.data &&
        allusers.data.map((u, i) => (
          <div key={i}>
            <img src={u.photoURL} alt={user.displayName} />
            <div>{u.displayName}</div>
            <div>{u.email}</div>
            <div>{u.phoneNumber}</div>
          </div>
        ))}
    </>
  ) : (
    <>
      <div>{"your are NOT logged in"}</div>
      <button onClick={() => googleauth(setUser)}>Login</button>
    </>
  );
}
