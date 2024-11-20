import React from "react";
import FilterItem from "../FilterItem/FilterItem";
import "./Filters.css";

function Filters() {
  return (
    <div className="filters-container">
      <FilterItem filterName={"Top"}></FilterItem>
      <FilterItem filterName={"Artist"}></FilterItem>
      <FilterItem filterName={"Playlists"}></FilterItem>
      <FilterItem filterName={"Albums"}></FilterItem>
      <FilterItem filterName={"Playlists"}></FilterItem>
      <FilterItem filterName={"Playlists"}></FilterItem>
    </div>
  );
}

export default Filters;
