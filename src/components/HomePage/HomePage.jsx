import React from "react";
import Slider from "../Slider/Slider";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <Slider title="Reccomandations for Sule" />
      <Slider title="Voices from Indie Music" />
      <Slider title="Continue where you left" />
      <Slider title="Reccomandations for Sule" />
      <Slider title="Voices from Indie Music" />
      <Slider title="Continue where you left" />
    </div>
  );
}

export default HomePage;
