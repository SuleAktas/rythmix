import React, { useEffect } from "react";
import "./SongPlayer.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSong } from "../../contexts/SongContext";

function SongPlayer({ openSongPlayer }) {
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const { song } = useSong();
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
            <div className="song-player-singer">{song.singer}</div>
          </div>
        </div>
        <div className="song-player-actions">
          <FavoriteBorderIcon fontSize="large"></FavoriteBorderIcon>
          <PlayArrowIcon fontSize="large"></PlayArrowIcon>
        </div>
      </div>
    )
  );
}

export default SongPlayer;
