import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./PlaylistSong.css";
import { useSong } from "../../../../contexts/SongContext";
import { useLocation, useNavigate } from "react-router-dom";

function PlaylistSong({ order, title, singer, img }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSong } = useSong();
  const handlePlaySong = () => {
    if (location.pathname !== "/library")
      setSong({ name: title, singer: singer });
    else navigate("/playlist", { state: { from: window.location.pathname } });
  };
  const handlePlaylistAddClick = () => {};

  return (
    <div className="playlist-song-item" onClick={handlePlaySong}>
      {order && <div className="song-order">{order}</div>}
      {img && <img className="song-order" src={img} alt={title}></img>}

      <div className="song-exp">
        <span className="song-title">{title}</span>
        <span className="singer">{singer}</span>
      </div>
      {location.pathname !== "/library" && (
        <div className="actions">
          <PlaylistAddIcon onClick={handlePlaylistAddClick} />
        </div>
      )}
    </div>
  );
}

export default PlaylistSong;
