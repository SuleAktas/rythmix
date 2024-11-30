import React from "react";
import FooterItem from "./components/FooterItem/FooterItem";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import HomeIcon from "../../SVG/TabIcons/HomeIcon";
import SearchIcon from "../../SVG/TabIcons/SearchIcon";
import LibraryIcon from "../../SVG/TabIcons/LibraryIcon";

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <div className="footer">
      <FooterItem
        icon={<HomeIcon />}
        title="Home"
        onClick={() => handleNavigate("/")}
      />
      <FooterItem
        icon={<SearchIcon />}
        title="Search"
        onClick={() => handleNavigate("/search")}
      />
      <FooterItem
        icon={<LibraryIcon />}
        title="Library"
        onClick={() => handleNavigate("/library")}
      />
    </div>
  );
}

export default Footer;
