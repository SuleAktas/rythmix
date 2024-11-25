import React from "react";
import "./AboutSong.css";

function AboutSong({ isOpen, name, singer, img }) {
  return (
    <div className={`slide-up ${isOpen ? "open" : ""}`}>
      <div className="about-song-exp">
        <div className="about-song-img">1</div>
        <div className="about-song-name">{name}</div>
        <div className="about-song-singer">{singer}</div>
      </div>
      <div className="about-song-actions"></div>
    </div>
  );
}

export default AboutSong;
