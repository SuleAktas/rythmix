import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlaylistSong from "./components/PlaylistSong/PlaylistSong";
import "./PlaylistPage.css";
import { useSongApi } from "../../contexts/SongApiContext";
import { useLikedPlaylists } from "../../contexts/LikedPlaylistContext";
import FilledPlayIcon from "../SVG/FilledPlayIcon";
import FilledPauseIcon from "../SVG/FilledPauseIcon";
import ShareIcon from "../SVG/ShareIcon";
import FavoriteIcon from "../SVG/FavoriteIcon";
import DetailsIcon from "../SVG/DetailsIcon";
import SpotifyIcon from "../SVG/SpotifyIcon";
import BackIcon from "../SVG/BackIcon";
import FilledFavoriteIcon from "../SVG/FilledFavoriteIcon";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSong } from "../../contexts/SongContext";

const clientId = "99c16ea4";

function PlaylistPage({ title }) {
  const LIKEDSONGS = process.env.PUBLIC_URL + "/images/LIKEDSONGS.jpeg";

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTracks = async (albumId) => {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&album_id=${albumId}`
    );
    const data = await response.json();
    return data.results;
  };

  const { id, songId } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const { error } = useSongApi();

  const { likedPlaylists, setLikedPlaylists } = useLikedPlaylists();

  const { song, setSong } = useSong();

  const [isLiked, setIsLiked] = useState(
    likedPlaylists.some((songPrev) => songPrev.id === id)
  );

 

  const handleSongStatusChange = () => {
    if (!songId) {
      navigate(`/playlist/${id}/song/${tracks[0].id}`);
      setSong({
        ...tracks[0],
        isPlaying: true,
      });
    } else {
      setSong((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    }
  };

  const handleOnLike = () => {
    if (!isLiked) setLikedPlaylists((prev) => [...prev, id]);
    else {
      setLikedPlaylists((prev) => prev.filter((album) => album !== id));
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await fetchTracks(id);
      if (songId) {
        const song = tracks.find((e) => e.id === songId);
        if (song) {
          setSong({
            ...song,
            isPlaying: true,
          });
        }
      }

      setTracks(tracks);
      setLoading(false);
    };

    if (Number(id) !== 0) {
      setLoading(true);
      fetchData();
    }

    return () => {};
  }, [location.search,id, setSong, songId]);

  const songItemSkeleton = () => {
    return (
      <div className="playlist-song-item">
        <Skeleton
          className="song-order"
          baseColor="#2b2b2b"
          highlightColor="#3b3b3b"
          height={30}
          width={20}
        />
        <div className="song-exp">
          <div className="song-title">
            <Skeleton
              baseColor="#2b2b2b"
              highlightColor="#3b3b3b"
              height={30}
              width={510}
            />
          </div>
          <div className="singer">
            <Skeleton
              baseColor="#2b2b2b"
              highlightColor="#3b3b3b"
              height={20}
              width={510}
            />
          </div>
        </div>
      </div>
    );
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="playlistpage-container">
      <div className="playlistpage-exp-container">
        <div className="playlistpage-box">
          <div className="playlist-header">
            <BackIcon onClick={() => navigate(-1)} />
          </div>
          <div className="playlist-img">
            {!loading ? (
              <img
                src={
                  Number(id) !== 0
                    ? tracks && tracks[0] && tracks[0].album_image
                    : LIKEDSONGS
                }
                alt={title}
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

          <div className="playlist-exp">
            <h1>
              {!loading ? (
                Number(id) !== 0 ? (
                  tracks && tracks[0] && tracks[0].album_name
                ) : (
                  "Beğenilen Şarkılar"
                )
              ) : (
                <Skeleton
                  baseColor="#2b2b2b"
                  highlightColor="#3b3b3b"
                  height={38}
                  width={470}
                />
              )}
            </h1>
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
            {!song.isPlaying ? (
              <FilledPlayIcon
                onClick={handleSongStatusChange}
                color="#1ED760"
              />
            ) : (
              <FilledPauseIcon
                onClick={handleSongStatusChange}
                color="#1ED760"
              />
            )}
          </div>
        </div>
      </div>
      <div className="playlist-songs">
        {!loading
          ? tracks.map((track, index) => (
              <PlaylistSong key={track.id} order={index + 1} song={track} />
            ))
          : [...Array(10)].map(() => {
              return songItemSkeleton();
            })}
      </div>
    </div>
  );
}

export default PlaylistPage;
