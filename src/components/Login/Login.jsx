import React from "react";
import { Box, Typography } from "@material-ui/core";
import Textfield from "./TextField";
import SigninButton from "./SigninButton";

export default function Login(props) {
  return (
    <Box align="center" mt="140px">
      <Box my={3}>
        <Typography variant="h5" component="span">
          <Box fontWeight={700}>Welcome</Box>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Don't miss your next opportunity. Sign in to stay updated on your
          kackel world.
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="380px">
        <Textfield
          label="Email (actually dont bother, just click sign in)"
          mb={1}
        />
        <Textfield label="Password" mb={3} />
        <SigninButton setUser={props.setUser} />
      </Box>
    </Box>
  );
}
