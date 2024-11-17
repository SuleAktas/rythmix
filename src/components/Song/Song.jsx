import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Song.css";
import { useNavigate } from "react-router-dom";

function Song() {
  const DOWNICON = process.env.PUBLIC_URL + "/images/DOWNICON.png";
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const MOREICON = process.env.PUBLIC_URL + "/images/MOREICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const AGAINICON = process.env.PUBLIC_URL + "/images/AGAINICON.png";
  const PREVIOUSICON = process.env.PUBLIC_URL + "/images/PREVIOUSICON.png";
  const STOPICON = process.env.PUBLIC_URL + "/images/STOPICON.png";
  const NEXTICON = process.env.PUBLIC_URL + "/images/NEXTICON.png";
  const SHUFFLEICON = process.env.PUBLIC_URL + "/images/SHUFFLEICON.png";
  const SONGSHAREICON = process.env.PUBLIC_URL + "/images/SONGSHAREICON.png";
  const DEVICESICON = process.env.PUBLIC_URL + "/images/DEVICESICON.png";

  const [progress, setProgress] = useState(12);

  const handleInputChange = (e) => {
    setProgress(e.target.value);
  };
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const closeSong = () => {
    setIsVisible(false);
    navigate("/");
  };
  useEffect(() => {
    setIsVisible(true);
  }, [isVisible, navigate]);

  return (
    <div
      className={`song-container song-container ${isVisible ? "slide-up" : ""}`}
    >
      <div className="song-header">
        <div className="song-down-icon" onClick={closeSong}>
          <img src={DOWNICON} alt="Coldplay"></img>
        </div>
        <div className="song-title">Coldplay</div>
        <div className="song-more">
          <img src={MOREICON} alt="Coldplay"></img>
        </div>
      </div>

      <div className="song-image">
        <img src={SONG_PIC} alt="Coldplay"></img>
      </div>
      <div className="song-about">
        <div className="song-name">Yellow </div>
        <div className="song-singer">Coldplay</div>
        <div className="song-like">
          <img src={HEARTICON} alt="Coldplay"></img>
        </div>
      </div>
      <div className="song-progress-bar">
        <progress value={0.12} />
        <div
          class="progress-circle"
          style={{
            left: `${(progress / 100) * 100}%`,
          }}
        ></div>
      </div>
      <div className="song-actions">
        <img
          className="shuffle-again-icon"
          src={SHUFFLEICON}
          alt="Coldplay"
        ></img>
        <img className="prev-next-icon" src={PREVIOUSICON} alt="Coldplay"></img>
        <img className="stop-icon" src={STOPICON} alt="Coldplay"></img>
        <img className="prev-next-icon" src={NEXTICON} alt="Coldplay"></img>
        <img
          className="shuffle-again-icon"
          src={AGAINICON}
          alt="Coldplay"
        ></img>
      </div>
      <div className="song-actions-more">
        <img src={DEVICESICON} alt="Coldplay"></img>
        <img src={SONGSHAREICON} alt="Coldplay"></img>
      </div>
    </div>
  );
}

export default Song;
