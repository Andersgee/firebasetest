import React from "react";
import { ReactComponent as G } from "./google_logo.svg";
import { Box, Button } from "@material-ui/core";
import { googleauth } from "../../firebase";

export default function SigninButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ borderRadius: "2em" }}
      onClick={() => googleauth(props.setUser)}
    >
      <Box
        my={1}
        width="380px"
        display="flex"
        justifyContent="center"
        fontWeight={600}
      >
        <Box width="22px" mr={2} position="relative" top="2px">
          <G />
        </Box>
        <Box>Sign in with google</Box>
      </Box>
    </Button>
  );
}
