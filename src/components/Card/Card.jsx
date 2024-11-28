import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ album }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/playlist`, {
      state: { data: album, from: window.location.pathname },
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
