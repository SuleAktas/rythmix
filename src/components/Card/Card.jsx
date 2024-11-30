import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../contexts/PlaylistContext";
import "./Card.css";

function Card({ album }) {
  const navigate = useNavigate();
  const { setPlaylist } = usePlaylist();

  const handleCardClick = () => {
    debugger;
    setPlaylist(album);

    navigate(`/playlist`, {
      state: { from: window.location.pathname },
    });
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="box">
        <img src={album.image} alt={album.name}></img>
      </div>
      <div className="box-title">
        <p>{album.name}</p>
      </div>
    </div>
  );
}

export default Card;
