import React from 'react';
import './Slider.css';
import Card from '../Card/Card';
import { useEffect } from 'react';
import client from '../../services/client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';

function Slider({ title }) {
	const [albums, setAlbums] = useState([]);

	const cardSkeleton = () => {
		return (
			<div>
				<Skeleton
					baseColor="#2b2b2b"
					highlightColor="#3b3b3b"
					height={152}
					width={152}
				/>
				<br />
				<Skeleton
					baseColor="#2b2b2b"
					highlightColor="#3b3b3b"
					height={20}
					width={152}
				/>
			</div>
		);
	};

	useEffect(() => {
		client(`${import.meta.env.VITE_BACKEND_URL}playlist`).then(response => {
			if (response.status === 'Success') {
				setAlbums(response.data);
			} else {
				console.error('Album cannot be found!');
			}
		});
	}, [setAlbums]);

	return (
		<div className="slider">
			<div className="slider-title">{title}</div>
			<div className="slider-container">
				{albums?.length !== 0
					? albums.map((album, index) => <Card key={index} album={album} />)
					: [...Array(10)].map(() => {
							return cardSkeleton();
					  })}
			</div>
		</div>
	);
}

export default Slider;
