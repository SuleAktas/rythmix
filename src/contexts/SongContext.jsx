import React, { createContext, useState, useContext } from "react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    name: "",
    singer: "",
  });

  return (
    <SongContext.Provider value={{ song, setSong }}>
      {children}
    </SongContext.Provider>
  );
};

// Custom hook to use the context
export const useSong = () => {
  return useContext(SongContext);
};
