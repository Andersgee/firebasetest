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
      <Header
        user={user}
        users={users.data}
        setActivemsgboxes={setActivemsgboxes}
      />
      <Container maxWidth="sm">
        <Feed user={user} setActivemsgboxes={setActivemsgboxes} />
        {activemsgboxes.map((id) => (
          <MessageBox
            user={user}
            key={id}
            id={id}
            setActivemsgboxes={setActivemsgboxes}
          />
        ))}
      </Container>
    </>
  ) : (
    <Login setUser={setUser} />
  );
}
