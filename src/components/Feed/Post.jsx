import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function Post(props) {
  const post = props.post;
  return (
    <Box
      display="flex"
      //alignItems="center"
      justifyContent="flex-start"
      minHeight="50px"
      bgcolor="#f5f5f5"
      my={2}
      px={2}
      py={1}
      borderRadius="10px"
    >
      <Typography variant="body2">
        <Box fontWeight={400} width="120px">
          <Box>
            <img
              src={post.user.photoURL}
              alt={post.user.displayName}
              style={{ "object-fit": "contain", height: "50px" }}
            />
          </Box>
          <Box>{post.user.displayName}</Box>
        </Box>
      </Typography>
      <Typography variant="body1">
        <Box fontWeight={500}>{post.text}</Box>
      </Typography>
    </Box>
  );
}
