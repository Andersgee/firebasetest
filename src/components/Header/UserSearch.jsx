import React, { useState } from "react";
import { Box, Typography, TextField, Divider } from "@material-ui/core";
import Profile from "../Feed/Profile";
import SearchIcon from "@material-ui/icons/Search";

function includestext(user, text) {
  return user.toLowerCase().includes(text.toLowerCase());
}

function filterusers(users, text) {
  if (text.length > 0) {
    return users.filter((user) => includestext(user.displayName, text));
  } else {
    return [];
  }
}

export default function UserSearch(props) {
  const [text, setText] = useState("");
  const [filteredusers, setFilteredusers] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
    setFilteredusers(filterusers(props.users, e.target.value));
  };

  return (
    <Box alignItems="start" minHeight={40}>
      <TextField
        value={text}
        onChange={onChange}
        label={<Typography variant="body2">Search for people</Typography>}
      />
      {filteredusers.map((user) => (
        <Box key={user.uid}>
          <Box height={60} display="flex" alignItems="center">
            <Profile
              user={props.user}
              postuser={user}
              setActivemsgboxes={props.setActivemsgboxes}
            />
            <Typography>{user.displayName}</Typography>
          </Box>
          <Box mb={1}>
            <Divider variant="middle" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
