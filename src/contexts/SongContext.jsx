import React, { createContext, useState, useContext } from "react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    id: "",
    name: "",
    duration: "",
    artist_id: "",
    artist_name: "",
    album_name: "",
    album_id: "",
    singer: "",
    album_image: "",
    audio: "",
    image: "",
    isPlaying: false,
  });

  return (
    <SongContext.Provider value={{ song, setSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  return useContext(SongContext);
};
