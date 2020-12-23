import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import "./Profile.css";

export default function Profile(props) {
  const [show, setShow] = useState(false);
  const { user } = props;

  return (
    <Box position="relative">
      <Box fontWeight={400} width="70px">
        <Box
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          width="50px"
        >
          <img
            src={user.photoURL}
            alt={user.displayName}
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
              src={user.photoURL}
              alt={user.displayName}
              style={{ objectFit: "contain" }}
            />

            <Box>{user.displayName}</Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
