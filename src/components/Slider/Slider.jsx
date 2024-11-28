import React from "react";
import "./Slider.css";
import Card from "../Card/Card";
import { useSongApi } from "../../contexts/SongApiContext";

function Slider({ title }) {
  const { albums } = useSongApi();

  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div className="slider-container">
        {albums.map((album, index) => (
          <Card key={index} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
