import React from "react";
import "./Header.css";
import SettingIcon from "../../SVG/SettingIcon";

function Header() {
  return (
    <div className="header">
      <div className="header-title">Good morning</div>
      <SettingIcon />
    </div>
  );
}

export default Header;
