import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ img, title }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/playlist", { state: { from: window.location.pathname } });
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="box">
        <img src={img} alt={title}></img>
      </div>
      <div className="box-title">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Card;
