import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import SearchInput from "./components/SearchInput/SearchInput";
import "./SearchPage.css";

function SearchPage() {
  return (
    <div className="search">
      <h2>Search</h2>
      <SearchInput />
      <div className="category-list">
        <CategoryCard title={"Podcasts"} />
        <CategoryCard title={"Made For You"} />
        <CategoryCard title={"Charts"} />
        <CategoryCard title={"New Releases"} />
        <CategoryCard title={"Discover"} />
        <CategoryCard title={"Live Events"} />
        <CategoryCard title={"Pop"} />
      </div>
    </div>
  );
}

export default SearchPage;
