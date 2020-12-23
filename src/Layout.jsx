import React, { useState } from "react";
import useUsers from "./hooks/useUsers";
import { Container, Grid } from "@material-ui/core";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Feed } from "./components/Feed";

export default function App() {
  const [user, setUser] = useState(null);
  const users = useUsers();

  return user ? (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <Feed user={user} />
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <Login setUser={setUser} />
  );
}
