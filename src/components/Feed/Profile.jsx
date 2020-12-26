import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import "./Profile.css";

function pairstr(a, b) {
  //return [a,b].join("-")
  //actually, make sure the string is always the same regardless if a,b or b,a is input
  const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true });
  return [a, b].sort(sortAlphaNum).join("-");
}

export default function Profile(props) {
  const [show, setShow] = useState(false);
  const { user, postuser } = props;

  const handleClick = () => {
    if (user.uid !== postuser.uid) {
      const id = pairstr(user.uid, postuser.uid);
      props.setActivemsgboxes([id]);
      console.log("setting activemsgboxes to ", [id]);
    }
  };

  return (
    <Box position="relative">
      <Box fontWeight={400} width="70px">
        <Box
          onClick={handleClick}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          width="50px"
        >
          <img
            src={postuser.photoURL}
            alt={postuser.displayName}
            style={{ objectFit: "contain", width: "50px" }}
          />
        </Box>
      </Box>
      <Box
        position="absolute"
        className={show ? "fadeIn" : "fadeOut"}
        borderRadius="10px"
        bgcolor="#fcfcfc"
        style={{ zIndex: "1" }}
        py={2}
        px={2}
      >
        <Typography variant="body2" component="span">
          <Box fontWeight={400} width="240px">
            <img
              src={postuser.photoURL}
              alt={postuser.displayName}
              style={{ objectFit: "contain" }}
            />

            <Box>{postuser.displayName}</Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
