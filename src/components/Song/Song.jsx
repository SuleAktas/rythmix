import React, { useEffect, useState } from 'react';
import './Song.css';
import { useSong } from '../../contexts/SongContext';
import { FastAverageColor } from 'fast-average-color';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import FavoriteIcon from '../SVG/FavoriteIcon';
import FilledFavoriteIcon from '../SVG/FilledFavoriteIcon';
import DevicesIcon from '../SVG/DevicesIcon';
import ShareIcon from '../SVG/ShareIcon';
import FilledPlayIcon from '../SVG/FilledPlayIcon';
import FilledPauseIcon from '../SVG/FilledPauseIcon';
import SkipNextIcon from '../SVG/SkipNextIcon';
import SkipPreviousIcon from '../SVG/SkipPreviousIcon';
import DownIcon from '../SVG/DownIcon';
import MoreIcon from '../SVG/MoreIcon';
import ShuffleIcon from '../SVG/ShuffleIcon';
import ReplayIcon from '../SVG/ReplayIcon';
import { usePlaying } from '../../contexts/PlayContext';
import { isLikedSong, likeSong, unlikeSong } from '../../services/api';

function Song({ onClose, audioRef }) {
	const { song } = useSong();
	const { isPlaying, setIsPlaying } = usePlaying();

	const [isVisible, setIsVisible] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [backgroundColor, setBackgroundColor] = useState('');
	const [songDuration, setSongDuration] = useState(0);
	const [songPastTime, setSongPastTime] = useState(0);
	const [songRemainingTime, setSongRemainingTime] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await isLikedSong(song.id);

				setIsLiked(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [song.id]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
		}
	}, []);

	useEffect(() => {
		if (audioRef.current) {
			isPlaying ? audioRef.current.play() : audioRef.current.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		const fac = new FastAverageColor();
		fac
			.getColorAsync(song.imageUrl)
			.then(color => {
				setBackgroundColor(mixWithBlack(color.hex));
			})
			.catch(console.error);
	}, [song.imageUrl]);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		setSongDuration(song.duration);
		setSongRemainingTime(song.duration);
	}, [song.duration]);

	useEffect(() => {
		if (audioRef.current) {
			const updateMetadata = () =>
				setSongDuration(audioRef.current.duration || 0);
			const updateTime = () => {
				const current = audioRef.current.currentTime;
				setSongPastTime(current);
				setSongRemainingTime(audioRef.current.duration - current);
			};

			audioRef.current.addEventListener('loadedmetadata', updateMetadata);
			audioRef.current.addEventListener('timeupdate', updateTime);

			return () => {
				audioRef.current.removeEventListener('loadedmetadata', updateMetadata);
				audioRef.current.removeEventListener('timeupdate', updateTime);
			};
		}
	}, [audioRef]);

	useEffect(() => {
		const progress = (songPastTime / songDuration) * 100;
		document
			.querySelector('.custom-range')
			?.style.setProperty('--progress-percentage', `${progress}%`);
	}, [songPastTime, songDuration]);

	const mixWithBlack = (hex, ratio = 0.5) => {
		const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - ratio));
		const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - ratio));
		const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - ratio));
		return `rgb(${r}, ${g}, ${b})`;
	};

	const handleLike = async () => {
		setIsLiked(!isLiked);
		try {
			if (isLiked) {
				await unlikeSong(song.id);
			} else {
				await likeSong(song.id);
			}
		} catch (error) {
			setIsLiked(isLiked);
		}
	};

	const handleSeek = e => {
		const newTime = Number(e.target.value);
		setSongPastTime(newTime);
		setSongRemainingTime(songDuration - newTime);
		if (audioRef.current) audioRef.current.currentTime = newTime;
	};

	const formatTime = seconds => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(onClose, 100);
	};

	const togglePlay = () => {
		if (audioRef.current) {
			isPlaying ? audioRef.current.pause() : audioRef.current.play();
		}
		setIsPlaying(prev => !prev);
	};

	if (!song) return null;

	return (
		<div
			className={`song-container ${isVisible ? 'slide-up' : ''}`}
			style={{ backgroundColor }}
		>
			<div className="song-header">
				<div className="song-down-icon" onClick={handleClose}>
					<DownIcon />
				</div>
				<div className="song-title">{song.singerName}</div>
				<div className="song-more">
					<MoreIcon />
				</div>
			</div>

			<div className="song-image">
				{song.imageUrl ? (
					<img src={song.imageUrl} alt={song.singerName} />
				) : (
					<Skeleton
						baseColor="#2b2b2b"
						highlightColor="#3b3b3b"
						height={200}
						width={200}
					/>
				)}
			</div>

			<div className="song-about">
				<div className="song-name">{song.name}</div>
				<div className="song-singer">{song.singerName}</div>
				<div className="song-like">
					{isLiked ? (
						<FilledFavoriteIcon onClick={handleLike} />
					) : (
						<FavoriteIcon onClick={handleLike} />
					)}
				</div>
			</div>

			<div className="song-progress-bar">
				<input
					type="range"
					min="0"
					max={songDuration}
					value={songPastTime}
					onChange={handleSeek}
					className="custom-range w-full"
				/>
			</div>

			<div className="song-time">
				<div className="song-past-time">{formatTime(songPastTime)}</div>
				<div className="song-remain-time">{formatTime(songRemainingTime)}</div>
			</div>

			<div className="song-actions">
				<ShuffleIcon />
				<SkipPreviousIcon />
				{isPlaying ? (
					<FilledPauseIcon onClick={togglePlay} color="white" />
				) : (
					<FilledPlayIcon onClick={togglePlay} color="white" />
				)}
				<SkipNextIcon />
				<ReplayIcon />
			</div>

			<div className="song-actions-more">
				<DevicesIcon />
				<ShareIcon />
			</div>
		</div>
	);
}

export default Song;
