import React, { useState, useEffect } from "react";
import { storepost, fetchposts } from "./firebase";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(fetchposts(setPosts), []);

  const makepost = () => {
    storepost({ t: performance.now(), b: "kek" });
  };
  return (
    <>
      <button onClick={makepost}>post</button>
      {posts.map((post, i) => (
        <div key={i}>{post.t}</div>
      ))}
    </>
  );
}
