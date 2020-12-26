import React, { useState, useEffect } from "react";
import { Box, Typography, Input } from "@material-ui/core";
import { CloseIcon } from "@material-ui/icons";
import "./MessageBox.css";

import { fetchmessages } from "../../firebase";

function Message(props) {
  return (
    <Box
      my={1}
      width={350}
      display="flex"
      justifyContent={props.me ? "flex-end" : "flex-start"}
    >
      <Box
        borderRadius={8}
        px="8px"
        pt="4px"
        pb="6px"
        bgcolor="#aaf"
        maxWidth={250}
        display="flex"
        justifyContent={props.me ? "flex-end" : "flex-start"}
      >
        <Typography variant="body1">{props.msg}</Typography>
      </Box>
    </Box>
  );
}

export default function MessageBox(props) {
  const [messages, setMessages] = useState([]);
  useEffect(fetchmessages(setMessages, props.id), [props.id]);

  return (
    <Box
      className="messagebox"
      boxShadow={3}
      bgcolor="#fff"
      my={2}
      px={2}
      py={1}
      height={300}
      width={400}
    >
      <Box height={250} width={400} className="messages">
        {messages.map((x) => (
          <Message key={x.date} msg={x.message} />
        ))}
      </Box>
      <Input placeholder="Message" />
    </Box>
  );
}
