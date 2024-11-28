import React, { useEffect } from "react";
import "./SongPlayer.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSong } from "../../contexts/SongContext";
import { useLikedSongs } from "../../contexts/LikedSongContext";

function SongPlayer({ openSongPlayer }) {
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const { song } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();

  const handlePlaylistAddClick = (e) => {
    e.stopPropagation();
    if (!likedSongs.some((songPrev) => songPrev.name === song.name)) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };
  const handlePlaylistRemoveClick = (e) => {
    e.stopPropagation();
    setLikedSongs((prev) =>
      prev.filter((songPrev) => songPrev.name !== song.name)
    );
  };

  const isLiked = likedSongs.some((songPrev) => songPrev.name === song.name);

  return (
    song.name && (
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
            <div className="song-player-name">{song.name} </div>
            <div className="song-player-singer">{song.artist_name}</div>
          </div>
        </div>
        <div className="song-player-actions">
          {isLiked ? (
            <FavoriteIcon
              fontSize="large"
              onClick={handlePlaylistRemoveClick}
            ></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon
              fontSize="large"
              onClick={handlePlaylistAddClick}
            ></FavoriteBorderIcon>
          )}

          <PlayArrowIcon fontSize="large"></PlayArrowIcon>
        </div>
      </div>
    )
  );
}

export default SongPlayer;
