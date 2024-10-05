import React from "react";
import FooterItem from "./components/FooterItem/FooterItem";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();
  const HOMEICON = process.env.PUBLIC_URL + "/images/HOMEICON.png";
  const LIBRARYICON = process.env.PUBLIC_URL + "/images/LIBRARYICON.png";
  const PREMIUMICON = process.env.PUBLIC_URL + "/images/PREMIUMICON.png";
  const SEARCHICON = process.env.PUBLIC_URL + "/images/SEARCHICON.png";

  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <div className="footer">
      <FooterItem
        img={HOMEICON}
        title="Home"
        onClick={() => handleNavigate("/")}
      />
      <FooterItem
        img={SEARCHICON}
        title="Search"
        onClick={() => handleNavigate("/search")}
      />
      <FooterItem
        img={LIBRARYICON}
        title="Library"
        onClick={() => handleNavigate("/library")}
      />
      <FooterItem
        img={PREMIUMICON}
        title="Premium"
        onClick={() => handleNavigate("/premium")}
      />
    </div>
  );
}

export default Footer;
