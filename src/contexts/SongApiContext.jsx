import React, { createContext, useContext, useState } from "react";

const SongApiContext = createContext();

const clientId = "99c16ea4";

export const SongApiProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTracks = async (albumId) => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&album_id=${albumId}`
      );
      const data = await response.json();
      setTracks(data.results);
    } catch (err) {
      setError("Error fetching tracks");
    } finally {
      setLoading(false);
    }
  };
  const fetchAllTracks = async () => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&tags=rock`
      );
      const data = await response.json();
      setTracks(data.results);
    } catch (err) {
      setError("Error fetching tracks");
    } finally {
      setLoading(false);
    }
  };
  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/albums/?client_id=${clientId}`
      );
      const data = await response.json();
      setAlbums(data.results);
    } catch (err) {
      setError("Error fetching tracks");
    } finally {
      setLoading(false);
    }
  };
  const fetchTrackDetails = async (songId) => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&id=${songId}`
      );
      const data = await response.json();
      setSong(data.results[0]);
    } catch (err) {
      setError("Error fetching tracks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SongApiContext.Provider
      value={{
        song,
        tracks,
        albums,
        loading,
        error,
        setSong,
        setTracks,
        fetchTracks,
        fetchAllTracks,
        fetchAlbums,
        fetchTrackDetails,
      }}
    >
      {children}
    </SongApiContext.Provider>
  );
};

export const useSongApi = () => useContext(SongApiContext);
