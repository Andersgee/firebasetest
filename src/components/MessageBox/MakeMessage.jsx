import React, { useState } from "react";
import { storemessage } from "../../firebase";
import { Box, TextField, Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export default function MakeMessage(props) {
  const [input, setInput] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      console.log("sending input: ", input);

      console.log("from props.senderid: ", props.senderid);
      console.log("to props.recieverid: ", props.recieverid);

      storemessage(input, props.senderid, props.recieverid);
      setInput("");
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box>
      <form>
        <TextField
          fullWidth
          placeholder="Message"
          value={input}
          label={<CreateIcon />}
          variant="outlined"
          onChange={handleInput}
          style={{ width: "100%" }}
        />
        <Button hidden type="submit" onClick={handlesubmit}>
          post
        </Button>
      </form>
    </Box>
  );
}
