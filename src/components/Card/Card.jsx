import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ album }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("id", album.id);

    navigate({
      pathname: "/playlist",
      search: searchParams.toString(),
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
