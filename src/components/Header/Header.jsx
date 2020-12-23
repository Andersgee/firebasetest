import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import "./Header.css";

import useOutsideClick from "../../hooks/useOutsideClick";
import SettingsIcon from "@material-ui/icons/Settings";

export default function Header() {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (open) setOpen(false);
  });

  return (
    <nav className="navbar">
      <Box
        ref={ref}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height={50}
      >
        <NavItem1 Icon="A" setOpen={setOpen} open={open} />
        <NavItem2 Icon={<SettingsIcon />} setOpen={setOpen} open={open} />
      </Box>
    </nav>
  );
}

function NavItem1(props) {
  const handleOpen = () => {
    if (props.open === 1) {
      props.setOpen(false);
    } else {
      props.setOpen(1);
    }
  };
  return (
    <Box>
      <Box position="relative">
        <Button
          variant="text"
          style={{ borderRadius: 50 }}
          onClick={handleOpen}
        >
          {props.Icon}
        </Button>
      </Box>
      <Box
        p={1}
        bgcolor="#88bbd6"
        width={200}
        height={200}
        position="absolute"
        top={55}
        right={0}
        className={props.open === 1 ? "fadeIn" : "fadeOut"}
      >
        <Typography variant="body1">TODO</Typography>
        <Typography variant="body1">excellent color choice sir</Typography>
      </Box>
    </Box>
  );
}

function NavItem2(props) {
  const handleOpen = () => {
    if (props.open === 2) {
      props.setOpen(false);
    } else {
      props.setOpen(2);
    }
  };
  return (
    <Box>
      <Box position="relative">
        <Button
          variant="text"
          style={{ borderRadius: 50 }}
          onClick={handleOpen}
        >
          {props.Icon}
        </Button>
      </Box>
      <Box
        p={1}
        bgcolor="#88bbd6"
        width={200}
        height={200}
        position="absolute"
        top={55}
        right={0}
        className={props.open === 2 ? "fadeIn" : "fadeOut"}
      >
        <Typography variant="body1">TODO</Typography>
        <Typography variant="body1">Set Profile Info</Typography>
      </Box>
    </Box>
  );
}
