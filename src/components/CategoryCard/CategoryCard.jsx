import React, { useState } from "react";
import "./CategoryCard.css";

function CategoryCard({ title }) {
  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };
  const [bgColor] = useState(getRandomColor());

  return (
    <div className="category" style={{ backgroundColor: bgColor }}>






      <div className="category-title">{title}</div>
    </div>
  );
}

export default CategoryCard;
