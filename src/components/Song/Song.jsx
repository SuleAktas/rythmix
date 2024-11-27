import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./Song.css";
import { useLocation, useNavigate } from "react-router-dom";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useSong } from "../../contexts/SongContext";
import { useRef } from "react";
function Song() {
  const DOWNICON = process.env.PUBLIC_URL + "/images/DOWNICON.png";
  const MOREICON = process.env.PUBLIC_URL + "/images/MOREICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const AGAINICON = process.env.PUBLIC_URL + "/images/AGAINICON.png";
  const SHUFFLEICON = process.env.PUBLIC_URL + "/images/SHUFFLEICON.png";

  const { song } = useSong();
  const [songStatus, setSongStatus] = useState(true);
  const [songDuration, setSongDuration] = useState(song.duration);
  const [songRemainingTime, setSongRemainingTime] = useState(song.duration);
  const [songPastTime, setSongPastTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from || "/";

  const audioRef = useRef(null);

  const handleSongStatus = () => {
    setSongStatus((prev) => !prev);
    if (!audioRef.current) return;
    if (!songStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const closeSong = () => {
    setIsVisible(false);
    navigate(previousPage, { state: { from: window.location.pathname } });
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);
    setSongPastTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setSongRemainingTime(songDuration - newTime);
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
  return (
    <div
      className={`song-container song-container ${isVisible ? "slide-up" : ""}`}
    >
      <audio ref={audioRef} src={song.audio} />
      <div className="song-header">
        <div className="song-down-icon" onClick={closeSong}>
          <img src={DOWNICON} alt="Coldplay"></img>
        </div>
        <div className="song-title">{song.artist_name}</div>
        <div className="song-more">
          <img src={MOREICON} alt="Coldplay"></img>
        </div>
      </div>

      <div className="song-image">
        <img src={song.image} alt={song.artist_name}></img>
      </div>
      <div className="song-about">
        <div className="song-name">{song.name} </div>
        <div className="song-singer">{song.artist_name}</div>
        <div className="song-like">
          <img src={HEARTICON} alt="Coldplay"></img>
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
        <div className="song-remain-time">{formatTime(songRemainingTime)}</div>
      </div>

      <div className="song-actions">
        <img
          className="shuffle-again-icon"
          src={SHUFFLEICON}
          alt="Coldplay"
        ></img>

        <SkipPreviousIcon
          sx={{
            color: "white",
            padding: "4px",
            fontSize: 48,
          }}
        />

        {songStatus && (
          <PlayCircleFilledIcon
            sx={{
              color: "white",
              padding: "4px",
              fontSize: 60,
            }}
            onClick={handleSongStatus}
          />
        )}

        {!songStatus && (
          <PauseCircleFilledIcon
            sx={{
              color: "white",
              padding: "4px",
              fontSize: 60,
            }}
            onClick={handleSongStatus}
          />
        )}
        <SkipNextIcon
          sx={{
            color: "white",
            padding: "4px",
            fontSize: 48,
          }}
        />
        <img
          className="shuffle-again-icon"
          src={AGAINICON}
          alt="Coldplay"
        ></img>
      </div>
      <div className="song-actions-more">
        <DevicesIcon />
        <ShareOutlinedIcon />
      </div>
    </div>
  );
}

export default Song;
