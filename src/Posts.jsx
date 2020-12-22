import React, { useState, useEffect } from "react";
import { storepost, fetchposts } from "./firebase";

export default function Posts(props) {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(fetchposts(setPosts), []);

  const makepost = (e) => {
    e.preventDefault();
    storepost({ user: props.user, text: input });
    setInput("");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div>CHAT</div>
      <form>
        <input value={input} type="text" onChange={handleInput}></input>
        <button type="submit" onClick={makepost}>
          post
        </button>
      </form>

      {posts.map((post, i) => (
        <div
          key={i}
          style={{
            display: "flex",
          }}
        >
          <div style={{ "margin-right": "15px" }}>
            {post.user.displayName}: {"   "}
          </div>
          <div>{post.text}</div>
        </div>
      ))}
    </div>
  );
}
