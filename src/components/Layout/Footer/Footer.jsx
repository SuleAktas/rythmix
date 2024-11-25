import React from "react";
import FooterItem from "./components/FooterItem/FooterItem";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <div className="footer">
      <FooterItem
        icon={<HomeOutlinedIcon sx={{ fontSize: 30 }} />}
        title="Home"
        onClick={() => handleNavigate("/")}
      />
      <FooterItem
        icon={<SearchOutlinedIcon sx={{ fontSize: 30 }} />}
        title="Search"
        onClick={() => handleNavigate("/search")}
      />
      <FooterItem
        icon={<LibraryMusicIcon sx={{ fontSize: 30 }} />}
        title="Library"
        onClick={() => handleNavigate("/library")}
      />
    </div>
  );
}

export default Footer;
