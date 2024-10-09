import React from "react";
import "./PlaylistPage.css";

function PlaylistPage({ title, exp }) {
  const DAILYMIX4 = process.env.PUBLIC_URL + "/images/DAILYMIX4.png";
  const SPOTIFYLOGO = process.env.PUBLIC_URL + "/images/SPOTIFYLOGO.png";
  return (
    <div className="playlistpage-container">
      <div className="playlistpage-exp-container">
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
    </div>
  );
}

export default PlaylistPage;
