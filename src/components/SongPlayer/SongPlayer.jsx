import React from "react";
import "./SongPlayer.css";
import { useSong } from "../../contexts/SongContext";
import { useLikedSongs } from "../../contexts/LikedSongContext";
import PlayIcon from "../SVG/PlayIcon";
import FavoriteIcon from "../SVG/FavoriteIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SongPlayer() {
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const navigate = useNavigate();
  const { song } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const [isLiked, setIsLiked] = useState(
    likedSongs.some((songPrev) => songPrev.name === song.name)
  );
  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLiked) setLikedSongs((prev) => [...prev, song]);
    else setLikedSongs((prev) => prev.filter((prevSong) => prevSong !== song));
    setIsLiked((prev) => !prev);
  };

  const openSongPlayer = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("songId", song.id);
    navigate({
      pathname: "/song",
      search: searchParams.toString(),
      state: { from: window.location.pathname },
    });
  };

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
            <FilledFavoriteIcon onClick={handleLike} />
          ) : (
            <FavoriteIcon onClick={handleLike} />
          )}
          <PlayIcon />
        </div>
      </div>
    )
  );
}

export default SongPlayer;
