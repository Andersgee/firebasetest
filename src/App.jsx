import React, { useState } from "react";
import { googleauth } from "./firebase";
import useUsers from "./hooks/useUsers";
import Posts from "./Posts";
import { Typography, Button } from "@material-ui/core";
import { Login } from "./components/Login";

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
          <Typography>and here are all the users</Typography>
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
      <Typography variant="body1">you are NOT logged in</Typography>
      <Button variant="outlined" onClick={() => googleauth(setUser)}>
        Login
      </Button>
      <Typography variant="h6">h6 variant</Typography>
      <Login />
    </>
  );
}
