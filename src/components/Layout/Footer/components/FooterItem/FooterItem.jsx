import React from "react";
import "./FooterItem.css";

function FooterItem({ icon, title, onClick }) {
  return (
    <div className="footer-item" onClick={onClick}>
      {icon}
      <div className="icon-title">{title}</div>
    </div>
  );
}

export default FooterItem;
