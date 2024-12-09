import React from "react";
import "./SongPlayer.css";
import { useSong } from "../../contexts/SongContext";
import { useLikedSongs } from "../../contexts/LikedSongContext";
import PlayIcon from "../SVG/PlayIcon";
import FavoriteIcon from "../SVG/FavoriteIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PauseIcon from "../SVG/PauseIcon";
import { useRef } from "react";

function SongPlayer() {
  const navigate = useNavigate();
  const { song } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const [songStatus, setSongStatus] = useState(true);
  const [isLiked, setIsLiked] = useState(
    likedSongs.some((songPrev) => songPrev.id === song.id)
  );
  const audioRef = useRef(null);

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLiked) setLikedSongs((prev) => [...prev, song]);
    else
      setLikedSongs((prev) =>
        prev.filter((prevSong) => prevSong.id !== song.id)
      );
    setIsLiked((prev) => !prev);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;

    if (!audio) return;

    if (songStatus) {
      audio.pause();
    } else {
      audio.play();
    }

    setSongStatus((prev) => !prev);
  };

  const openSongPlayer = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("id", song.id);
    navigate({
      pathname: "/song",
      search: searchParams.toString(),
      state: { from: window.location.pathname },
    });
  };

  useEffect(() => {
    setIsLiked(likedSongs.some((songPrev) => songPrev.id === song.id));
    setSongStatus(true);
  }, [song]);

  useEffect(() => {
    if (song.audio) {
      const audio = audioRef.current;

      if (!audio) return;

      if (!songStatus) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [song, songStatus]);

  return (
    song.name && (
      <div className="song-player-container" onClick={openSongPlayer}>
        <div className="song-player-exp-box">
          <div className="song-player-image-box">
            <img
              className="song-player-image"
              src={song.album_image}
              alt={song.name}
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

          {!songStatus ? (
            <PlayIcon onClick={handlePlay} color="white" />
          ) : (
            <PauseIcon onClick={handlePlay} color="white" />
          )}
          <audio ref={audioRef} src={song.audio} />
        </div>
      </div>
    )
  );
}

export default SongPlayer;
