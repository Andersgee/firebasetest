import React, { useState } from "react";
import { storepost } from "../../firebase";
import { Box, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export default function MakePost(props) {
  const [input, setInput] = useState("");

  const makepost = (e) => {
    e.preventDefault();
    storepost({ user: props.user, text: input });
    setInput("");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box my={2}>
      <form>
        <TextField
          fullWidth
          value={input}
          label={<CreateIcon />}
          variant="outlined"
          onChange={handleInput}
          style={{ width: "100%" }}
        />
        <button hidden type="submit" onClick={makepost}>
          post
        </button>
      </form>
    </Box>
  );
}
