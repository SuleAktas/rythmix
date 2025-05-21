import React from 'react';
import { PlayProvider } from '../contexts/PlayContext';
import { SongProvider } from '../contexts/SongContext';

export const AppProvider = ({ children }) => {
	return (
		<PlayProvider>
			<SongProvider>{children}</SongProvider>
		</PlayProvider>
	);
};
