import React, { createContext, useState, useContext } from "react";

const LikedSongContext = createContext();

export const LikedSongProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  return (
    <LikedSongContext.Provider value={{ likedSongs, setLikedSongs }}>
      {children}
    </LikedSongContext.Provider>
  );
};

export const useLikedSongs = () => {
  return useContext(LikedSongContext);
};
