import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-title">Good morning</div>
      <SettingsOutlinedIcon size="2x"></SettingsOutlinedIcon>
    </div>
  );
}

export default Header;
