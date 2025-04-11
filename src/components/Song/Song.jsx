import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Song.css";
import { useLikedSongs } from "../../contexts/LikedSongContext";
import FavoriteIcon from "../SVG/FavoriteIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import DevicesIcon from "../SVG/DevicesIcon";
import ShareIcon from "../SVG/ShareIcon";
import FilledPlayIcon from "../SVG/FilledPlayIcon";
import FilledPauseIcon from "../SVG/FilledPauseIcon";
import SkipNextIcon from "../SVG/SkipNextIcon";
import SkipPreviousIcon from "../SVG/SkipPreviousIcon";
import { FastAverageColor } from "fast-average-color";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSong } from "../../contexts/SongContext";
import DownIcon from "../SVG/DownIcon";
import MoreIcon from "../SVG/MoreIcon";
import ShuffleIcon from "../SVG/ShuffleIcon";
import ReplayIcon from "../SVG/ReplayIcon";

function Song({ onClose, audioRef }) {
  const { song, setSong } = useSong();

  const { likedSongs, setLikedSongs } = useLikedSongs();

  const [songDuration, setSongDuration] = useState(0);

  const [songRemainingTime, setSongRemainingTime] = useState(0);
  const [songPastTime, setSongPastTime] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(
    likedSongs.some((songPrev) => songPrev.id === song.id),
  );

  const [backgroundColor, setBackgroundColor] = useState("");

  const mixWithBlack = (colorHex, ratio = 0.5) => {
    let r = parseInt(colorHex.slice(1, 3), 16);
    let g = parseInt(colorHex.slice(3, 5), 16);
    let b = parseInt(colorHex.slice(5, 7), 16);

    r = Math.round(r * (1 - ratio));
    g = Math.round(g * (1 - ratio));
    b = Math.round(b * (1 - ratio));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleLike = () => {
    if (!isLiked) setLikedSongs((prev) => [...prev, song]);
    else {
      setLikedSongs((prev) => prev.filter((prevSong) => prevSong !== song));
    }
    setIsLiked((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSongStatusClick = () => {
    setSong((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);
    setSongPastTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    setSongRemainingTime(songDuration - newTime);
    const progressPercentage = (newTime / songDuration) * 100;
    event.target.style.setProperty(
      "--progress-percentage",
      `${progressPercentage}%`,
    );
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 100);
  };

  useEffect(() => {
    setSong((prev) => ({ ...prev, isPlaying: true }));

    const fac = new FastAverageColor();

    fac
      .getColorAsync(song.album_image)
      .then((color) => {
        const mixedColor = mixWithBlack(color.hex, 0.5);
        setBackgroundColor(mixedColor);
      })
      .catch((err) => {
        console.error("Error fetching color:", err);
      });
  }, [setSong, song.album_image]);

  useEffect(() => {
    setIsVisible(true);
  }, [isVisible]);

  useEffect(() => {
    setSongRemainingTime(song.duration);
    setSongDuration(song.duration);
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setSongDuration(audioRef.current.duration || 0);
      };

      const handleTimeUpdate = () => {
        setSongPastTime(audioRef.current.currentTime);
        setSongRemainingTime(
          audioRef.current.duration - audioRef.current.currentTime,
        );
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata,
          );
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [audioRef]);

  useEffect(() => {
    const progressPercentage = (songPastTime / songDuration) * 100;
    document
      .querySelector(".custom-range")
      .style.setProperty("--progress-percentage", `${progressPercentage}%`);
  }, [songDuration, songPastTime]);

  return (
    song && (
      <div
        style={{ backgroundColor: backgroundColor }}
        className={`song-container song-container ${
          isVisible ? "slide-up" : ""
        }`}
      >
        <div className="song-header">
          <div className="song-down-icon" onClick={handleClose}>
            <DownIcon />
          </div>
          <div className="song-title">{song && song.artist_name}</div>
          <div className="song-more">
            <MoreIcon />
          </div>
        </div>

        <div className="song-image">
          {song ? (
            <img
              src={song && song.album_image}
              alt={song && song.artist_name}
            ></img>
          ) : (
            <Skeleton
              baseColor="#2b2b2b"
              highlightColor="#3b3b3b"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="song-about">
          <div className="song-name">{song && song.name} </div>
          <div className="song-singer">{song && song.artist_name}</div>
          <div className="song-like">
            {isLiked ? (
              <FilledFavoriteIcon onClick={handleLike} />
            ) : (
              <FavoriteIcon onClick={handleLike} />
            )}
          </div>
        </div>
        <div className="song-progress-bar">
          <input
            type="range"
            min="0"
            max={songDuration}
            value={songPastTime}
            onChange={handleSeek}
            className="custom-range w-full"
          />
        </div>
        <div className="song-time">
          <div className="song-past-time">{formatTime(songPastTime)}</div>
          <div className="song-remain-time">
            {formatTime(songRemainingTime)}
          </div>
        </div>

        <div className="song-actions">
          <ShuffleIcon />

          <SkipPreviousIcon />

          {!song.isPlaying ? (
            <FilledPlayIcon onClick={handleSongStatusClick} color="white" />
          ) : (
            <FilledPauseIcon onClick={handleSongStatusClick} color="white" />
          )}

          <SkipNextIcon />

          <ReplayIcon />
        </div>
        <div className="song-actions-more">
          <DevicesIcon />
          <ShareIcon />
        </div>
      </div>
    )
  );
}

export default Song;
