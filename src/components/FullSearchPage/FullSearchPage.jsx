import React from "react";
import { useEffect } from "react";
import { useSongApi } from "../../contexts/SongApiContext";
import PlaylistSong from "../PlaylistPage/components/PlaylistSong/PlaylistSong";
import Filters from "../SearchPage/components/Filters/Filters";
import SearchInput from "../SearchPage/components/SearchInput/SearchInput";
import BackIcon from "../SVG/BackIcon";
import "./FullSearchPage.css";

function FullSearchPage({ onClose }) {
  const { tracks, fetchAllTracks } = useSongApi();

  useEffect(() => {
    fetchAllTracks();
  }, []);
  return (
    <div className="full-search-container">
      <div className="search-header">
        <BackIcon className="back-icon" onClick={onClose} />
        <SearchInput fullPage={true}></SearchInput>
      </div>
      <div className="filters">
        <Filters></Filters>
      </div>
      <div className="filtered-songs">
        {tracks &&
          tracks.map((song) => {
            return <PlaylistSong song={song} />;
          })}
      </div>
    </div>
  );
}

export default FullSearchPage;
