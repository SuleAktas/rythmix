import React from "react";
import "./PlaylistSong.css";

function PlaylistSong({ order, title, singer }) {
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";

  return (
    <div className="playlist-song-item">
      <div className="song-order">{order}</div>
      <div className="song-exp">
        <p className="song-title">{title}</p>
        <p className="singer">{singer}</p>
      </div>
      <div className="song-actions">
        <img src={DETAILSICON} alt="details"></img>
      </div>
    </div>
  );
}

export default PlaylistSong;
