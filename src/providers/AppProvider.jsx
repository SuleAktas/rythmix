import React from "react";
import { LikedSongProvider } from "../contexts/LikedSongContext";
import { SongProvider } from "../contexts/SongContext";

export const AppProvider = ({ children }) => {
  return (
    <LikedSongProvider>
      <SongProvider>{children}</SongProvider>
    </LikedSongProvider>
  );
};
