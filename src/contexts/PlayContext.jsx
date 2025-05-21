import React, { createContext, useState, useContext } from 'react';

const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
			{children}
		</PlayContext.Provider>
	);
};

export const usePlaying = () => {
	return useContext(PlayContext);
};
