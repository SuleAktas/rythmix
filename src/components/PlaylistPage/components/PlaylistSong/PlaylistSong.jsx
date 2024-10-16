import React from "react";
import "./PlaylistSong.css";

function PlaylistSong() {
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";

  return (
    <div className="playlist-song-item">
      <div className="song-order">1</div>
      <div className="song-exp">
        <p>Paradise</p>
        <p>Coldplay</p>
      </div>
      <div className="song-actions">
        <img src={DETAILSICON} alt="details"></img>
      </div>
    </div>
  );
}

export default PlaylistSong;
