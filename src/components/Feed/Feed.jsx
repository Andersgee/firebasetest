import React, { useState, useEffect } from "react";
import { fetchposts } from "../../firebase";
import { Box } from "@material-ui/core";
import MakePost from "./MakePost";
import Post from "./Post";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(fetchposts(setPosts), []);

  return (
    <Box>
      <MakePost user={props.user} />
      {posts.map((post, i) => (
        <Box key={i}>
          <Post
            user={props.user}
            post={post}
            setActivemsgboxes={props.setActivemsgboxes}
          />
        </Box>
      ))}
    </Box>
  );
}
