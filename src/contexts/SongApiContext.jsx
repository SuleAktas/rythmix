import React, { createContext, useContext, useState, useEffect } from "react";

const SongApiContext = createContext();

const clientId = "99c16ea4";

export const SongApiProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTracks = async (tags = "rock") => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&limit=10&tags=${tags}`
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

  useEffect(() => {
    fetchTracks();
    fetchAlbums();
  }, []);

  return (
    <SongApiContext.Provider
      value={{
        tracks,
        albums,
        loading,
        error,
        setTracks,
        fetchTracks,
        fetchAlbums,
      }}
    >
      {children}
    </SongApiContext.Provider>
  );
};

export const useSongApi = () => useContext(SongApiContext);
