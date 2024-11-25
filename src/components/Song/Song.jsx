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
function Song() {
  const DOWNICON = process.env.PUBLIC_URL + "/images/DOWNICON.png";
  const SONG_PIC = process.env.PUBLIC_URL + "/images/COLDPLAY.png";
  const MOREICON = process.env.PUBLIC_URL + "/images/MOREICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const AGAINICON = process.env.PUBLIC_URL + "/images/AGAINICON.png";
  const STOPICON = process.env.PUBLIC_URL + "/images/STOPICON.png";
  const SHUFFLEICON = process.env.PUBLIC_URL + "/images/SHUFFLEICON.png";
  const SONGPLAYICON = process.env.PUBLIC_URL + "/images/SONGPLAYICON.png";

  const [progress, setProgress] = useState(12);
  const [songStatus, setSongStatus] = useState(false);
  const [songIcon, setSongIcon] = useState(STOPICON);
  const [songDuration, setSongDuration] = useState(159);
  const [songRemainingTime, setSongRemainingTime] = useState(159);
  const [songPastTime, setSongPastTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from || "/";
  const { song } = useSong();

  const handleSongStatus = () => {
    setSongStatus((prev) => !prev);
    setSongIcon(songIcon === STOPICON ? SONGPLAYICON : STOPICON);
  };

  const closeSong = () => {
    setIsVisible(false);
    navigate(previousPage, { state: { from: window.location.pathname } });
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);
    setSongPastTime(newTime);
    setSongRemainingTime(songDuration - newTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };
  useEffect(() => {
    setIsVisible(true);
  }, [isVisible, navigate]);
  useEffect(() => {
    if (songStatus) return;

    const interval = setInterval(() => {
      setSongPastTime((prev) => {
        if (prev >= songDuration) {
          clearInterval(interval);
          setSongStatus(true);
          return songDuration;
        }

        const newPastTime = prev + 1;
        setSongRemainingTime(songDuration - newPastTime);
        return newPastTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [songStatus, songDuration]);

  return (
    <div
      className={`song-container song-container ${isVisible ? "slide-up" : ""}`}
    >
      <div className="song-header">
        <div className="song-down-icon" onClick={closeSong}>
          <img src={DOWNICON} alt="Coldplay"></img>
        </div>
        <div className="song-title">{song.singer}</div>
        <div className="song-more">
          <img src={MOREICON} alt="Coldplay"></img>
        </div>
      </div>

      <div className="song-image">
        <img src={SONG_PIC} alt="Coldplay"></img>
      </div>
      <div className="song-about">
        <div className="song-name">{song.name} </div>
        <div className="song-singer">{song.singer}</div>
        <div className="song-like">
          <img src={HEARTICON} alt="Coldplay"></img>
        </div>
      </div>
      <div className="song-progress-bar">
        {/* <progress
          
          value={songPastTime / songDuration}
          max={1}
          style={{ width: "100%" }}
        /> */}
        <input
          type="range"
          min="0"
          max={songDuration}
          value={songPastTime}
          onChange={handleSeek}
          className="custom-range"
          style={{ width: "100%" }}
        />
        {/* <div
          class="progress-circle"
          style={{
            left: `${(songPastTime / songDuration) * 100}%`,
          }}
        ></div> */}
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
