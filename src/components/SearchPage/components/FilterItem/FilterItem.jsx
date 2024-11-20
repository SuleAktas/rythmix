import React from "react";
import { useState } from "react";
import "./FilterItem.css";

function FilterItem({ filterName }) {
  const [selected, setSelected] = useState(false);

  const onSelectFilter = () => {
    setSelected(!selected);
  };

  return (
    <div
      className={`filter-box ${selected ? "selected" : ""}`}
      onClick={onSelectFilter}
    >
      {filterName}
    </div>
  );
}

export default FilterItem;
