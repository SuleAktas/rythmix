import React from "react";
import { useLikedPlaylists } from "../../contexts/LikedPlaylistContext";
import PlaylistSong from "../PlaylistPage/components/PlaylistSong/PlaylistSong";
import LibraryHeader from "./components/LibraryHeader/LibraryHeader";
import "./LibraryPage.css";

function LibraryPage() {
  const LIKEDSONGS = process.env.PUBLIC_URL + "/images/LIKEDSONGS.jpeg";
  const { likedPlaylists } = useLikedPlaylists();

  const likedSongPlaylist = {
    album_image: LIKEDSONGS,
    name: "Beğenilen Şarkılar",
    artist_name: "Çalma Listesi",
  };
  return (
    <div className="library-container">
      <LibraryHeader></LibraryHeader>
      <PlaylistSong song={likedSongPlaylist} />
      {likedPlaylists.length > 0 &&
        likedPlaylists.map((playlist) => <PlaylistSong song={playlist} />)}
    </div>
  );
}

export default LibraryPage;
