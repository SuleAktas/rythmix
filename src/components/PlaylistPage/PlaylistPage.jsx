import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistSong from "./components/PlaylistSong/PlaylistSong";
import "./PlaylistPage.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useSongApi } from "../../contexts/SongApiContext";

function PlaylistPage({ title }) {
  const DAILYMIX4 = process.env.PUBLIC_URL + "/images/DAILYMIX4.png";
  const SPOTIFYLOGO = process.env.PUBLIC_URL + "/images/SPOTIFYLOGO.png";
  const BACKICON = process.env.PUBLIC_URL + "/images/BACKICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";
  const SHAREICON = process.env.PUBLIC_URL + "/images/SHAREICON.png";

  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state?.from || "/";

  const handleNavigatePreviousPage = () => {
    console.log(location.state?.from);
    navigate(previousPage, { state: { from: window.location.pathname } });
  };

  const [songStatus, setSongStatus] = useState(true);
  const handleSongStatus = () => {
    setSongStatus(!songStatus);
  };
  const { tracks, loading, error, fetchTracks } = useSongApi();
  const [tag, setTag] = useState("rock");

  const handleTagChange = (newTag) => {
    setTag(newTag);
    fetchTracks(newTag);
  };

  if (loading) return <p>Loading tracks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="playlistpage-container">
      <div className="playlistpage-exp-container">
        <div className="playlistpage-box">
          <div className="playlist-header">
            <img
              src={BACKICON}
              alt={title}
              onClick={handleNavigatePreviousPage}
            ></img>
          </div>
          <div className="playlist-img">
            <img src={DAILYMIX4} alt={title}></img>
          </div>

          <div className="playlist-exp">
            <h1>This Is Coldplay</h1>
            <p>The essential tracks,all in one playlist</p>
            <div className="spotify-exp">
              <img src={SPOTIFYLOGO} alt={title}></img> Spotify
            </div>
            <div className="playlist-length">
              <p>123.12312 likes - 2 hr 9 min</p>
            </div>
          </div>
        </div>
        <div className="playlist-buttons">
          <div className="playlist-actions">
            <img src={HEARTICON} alt={title}></img>
            <img src={SHAREICON} alt={title}></img>
            <img src={DETAILSICON} alt={title}></img>
          </div>

          <div className="playlist-play">
            {songStatus && (
              <PlayCircleFilledIcon
                sx={{
                  color: "#1ED760",
                  padding: "4px",
                  fontSize: 70,
                }}
                onClick={handleSongStatus}
              />
            )}
            {!songStatus && (
              <PauseCircleFilledIcon
                sx={{
                  color: "#1ED760",
                  fontSize: 70,
                }}
                onClick={handleSongStatus}
              />
            )}
          </div>
        </div>
      </div>
      <div className="playlist-songs">
        {!loading &&
          tracks.map((track, index) => (
            <PlaylistSong key={track.id} order={index + 1} song={track} />
          ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
