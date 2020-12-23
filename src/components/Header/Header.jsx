import React, { useState, useRef } from "react";
import { Box, Button } from "@material-ui/core";
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
      <ul className="navbar-nav" ref={ref}>
        <NavItem1 Icon={<SettingsIcon />} setOpen={setOpen} open={open} />
        <NavItem2 Icon="B" setOpen={setOpen} open={open} />
        <NavItem2 Icon="C" setOpen={setOpen} open={open} />
      </ul>
    </nav>
  );
}

function NavItem1(props) {
  return (
    <li className="nav-item">
      <Box position="relative">
        <Button
          variant="text"
          style={{ borderRadius: 50 }}
          onClick={() => props.setOpen(1)}
        >
          {props.Icon}
        </Button>
      </Box>
      <Box
        bgcolor="#f00"
        width={200}
        height={200}
        position="absolute"
        top={60}
        right={0}
        className={props.open === 1 ? "fadeIn" : "fadeOut"}
      >
        hMHMDMFDM
      </Box>
    </li>
  );
}

function NavItem2(props) {
  return (
    <li className="nav-item">
      <Box position="relative">
        <Button
          variant="text"
          style={{ borderRadius: 50 }}
          onClick={() => props.setOpen(2)}
        >
          {props.Icon}
        </Button>
      </Box>
      <Box
        bgcolor="#f00"
        width={200}
        height={200}
        position="absolute"
        top={60}
        right={0}
        className={props.open === 2 ? "fadeIn" : "fadeOut"}
      >
        APA
      </Box>
    </li>
  );
}
