import React from "react";
import "./PlaylistSong.css";

function PlaylistSong({ order, title, singer, img }) {
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";

  return (
    <div className="playlist-song-item">
      {order && <div className="song-order">{order}</div>}
      {img && <img className="song-order" src={img} alt={title}></img>}

      <div className="song-exp">
        <span className="song-title">{title}</span>
        <span className="singer">{singer}</span>
      </div>
      <div className="song-actions">
        <img src={DETAILSICON} alt="details"></img>
      </div>
    </div>
  );
}

export default PlaylistSong;
