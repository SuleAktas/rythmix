import React from "react";
import { useState } from "react";
import "./SongPlayer.css";

function SongPlayer({ openSongPlayer }) {
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const SONGPLAYICON = process.env.PUBLIC_URL + "/images/SONGPLAYICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";

  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className={`component ${isOpen ? "open" : ""}`} onClick={toggleSlide}>
    <div className="song-player-container" onClick={openSongPlayer}>
      <div className="song-player-exp-box">
        <div className="song-player-image-box">
          <img
            className="song-player-image"
            src={SONG_PIC}
            alt="Coldplay"
          ></img>
        </div>
        <div className="song-player-about">
          <div className="song-player-name">Yellow </div>
          <div className="song-player-singer">Coldplay</div>
        </div>
      </div>
      <div className="song-player-actions">
        <img className="heart-icon" src={HEARTICON} alt="Coldplay"></img>
        <img className="play-icon" src={SONGPLAYICON} alt="Coldplay"></img>
      </div>
    </div>
    /* <div className={`content ${isOpen ? "show" : ""}`}>
        <Song />
      </div> */
    // </div>
  );
}

export default SongPlayer;
