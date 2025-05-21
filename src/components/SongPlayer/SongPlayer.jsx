import React from 'react';
import './SongPlayer.css';
import { useSong } from '../../contexts/SongContext';
import PlayIcon from '../SVG/PlayIcon';
import FavoriteIcon from '../SVG/FavoriteIcon';
import FilledFavoriteIcon from '../SVG/FilledFavoriteIcon';
import { useState } from 'react';
import { useEffect } from 'react';
import PauseIcon from '../SVG/PauseIcon';
import { useRef } from 'react';
import Song from '../Song/Song';
import { usePlaying } from '../../contexts/PlayContext';
import { likeSong, unlikeSong } from '../../services/api';

function SongPlayer() {
	const { song } = useSong();
	const { isPlaying, setIsPlaying } = usePlaying();
	const [isLiked, setIsLiked] = useState(song.isLiked);
	const audioRef = useRef(null);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => setIsModalOpen(false);

	const handleLike = async e => {
		e.stopPropagation();

		// if (!song.isLiked) setLikedSongs(prev => [...prev, song]);
		// else
		// 	setLikedSongs(prev => prev.filter(prevSong => prevSong.id !== song.id));
		// setIsLiked(prev => !prev);

		setIsLiked(!isLiked);
		try {
			if (isLiked) {
				await unlikeSong(song.id);
			} else {
				await likeSong(song.id);
			}
		} catch {
			setIsLiked(isLiked);
		}
	};

	const handlePlay = e => {
		e.stopPropagation();
		setIsPlaying(prev => !prev);
	};

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch(err => {
					if (err.name !== 'AbortError') {
						console.error('Audio play error:', err);
					}
				});
			}
		} else {
			audio.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch(err => {
					if (err.name !== 'AbortError') {
						console.error('Audio play error:', err);
					}
				});
			}
		}
	}, [song]);

	useEffect(() => {
		setIsLiked(song.isLiked ? song.isLiked : false);
	}, [song.id]);

	return (
		song.name && (
			<div
				className="song-player-container"
				onClick={() => setIsModalOpen(true)}
			>
				{isModalOpen && <Song onClose={closeModal} audioRef={audioRef} />}

				<div className="song-player-exp-box">
					<div className="song-player-image-box">
						<img
							className="song-player-image"
							src={song.imageUrl}
							alt={song.name}
						></img>
					</div>
					<div className="song-player-about">
						<div className="song-player-name">{song.name} </div>
						<div className="song-player-singer">{song.singerName}</div>
					</div>
				</div>
				<div className="song-player-actions">
					{isLiked ? (
						<FilledFavoriteIcon onClick={handleLike} />
					) : (
						<FavoriteIcon onClick={handleLike} />
					)}

					{!isPlaying ? (
						<PlayIcon onClick={handlePlay} color="white" />
					) : (
						<PauseIcon onClick={handlePlay} color="white" />
					)}

					<audio ref={audioRef} src={song.audioUrl} preload="auto" />
				</div>
			</div>
		)
	);
}

export default SongPlayer;
