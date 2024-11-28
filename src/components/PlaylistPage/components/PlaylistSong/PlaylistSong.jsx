import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./PlaylistSong.css";
import { useSong } from "../../../../contexts/SongContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLikedSongs } from "../../../../contexts/LikedSongContext";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

function PlaylistSong({ order, song }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSong } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const handlePlaySong = () => {
    if (location.pathname !== "/library") setSong(song);
    else
      navigate("/playlist", {
        state: { data: song, from: window.location.pathname },
      });
  };
  const handlePlaylistAddClick = (e) => {
    e.stopPropagation();
    if (!likedSongs.some((songPrev) => songPrev.id === song.id)) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };
  const handlePlaylistRemoveClick = (e) => {
    e.stopPropagation();
    setLikedSongs((prev) => prev.filter((songPrev) => songPrev.id !== song.id));
  };

  const isLiked = likedSongs.some((songPrev) => songPrev.id === song.id);

  return (
    <div className="playlist-song-item" onClick={handlePlaySong}>
      {order && <div className="song-order">{order}</div>}
      {song.image && location.pathname !== "/playlist" && (
        <img className="song-order" src={song.image} alt={song.name}></img>
      )}

      <div className="song-exp">
        <span className="song-title">{song.name}</span>
        <span className="singer">{song.artist_name}</span>
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
          )}
        </div>
      )}
    </div>
  );
}

export default PlaylistSong;
