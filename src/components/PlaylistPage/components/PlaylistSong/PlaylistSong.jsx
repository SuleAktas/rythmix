import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./PlaylistSong.css";
import { useSong } from "../../../../contexts/SongContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLikedSongs } from "../../../../contexts/LikedSongContext";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

function PlaylistSong({ order, name, singer, img }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSong } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const handlePlaySong = () => {
    if (location.pathname !== "/library")
      setSong({ name: name, singer: singer });
    else navigate("/playlist", { state: { from: window.location.pathname } });
  };
  const handlePlaylistAddClick = (e) => {
    e.stopPropagation();
    if (!likedSongs.some((song) => song.name === name)) {
      setLikedSongs((prev) => [...prev, { name, singer, img }]);
    }
  };
  const handlePlaylistRemoveClick = (e) => {
    e.stopPropagation();
    setLikedSongs((prev) => prev.filter((songPrev) => songPrev.name !== name));
  };

  const isLiked = likedSongs.some((song) => song.name === name);

  return (
    <div className="playlist-song-item" onClick={handlePlaySong}>
      {order && <div className="song-order">{order}</div>}
      {img && <img className="song-order" src={img} alt={name}></img>}

      <div className="song-exp">
        <span className="song-title">{name}</span>
        <span className="singer">{singer}</span>
      </div>
      {location.pathname !== "/library" && (
        <div className="actions">
          {isLiked ? (
            <PlaylistAddCheckIcon
              style={{ color: "#1ED760", cursor: "pointer" }}
              onClick={handlePlaylistRemoveClick}
            />
          ) : (
            <PlaylistAddIcon onClick={handlePlaylistAddClick} />
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default PlaylistSong;
