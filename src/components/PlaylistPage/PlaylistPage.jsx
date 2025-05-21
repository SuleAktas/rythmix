import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PlaylistSong from './components/PlaylistSong/PlaylistSong';
import './PlaylistPage.css';
import FilledPlayIcon from '../SVG/FilledPlayIcon';
import FilledPauseIcon from '../SVG/FilledPauseIcon';
import ShareIcon from '../SVG/ShareIcon';
import FavoriteIcon from '../SVG/FavoriteIcon';
import DetailsIcon from '../SVG/DetailsIcon';
import SpotifyIcon from '../SVG/SpotifyIcon';
import BackIcon from '../SVG/BackIcon';
import FilledFavoriteIcon from '../SVG/FilledFavoriteIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSong } from '../../contexts/SongContext';
import { usePlaying } from '../../contexts/PlayContext';
import {
	likePlaylist,
	likeSong,
	unlikePlaylist,
	unlikeSong,
} from '../../services/api';

function PlaylistPage({ title }) {
	const [tracks, setTracks] = useState([]);
	const [playlist, setPlaylist] = useState({});
	const [loading, setLoading] = useState(false);
	const likedPlaylistId = '75c0e9e6-b107-4e0a-8996-5db7b6528361';
	const fetchTracks = async albumId => {
		const url =
			albumId === likedPlaylistId
				? // ? `${import.meta.env.VITE_BACKEND_URL}user/likedSongs`
				  `${import.meta.env.VITE_BACKEND_URL}playlist/${albumId}/songs`
				: `${import.meta.env.VITE_BACKEND_URL}playlist/${albumId}/songs`;

		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

	const { id, songId } = useParams();

	const location = useLocation();

	const navigate = useNavigate();

	const { setSong } = useSong();

	const { isPlaying, setIsPlaying } = usePlaying();

	const handleSongStatusChange = () => {
		if (!songId) {
			navigate(`/playlist/${id}/song/${tracks[0].id}`);
			setSong({
				...tracks[0],
			});
			setIsPlaying(true);
		} else {
			setSong(prev => ({
				...prev,
			}));
			setIsPlaying(prev => !prev);
		}
	};

	const handleOnLike = async () => {
		setPlaylist({ ...playlist, isLiked: !playlist.isLiked });
		try {
			if (playlist.isLiked) {
				await unlikePlaylist(playlist.id);
			} else {
				await likePlaylist(playlist.id);
			}
		} catch {
			setPlaylist({ ...playlist, isLiked: playlist.isLiked });
		}
	};
	const handleToggleLike = async songId => {
		setTracks(prevSongs =>
			prevSongs.map(song =>
				song.id === songId ? { ...song, isLiked: !song.isLiked } : song
			)
		);

		const song = tracks.find(s => s.id === songId);
		try {
			if (song.isLiked) {
				await unlikeSong(songId);
			} else {
				await likeSong(songId);
			}
		} catch (error) {
			setTracks(prevSongs =>
				prevSongs.map(s =>
					s.id === songId ? { ...s, isLiked: song.isLiked } : s
				)
			);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const tracks = await fetchTracks(id);
			if (songId) {
				let song;
				song = tracks.songList.find(e => e.id === songId);

				if (song) {
					setSong({
						...song,
					});
					setIsPlaying(true);
				}
			}
			setPlaylist(tracks);
			setTracks(tracks.songList);
			setLoading(false);
		};

		if (Number(id) !== 0) {
			setLoading(true);
			fetchData();
		}

		return () => {};
	}, [location.search, id, setSong, songId]);

	const songItemSkeleton = () => {
		return (
			<div className="playlist-song-item">
				<Skeleton
					className="song-order"
					baseColor="#2b2b2b"
					highlightColor="#3b3b3b"
					height={30}
					width={20}
				/>
				<div className="song-exp">
					<div className="song-title">
						<Skeleton
							baseColor="#2b2b2b"
							highlightColor="#3b3b3b"
							height={30}
							width={510}
						/>
					</div>
					<div className="singer">
						<Skeleton
							baseColor="#2b2b2b"
							highlightColor="#3b3b3b"
							height={20}
							width={510}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="playlistpage-container">
			<div className="playlistpage-exp-container">
				<div className="playlistpage-box">
					<div className="playlist-header">
						<BackIcon onClick={() => navigate(-1)} />
					</div>
					<div className="playlist-img">
						{!loading ? (
							<img src={playlist.imageUrl} alt={title}></img>
						) : (
							<Skeleton
								baseColor="#2b2b2b"
								highlightColor="#3b3b3b"
								height={200}
								width={200}
							/>
						)}
					</div>

					<div className="playlist-exp">
						<h1>
							{!loading ? (
								playlist.singerName
							) : (
								<Skeleton
									baseColor="#2b2b2b"
									highlightColor="#3b3b3b"
									height={38}
									width={470}
								/>
							)}
						</h1>
						<p>The essential tracks,all in one playlist</p>
						<div className="spotify-exp">
							<SpotifyIcon />
							Spotify
						</div>
						<div className="playlist-length">
							<p>123.12312 likes - 2 hr 9 min</p>
						</div>
					</div>
				</div>
				<div className="playlist-buttons">
					<div className="playlist-actions">
						{playlist.isLiked ? (
							<FilledFavoriteIcon onClick={handleOnLike} />
						) : (
							<FavoriteIcon onClick={handleOnLike} />
						)}
						<ShareIcon />
						<DetailsIcon />
					</div>

					<div className="playlist-play">
						{!isPlaying ? (
							<FilledPlayIcon
								onClick={handleSongStatusChange}
								color="#1ED760"
							/>
						) : (
							<FilledPauseIcon
								onClick={handleSongStatusChange}
								color="#1ED760"
							/>
						)}
					</div>
				</div>
			</div>
			<div className="playlist-songs">
				{!loading
					? tracks.map((track, index) => (
							<PlaylistSong
								key={track.id}
								order={index + 1}
								song={track}
								onToggleLike={handleToggleLike}
							/>
					  ))
					: [...Array(10)].map(() => {
							return songItemSkeleton();
					  })}
			</div>
		</div>
	);
}

export default PlaylistPage;
