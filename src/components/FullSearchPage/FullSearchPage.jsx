import React from "react";
import PlaylistSong from "../PlaylistPage/components/PlaylistSong/PlaylistSong";
import Filters from "../SearchPage/components/Filters/Filters";
import SearchInput from "../SearchPage/components/SearchInput/SearchInput";
import "./FullSearchPage.css";

function FullSearchPage({ onClose }) {
  const BACKICON = process.env.PUBLIC_URL + "/images/BACKICON.png";
  const SCIENTIST = process.env.PUBLIC_URL + "/images/SCIENTIST.png";

  const songs = [
    { img: SCIENTIST, name: "Hymn For The Weekend", singer: "Coldplay" },
    { img: SCIENTIST, name: "Paradise", singer: "Coldplay" },
    { img: SCIENTIST, name: "Fix You", singer: "Coldplay" },
    { img: SCIENTIST, name: "Yellow", singer: "Coldplay" },
    { img: SCIENTIST, name: "Clocks", singer: "Coldplay" },
    { img: SCIENTIST, name: "My Universe", singer: "Coldplay" },
    { img: SCIENTIST, name: "Hymn For The Weekend", singer: "Coldplay" },
    { img: SCIENTIST, name: "Clocks", singer: "Coldplay" },
    { img: SCIENTIST, name: "My Universe", singer: "Coldplay" },
    { img: SCIENTIST, name: "Hymn For The Weekend", singer: "Coldplay" },
  ];

  return (
    <div className="full-search-container">
      <div className="search-header">
        <img
          className="back-icon"
          src={BACKICON}
          alt={"backicon"}
          onClick={onClose}
        ></img>
        <SearchInput fullPage={true}></SearchInput>
      </div>
      <div className="filters">
        <Filters></Filters>
      </div>
      <div className="filtered-songs">
        {songs.map((song) => {
          return (
            <PlaylistSong
              img={song.img}
              title={song.name}
              singer={song.singer}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FullSearchPage;
