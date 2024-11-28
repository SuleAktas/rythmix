import React, { createContext, useState, useContext } from "react";

const LikedPlaylistContext = createContext();

export const LikedPlaylistProvider = ({ children }) => {
  const [likedPlaylists, setLikedPlaylists] = useState([]);

  return (
    <LikedPlaylistContext.Provider
      value={{ likedPlaylists, setLikedPlaylists }}
    >
      {children}
    </LikedPlaylistContext.Provider>
  );
};

export const useLikedPlaylists = () => {
  return useContext(LikedPlaylistContext);
};
