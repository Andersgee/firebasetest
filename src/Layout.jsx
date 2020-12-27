import React, { useState } from "react";
import useUsers from "./hooks/useUsers";
import { Container, Grid } from "@material-ui/core";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Feed } from "./components/Feed";
import { MessageBox } from "./components/MessageBox";

export default function App() {
  const [user, setUser] = useState(null);
  const users = useUsers();
  const [activemsgboxes, setActivemsgboxes] = useState([]);

  return user ? (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <Feed user={user} setActivemsgboxes={setActivemsgboxes} />
            {activemsgboxes.map((id) => (
              <MessageBox
                user={user}
                key={id}
                id={id}
                setActivemsgboxes={setActivemsgboxes}
              />
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
