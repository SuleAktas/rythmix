import React from "react";
import { LikedPlaylistProvider } from "../contexts/LikedPlaylistContext";
import { LikedSongProvider } from "../contexts/LikedSongContext";
import { PlaylistProvider } from "../contexts/PlaylistContext";
import { SongApiProvider } from "../contexts/SongApiContext";
import { SongProvider } from "../contexts/SongContext";

export const AppProvider = ({ children }) => {
  return (
    <SongApiProvider>
      <PlaylistProvider>
        <LikedPlaylistProvider>
          <LikedSongProvider>
            <SongProvider>{children}</SongProvider>
          </LikedSongProvider>
        </LikedPlaylistProvider>
      </PlaylistProvider>
    </SongApiProvider>
  );
};
