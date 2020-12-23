import React, { useState } from "react";
import { googleauth } from "./firebase";
import useUsers from "./hooks/useUsers";
import { Container, Grid } from "@material-ui/core";
import { Login } from "./components/Login";
import { Feed } from "./components/Feed";

export default function App() {
  const [user, setUser] = useState(null);
  const users = useUsers();

  return user ? (
    <Container>
      <Grid container>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Feed user={user} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
      </Grid>
    </Container>
  ) : (
    <Login setUser={setUser} />
  );
}
