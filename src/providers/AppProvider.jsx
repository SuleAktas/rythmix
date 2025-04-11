import React from 'react';
import { LikedPlaylistProvider } from '../contexts/LikedPlaylistContext';
import { LikedSongProvider } from '../contexts/LikedSongContext';
import { PlaylistProvider } from '../contexts/PlaylistContext';
import { SongProvider } from '../contexts/SongContext';

export const AppProvider = ({ children }) => {
	return (
		<PlaylistProvider>
			<LikedPlaylistProvider>
				<LikedSongProvider>
					<SongProvider>{children}</SongProvider>
				</LikedSongProvider>
			</LikedPlaylistProvider>
		</PlaylistProvider>
	);
};
