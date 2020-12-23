import React from "react";
import { Box, Typography } from "@material-ui/core";
import Textfield from "./TextField";
import SigninButton from "./SigninButton";

export default function Login() {
  return (
    <Box align="center">
      <Box my={3}>
        <Typography variant="h5">
          <Box fontWeight={700}>Welcome Back</Box>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Don't miss your next opportunity. Sign in to stay updated on your{" "}
          professional world.
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="380px">
        <Textfield label="Email or Phone" mb={1} />
        <Textfield label="Password" mb={3} />
        <SigninButton />
      </Box>
    </Box>
  );
}
