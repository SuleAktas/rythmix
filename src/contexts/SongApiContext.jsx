import React, { createContext, useContext, useState, useEffect } from "react";

const SongApiContext = createContext();

const clientId = "99c16ea4";

export const SongApiProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTracks = async (tags = "rock") => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&limit=10&tags=${tags}`
      );
      debugger;
      const data = await response.json();
      debugger;
      setTracks(data.results);
    } catch (err) {
      setError("Error fetching tracks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <SongApiContext.Provider value={{ tracks, loading, error, fetchTracks }}>
      {children}
    </SongApiContext.Provider>
  );
};

export const useSongApi = () => useContext(SongApiContext);
