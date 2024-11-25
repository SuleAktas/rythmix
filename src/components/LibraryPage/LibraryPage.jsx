import React from "react";
import PlaylistSong from "../PlaylistPage/components/PlaylistSong/PlaylistSong";
import LibraryHeader from "./components/LibraryHeader/LibraryHeader";
import "./LibraryPage.css";

function LibraryPage() {
  const LIKEDSONGS = process.env.PUBLIC_URL + "/images/LIKEDSONGS.jpeg";
  return (
    <div className="library-container">
      <LibraryHeader></LibraryHeader>
      <PlaylistSong
        img={LIKEDSONGS}
        name="Beğenilen Şarkılar"
        singer="Çalma Listesi"
      />
    </div>
  );
}

export default LibraryPage;
