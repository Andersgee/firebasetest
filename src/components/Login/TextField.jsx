import React from "react";
import { Box, TextField } from "@material-ui/core";

export default function Field(props) {
  return (
    <Box mb={props.mb}>
      <TextField
        disabled
        label={props.label}
        variant="outlined"
        style={{ width: "380px" }}
      />
    </Box>
  );
}
