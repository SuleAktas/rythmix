import React from "react";
import PlaylistSong from "./components/PlaylistSong/PlaylistSong";
import "./PlaylistPage.css";

function PlaylistPage({ title, exp }) {
  const DAILYMIX4 = process.env.PUBLIC_URL + "/images/DAILYMIX4.png";
  const SPOTIFYLOGO = process.env.PUBLIC_URL + "/images/SPOTIFYLOGO.png";
  const BACKICON = process.env.PUBLIC_URL + "/images/BACKICON.png";
  const HEARTICON = process.env.PUBLIC_URL + "/images/HEARTICON.png";
  const DETAILSICON = process.env.PUBLIC_URL + "/images/DETAILSICON.png";
  const SHAREICON = process.env.PUBLIC_URL + "/images/SHAREICON.png";
  const PLAYICON = process.env.PUBLIC_URL + "/images/PLAYICON.png";

  return (
    <div className="playlistpage-container">
      <div className="playlistpage-exp-container">
        <div className="playlistpage-box">
          <div className="playlist-header">
            <img src={BACKICON} alt={title}></img>
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
            <img src={PLAYICON} alt={title}></img>
          </div>
        </div>
      </div>
      <div className="playlist-songs">
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
      </div>
    </div>
  );
}

export default PlaylistPage;
