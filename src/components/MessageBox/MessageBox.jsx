import React, { useState, useEffect } from "react";
import { Box, Typography, Input, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MakeMessage from "./MakeMessage";
import { fetchmessages } from "../../firebase";
import "./MessageBox.css";

function Message(props) {
  const me = props.myid === props.msg.senderid;
  return (
    <Box
      my={1}
      width={350}
      display="flex"
      justifyContent={me ? "flex-end" : "flex-start"}
    >
      <Box
        borderRadius={8}
        px="8px"
        pt="4px"
        pb="6px"
        bgcolor="#aaf"
        maxWidth={250}
        display="flex"
        justifyContent={me ? "flex-end" : "flex-start"}
      >
        <Typography variant="body1">{props.msg.message}</Typography>
      </Box>
    </Box>
  );
}

export default function MessageBox(props) {
  const [messages, setMessages] = useState([]);
  useEffect(fetchmessages(setMessages, props.id), [props.id]);

  const closebox = () => {
    props.setActivemsgboxes([]);
  };

  const [id1, id2] = props.id.split("-");
  //console.log("MessageBox, props.user: ", props.user);
  const myid = props.user.uid;
  const fiendid = myid === id1 ? id2 : id1;
  console.log("MessageBox, myid: ", myid);
  console.log("MessageBox, fiendid: ", fiendid);

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
      <Box display="flex" justifyContent="flex-end" height={30}>
        <Button onClick={closebox}>
          <CloseIcon />
        </Button>
      </Box>
      <Box height={250} width={400} className="messages">
        {messages
          .map((msg) => <Message key={msg.date} msg={msg} myid={myid} />)
          .reverse()}
      </Box>
      <MakeMessage senderid={myid} recieverid={fiendid} />
    </Box>
  );
}

//<Input placeholder="Message" />
