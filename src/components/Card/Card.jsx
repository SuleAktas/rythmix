import React from "react";
import "./Card.css";

function Card({ img, title }) {
  return (
    <div className="card">
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
