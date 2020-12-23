import React from "react";
import { Box, Typography } from "@material-ui/core";
import Profile from "./Profile";

export default function Post(props) {
  const post = props.post;
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      minHeight="50px"
      bgcolor="#efefef"
      my={2}
      px={2}
      py={1}
      borderRadius="10px"
    >
      <Profile user={post.user} />

      <Typography variant="body1" component="span">
        <Box fontWeight={500}>{post.text}</Box>
      </Typography>
    </Box>
  );
}
