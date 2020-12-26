import React, { useState } from "react";
import useUsers from "./hooks/useUsers";
import { Container, Grid } from "@material-ui/core";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Feed } from "./components/Feed";
import { MessageBox } from "./components/MessageBox";

import { storemessage } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const users = useUsers();
  const [activemsgboxes, setActivemsgboxes] = useState([]);

  const sendmsg = () => {
    const msg = "testing a message";
    const uid1 = "YUYJ6XEInHUcC5OhkjPBkJ9KHnB3";
    const uid2 = "pv4NrXOCxsM1AYaLxTOy6q0RPbq1";
    storemessage(msg, uid1, uid2);
  };

  return user ? (
    <>
      <Header />
      <button onClick={sendmsg}>SEND MSG</button>
      <Container>
        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <Feed user={user} setActivemsgboxes={setActivemsgboxes} />
            {activemsgboxes.map((id) => (
              <MessageBox id={id} />
            ))}
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <Login setUser={setUser} />
  );
}
