import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PlaylistSong from '../PlaylistPage/components/PlaylistSong/PlaylistSong';
import Filters from '../SearchPage/components/Filters/Filters';
import SearchInput from '../SearchPage/components/SearchInput/SearchInput';
import client from '../../services/client';
import BackIcon from '../SVG/BackIcon';
import './FullSearchPage.css';

function FullSearchPage({ onClose }) {
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		client(
			`https://api.jamendo.com/v3.0/tracks/?client_id=${
				import.meta.env.VITE_JAMENDO_CLIENT_ID
			}&tags=rock`
		).then(response => {
			if (response.status === 'Success') {
				setTracks(response.data);
			} else {
				console.error('Tracks cannot be found!');
			}
		});
	}, [setTracks]);

	return (
		<div className="full-search-container">
			<div className="search-header">
				<BackIcon className="back-icon" onClick={onClose} />
				<SearchInput fullPage={true}></SearchInput>
			</div>
			<div className="filters">
				<Filters></Filters>
			</div>
			<div className="filtered-songs">
				{tracks &&
					tracks.map(track => {
						return <PlaylistSong key={track.id} song={track} />;
					})}
			</div>
		</div>
	);
}

export default FullSearchPage;
