import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistSong from "./components/PlaylistSong/PlaylistSong";
import "./PlaylistPage.css";
import { useSongApi } from "../../contexts/SongApiContext";
import { useLikedPlaylists } from "../../contexts/LikedPlaylistContext";
import { usePlaylist } from "../../contexts/PlaylistContext";
import FilledPlayIcon from "../SVG/FilledPlayIcon";
import FilledPauseIcon from "../SVG/FilledPauseIcon";
import ShareIcon from "../SVG/ShareIcon";
import FavoriteIcon from "../SVG/FavoriteIcon";
import DetailsIcon from "../SVG/DetailsIcon";
import SpotifyIcon from "../SVG/SpotifyIcon";
import BackIcon from "../SVG/BackIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";

function PlaylistPage({ title }) {
  const navigate = useNavigate();
  const { tracks, loading, error, setTracks } = useSongApi();
  const { likedPlaylists, setLikedPlaylists } = useLikedPlaylists();
  const [songStatus, setSongStatus] = useState(true);
  const { playlist } = usePlaylist();
  const [isLiked, setIsLiked] = useState(
    likedPlaylists.some((songPrev) => songPrev.id === playlist.id)
  );
  const handleSongStatus = () => {
    setSongStatus(!songStatus);
  };

  const handleOnLike = () => {
    if (!isLiked) setLikedPlaylists((prev) => [...prev, playlist]);
    else {
      setLikedPlaylists((prev) => prev.filter((album) => album !== playlist));
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (playlist) {
      const fetchSongs = async () => {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=99c16ea4&album_id=${playlist.id}`
        );
        const data = await response.json();
        setTracks(data.results);
      };

      fetchSongs();
    }
  }, [playlist]);

  if (loading) return <p>Loading tracks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="playlistpage-container">
      <div className="playlistpage-exp-container">
        <div className="playlistpage-box">
          <div className="playlist-header">
            <BackIcon onClick={() => navigate(-1)} />
          </div>
          <div className="playlist-img">
            <img src={tracks[0].album_image} alt={title}></img>
          </div>

          <div className="playlist-exp">
            <h1>{tracks[0].album_name}</h1>
            <p>The essential tracks,all in one playlist</p>
            <div className="spotify-exp">
              <SpotifyIcon />
              Spotify
            </div>
            <div className="playlist-length">
              <p>123.12312 likes - 2 hr 9 min</p>
            </div>
          </div>
        </div>
        <div className="playlist-buttons">
          <div className="playlist-actions">
            {isLiked ? (
              <FilledFavoriteIcon onClick={handleOnLike} />
            ) : (
              <FavoriteIcon onClick={handleOnLike} />
            )}
            <ShareIcon />
            <DetailsIcon />
          </div>

          <div className="playlist-play">
            {songStatus && (
              <FilledPlayIcon onClick={handleSongStatus} color="#1ED760" />
            )}
            {!songStatus && (
              <FilledPauseIcon onClick={handleSongStatus} color="#1ED760" />
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
