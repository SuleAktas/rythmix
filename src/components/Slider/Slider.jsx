import React from "react";
import "./Slider.css";
import Card from "../Card/Card";

function Slider({ title }) {
  const DAILYMIX4 = process.env.PUBLIC_URL + "/images/DAILYMIX4.png";

  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div className="slider-container">
        <Card img={DAILYMIX4} title="Daily Mix 4" />
        <Card img={DAILYMIX4} title="Daily Mix 4" />
        <Card img={DAILYMIX4} title="Daily Mix 4" />
        <Card img={DAILYMIX4} title="Daily Mix 4" />
      </div>
    </div>
  );
}

export default Slider;
