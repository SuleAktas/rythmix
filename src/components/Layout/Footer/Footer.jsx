import React from "react";
import FooterItem from "./components/FooterItem/FooterItem";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import HomeIcon from "../../SVG/TabIcons/HomeIcon";
import SearchIcon from "../../SVG/TabIcons/SearchIcon";
import LibraryIcon from "../../SVG/TabIcons/LibraryIcon";
import { useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("/");

  const handleNavigate = (route) => {
    setSelectedTab(route);
    navigate(route);
  };
  return (
    <div className="footer">
      <FooterItem
        icon={<HomeIcon isSelected={selectedTab === "/"} />}
        title="Home"
        onClick={() => handleNavigate("/")}
      />
      <FooterItem
        icon={<SearchIcon isSelected={selectedTab === "/search"} />}
        title="Search"
        onClick={() => handleNavigate("/search")}
      />
      <FooterItem
        icon={<LibraryIcon isSelected={selectedTab === "/library"} />}
        title="Library"
        onClick={() => handleNavigate("/library")}
      />
    </div>
  );
}

export default Footer;
