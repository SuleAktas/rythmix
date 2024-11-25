import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./PlaylistSong.css";
import { useSong } from "../../../../contexts/SongContext";
import AboutSong from "../AboutSong/AboutSong";

function PlaylistSong({ order, title, singer, img }) {
  const { setSong } = useSong();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handlePlaySong = () => {
    setSong({ name: title, singer: singer });
  };

  const handleMoreClick = () => {
    setIsMoreOpen((prev) => !prev);
  };

  return (
    <div className="playlist-song-item" onClick={handlePlaySong}>
      {order && <div className="song-order">{order}</div>}
      {img && <img className="song-order" src={img} alt={title}></img>}

      <div className="song-exp">
        <span className="song-title">{title}</span>
        <span className="singer">{singer}</span>
      </div>
      <div className="actions">
        <MoreVertIcon onClick={handleMoreClick} />
      </div>

      <AboutSong isOpen={isMoreOpen} name={title} singer={singer} img={img} />
    </div>
  );
}

export default PlaylistSong;
