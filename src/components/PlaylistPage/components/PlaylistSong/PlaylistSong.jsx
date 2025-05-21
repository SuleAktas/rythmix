import React from 'react';
import './PlaylistSong.css';
import { useSong } from '../../../../contexts/SongContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PlaylistAddIcon from '../../../SVG/PlaylistAddIcon';
import PlaylistCheckedIcon from '../../../SVG/PlaylistCheckedIcon';
import { usePlaying } from '../../../../contexts/PlayContext';

function PlaylistSong({ order, song, onToggleLike, playlist }) {
	const location = useLocation();

	const navigate = useNavigate();

	const { setSong } = useSong();
	const { setIsPlaying } = usePlaying();

	const { id } = useParams();

	const handlePlaySong = () => {
		if (location.pathname !== '/library') {
			setIsPlaying(true);
			setSong({ ...song });
			if (id) navigate(`/playlist/${id}/song/${song.id}`);
		} else {
			navigate(`/playlist/${playlist.id}`);
		}
	};

	return (
		song && (
			<div className="playlist-song-item" onClick={handlePlaySong}>
				{order && <div className="song-order">{order}</div>}
				{song.imageUrl && !location.pathname.startsWith('/playlist') && (
					<img className="song-order" src={song.imageUrl} alt={song.name}></img>
				)}

				<div className="song-exp">
					<span className="song-title">{song.name}</span>
					<span className="singer">
						{song.singerName ? song.singerName : song.singer.name}
					</span>
				</div>
				{location.pathname !== '/library' && (
					<div className="actions">
						{song.isLiked ? (
							<PlaylistCheckedIcon
								style={{ color: '#1ED760', cursor: 'pointer' }}
								onClick={e => {
									e.stopPropagation();
									onToggleLike(song.id);
								}}
							/>
						) : (
							<PlaylistAddIcon
								onClick={e => {
									e.stopPropagation();
									onToggleLike(song.id);
								}}
							/>
						)}
					</div>
				)}
			</div>
		)
	);
}

export default PlaylistSong;
