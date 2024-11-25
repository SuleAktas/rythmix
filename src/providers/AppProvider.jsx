import React from "react";
import { LikedSongProvider } from "../contexts/LikedSongContext";
import { SongApiProvider } from "../contexts/SongApiContext";
import { SongProvider } from "../contexts/SongContext";

export const AppProvider = ({ children }) => {
  return (
    <SongApiProvider>
      <LikedSongProvider>
        <SongProvider>{children}</SongProvider>
      </LikedSongProvider>
    </SongApiProvider>
  );
};
