import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

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
            style={{ "object-fit": "contain", width: "50px" }}
          />
        </Box>
      </Box>
      {show && (
        <Box
          position="absolute"
          borderRadius="10px"
          bgcolor="#fffafa"
          style={{ "z-index": "1" }}
          py={2}
          px={2}
        >
          <Typography variant="body2">
            <Box fontWeight={400} width="240px">
              <Box>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  style={{ "object-fit": "contain" }}
                />
              </Box>
              <Box>{user.displayName}</Box>
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
