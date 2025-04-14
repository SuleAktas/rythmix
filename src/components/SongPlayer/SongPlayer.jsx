import React from "react";
import "./SongPlayer.css";
import { useSong } from "../../contexts/SongContext";
import { useLikedSongs } from "../../contexts/LikedSongContext";
import PlayIcon from "../SVG/PlayIcon";
import FavoriteIcon from "../SVG/FavoriteIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import { useState } from "react";
import { useEffect } from "react";
import PauseIcon from "../SVG/PauseIcon";
import { useRef } from "react";
import Song from "../Song/Song";

function SongPlayer() {
  const { song, setSong } = useSong();
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const [isLiked, setIsLiked] = useState(
    likedSongs.some((songPrev) => songPrev.id === song.id),
  );
  const audioRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLiked) setLikedSongs((prev) => [...prev, song]);
    else
      setLikedSongs((prev) =>
        prev.filter((prevSong) => prevSong.id !== song.id),
      );
    setIsLiked((prev) => !prev);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    setSong((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!song.isPlaying) {
      audio.pause();
    } else {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Audio play error:", err);
        });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [song, song.isPlaying]);

  useEffect(() => {
    setIsLiked(likedSongs.some((songPrev) => songPrev.id === song.id));
  }, [likedSongs, song.id]);

  return (
    song.name && (
      <div
        className="song-player-container"
        onClick={() => setIsModalOpen(true)}
      >
        {isModalOpen && <Song onClose={closeModal} audioRef={audioRef} />}

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

          {!song.isPlaying ? (
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
