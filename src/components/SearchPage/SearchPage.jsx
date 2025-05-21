import React from 'react';
import { useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import SearchInput from './components/SearchInput/SearchInput';
import BackIcon from '../SVG/BackIcon';
import Filters from '../SearchPage/components/Filters/Filters';

import './SearchPage.css';
import PlaylistSong from '../PlaylistPage/components/PlaylistSong/PlaylistSong';

function SearchPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [searchResults, setSearchResults] = useState(null);
	const [tracks, setTracks] = useState([]);
	const fetchData = async query => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}song/search?filter=${query}`
			);
			const data = await response.json();
			setTracks(data);
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			return [];
		}
	};
	const handleOnBack = () => {
		// setIsFullPageComponentVisible(false);
	};
	const handleOnSearchClick = () => {
		setIsVisible(true);
	};
	return (
		<div className="search">
			<h2>Search</h2>
			<div className="display-flex">
				{isVisible && <BackIcon className="back-icon" onClick={handleOnBack} />}
				<SearchInput
					fetchData={fetchData}
					handleOnSearchClick={handleOnSearchClick}
				/>
			</div>
			{!isVisible && (
				<div>
					<h3>Browse all</h3>
					<div className="category-list">
						<CategoryCard title={'Podcasts'} />
						<CategoryCard title={'Made For You'} />
						<CategoryCard title={'Charts'} />
						<CategoryCard title={'New Releases'} />
						<CategoryCard title={'Discover'} />
						<CategoryCard title={'Live Events'} />
						<CategoryCard title={'Pop'} />
					</div>
				</div>
			)}

			{isVisible && (
				<div>
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
			)}
		</div>
	);
}

export default SearchPage;
