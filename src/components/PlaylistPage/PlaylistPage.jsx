import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistSong from "./components/PlaylistSong/PlaylistSong";
import "./PlaylistPage.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useSongApi } from "../../contexts/SongApiContext";
import { useLikedPlaylists } from "../../contexts/LikedPlaylistContext";
import { usePlaylist } from "../../contexts/PlaylistContext";

function PlaylistPage({ title }) {
  const SPOTIFYLOGO = process.env.PUBLIC_URL + "/images/SPOTIFYLOGO.png";
  const BACKICON = process.env.PUBLIC_URL + "/images/BACKICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";
  const SHAREICON = process.env.PUBLIC_URL + "/images/SHAREICON.png";

  const location = useLocation();
  const navigate = useNavigate();
  const { tracks, loading, error, setTracks } = useSongApi();
  const { setLikedPlaylists } = useLikedPlaylists();
  const [songStatus, setSongStatus] = useState(true);
  const previousPage = location.state?.from || "/";
  const { album } = usePlaylist();
  const handleNavigatePreviousPage = () => {
    console.log(location.state?.from);
    navigate(previousPage, { state: { from: window.location.pathname } });
  };

  const handleSongStatus = () => {
    setSongStatus(!songStatus);
  };

  const handleOnLike = () => {
    setLikedPlaylists((prev) => [...prev, album]);
  };

  useEffect(() => {
    if (album) {
      const fetchSongs = async () => {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=99c16ea4&album_id=${album.id}`
        );
        const data = await response.json();
        setTracks(data.results);
      };

      fetchSongs();
    }
  }, [album]);

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
            <img src={tracks[0].album_image} alt={title}></img>
          </div>

          <div className="playlist-exp">
            <h1>{tracks[0].album_name}</h1>
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
            <img src={HEARTICON} onClick={handleOnLike} alt={title}></img>
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
