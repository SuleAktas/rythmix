import React, { useState } from 'react';
import { useEffect } from 'react';
import client from '../../services/client';
import PlaylistSong from '../PlaylistPage/components/PlaylistSong/PlaylistSong';
import LibraryHeader from './components/LibraryHeader/LibraryHeader';
import './LibraryPage.css';

function LibraryPage() {
	const [likedPlaylists, setLikedPlaylists] = useState([]);

	useEffect(() => {
		client(`${import.meta.env.VITE_BACKEND_URL}user/likedPlaylists`).then(
			response => {
				if (response.status === 'Success') {
					setLikedPlaylists(response.data);
				} else {
					console.error('Album cannot be found!');
				}
			}
		);
	}, [setLikedPlaylists]);

	return (
		<div className="library-container">
			<LibraryHeader></LibraryHeader>

			{likedPlaylists.length > 0 &&
				likedPlaylists.map(playlist => (
					<PlaylistSong song={playlist} playlist={playlist} />
				))}
		</div>
	);
}

export default LibraryPage;
