import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Song.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useLikedSongs } from "../../contexts/LikedSongContext";
import FavoriteIcon from "../SVG/FavoriteIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import DevicesIcon from "../SVG/DevicesIcon";
import ShareIcon from "../SVG/ShareIcon";
import FilledPlayIcon from "../SVG/FilledPlayIcon";
import FilledPauseIcon from "../SVG/FilledPauseIcon";
import SkipNextIcon from "../SVG/SkipNextIcon";
import SkipPreviousIcon from "../SVG/SkipPreviousIcon";
import { useSongApi } from "../../contexts/SongApiContext";
import { FastAverageColor } from "fast-average-color";
function Song() {
  const DOWNICON = process.env.PUBLIC_URL + "/images/DOWNICON.png";
  const MOREICON = process.env.PUBLIC_URL + "/images/MOREICON.png";
  const AGAINICON = process.env.PUBLIC_URL + "/images/AGAINICON.png";
  const SHUFFLEICON = process.env.PUBLIC_URL + "/images/SHUFFLEICON.png";

  const { song, fetchTrackDetails } = useSongApi();
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("songId");
  const { likedSongs, setLikedSongs } = useLikedSongs();
  const [songStatus, setSongStatus] = useState(true);
  const [songDuration, setSongDuration] = useState(0);
  const [songRemainingTime, setSongRemainingTime] = useState(0);
  const [songPastTime, setSongPastTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [isLiked, setIsLiked] = useState(
    likedSongs.some((songPrev) => songPrev.id === song.id)
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
  useEffect(() => {
    if (song.album_image) {
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
    }
  }, [song.album_image]);
  const handleSongStatus = () => {
    setSongStatus((prev) => !prev);
    if (!audioRef.current) return;
    if (!songStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);
    setSongPastTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    const progressPercentage = (newTime / songDuration) * 100;
    event.target.style.setProperty(
      "--progress-percentage",
      `${progressPercentage}%`
    );
    setSongRemainingTime(songDuration - newTime);
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
  useEffect(() => {
    setIsVisible(true);
  }, [isVisible, navigate]);

  useEffect(() => {
    if (songId) {
      fetchTrackDetails(songId);
    }
  }, [songId]);
  useEffect(() => {
    setSongRemainingTime(song.duration);
    setSongDuration(song.duration);
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setSongDuration(audioRef.current.duration || 0);
      };

      const handleTimeUpdate = () => {
        setSongPastTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, []);
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
        <audio ref={audioRef} src={song && song.audio} />
        <div className="song-header">
          <div className="song-down-icon" onClick={() => navigate(-1)}>
            <img src={DOWNICON} alt="Coldplay"></img>
          </div>
          <div className="song-title">{song && song.artist_name}</div>
          <div className="song-more">
            <img src={MOREICON} alt="Coldplay"></img>
          </div>
        </div>

        <div className="song-image">
          <img
            src={song && song.album_image}
            alt={song && song.artist_name}
          ></img>
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
            className="custom-range"
            style={{ width: "100%" }}
          />
        </div>
        <div className="song-time">
          <div className="song-past-time">{formatTime(songPastTime)}</div>
          <div className="song-remain-time">
            {formatTime(songRemainingTime)}
          </div>
        </div>

        <div className="song-actions">
          <img
            className="shuffle-again-icon"
            src={SHUFFLEICON}
            alt="Coldplay"
          ></img>

          <SkipPreviousIcon />

          {songStatus && (
            <FilledPlayIcon onClick={handleSongStatus} color="white" />
          )}

          {!songStatus && (
            <FilledPauseIcon onClick={handleSongStatus} color="white" />
          )}
          <SkipNextIcon />

          <img
            className="shuffle-again-icon"
            src={AGAINICON}
            alt="Coldplay"
          ></img>
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
