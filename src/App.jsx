import React, { useState } from "react";
import { googleauth } from "./firebase";
import useUsers from "./hooks/useUsers";
import Posts from "./Posts";

export default function App() {
  const [user, setUser] = useState(null);
  const users = useUsers();

  return user ? (
    <div>
      <div>
        <div>{user.firstvisit ? "welcome (first time)" : "welcome (back)"}</div>
        <div>{"you are logged in. here is your user"}</div>
        <hr />
        <img src={user.photoURL} alt={user.displayName} />
        <div>{user.displayName}</div>
        <div>{user.email}</div>
        <div>{user.phoneNumber}</div>
        <hr />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ "margin-right": "100px" }}>
          <div>{"and here are all the users"}</div>
          <hr />
          {users.isLoading && <div>{"fetching all users"}</div>}
          {users.data &&
            users.data.map((u) => (
              <div key={u.uid}>
                <img src={u.photoURL} alt={user.displayName} />
                <div>{u.displayName}</div>
                <div>{u.email}</div>
                <div>{u.phoneNumber}</div>
              </div>
            ))}
        </div>
        <Posts user={user} />
      </div>
    </div>
  ) : (
    <>
      <div>{"your are NOT logged in"}</div>
      <button onClick={() => googleauth(setUser)}>Login</button>
    </>
  );
}
