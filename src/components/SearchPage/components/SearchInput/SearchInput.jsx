import React from 'react';
import { useState } from 'react';

import './SearchInput.css';
import SearchIcon from '../../../SVG/TabIcons/SearchIcon';

function SearchInput({ fullPage = false, fetchData, handleOnSearchClick }) {
	const [isFullPageComponentVisible, setIsFullPageComponentVisible] =
		useState(false);
	const [searchResults, setSearchResults] = useState(null);

	const handleSearchClick = () => {
		// if (!fullPage) setIsFullPageComponentVisible(true);
	};
	const handleClose = () => {
		setIsFullPageComponentVisible(false);
	};
	const handleInputChange = async e => {
		const query = e.target.value;
		if (query) {
			try {
				const results = await fetchData(query);
				setSearchResults(results);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		} else {
			setSearchResults(null);
		}
	};

	return (
		<div className="search-input">
			<SearchIcon />
			<input
				className="input"
				placeholder="What do you wanna listen to?"
				onClick={handleOnSearchClick}
				onChange={e => {
					handleInputChange(e);
				}}
			/>
		</div>
	);
}

export default SearchInput;
