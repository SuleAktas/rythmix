import React from "react";
import "./FooterItem.css";

function FooterItem({ img, title, onClick }) {
  return (
    <div className="footer-item" onClick={onClick}>
      <img src={img} alt={title}></img>
      <div className="icon-title">{title}</div>
    </div>
  );
}

export default FooterItem;
