import client from './client';

export const getSongsByPlaylistId = (playlistId, userId) => {
	return client(`/api/playlists/${playlistId}?userId=${userId}`);
};

export const likeSong = songId => {
	return client(`${import.meta.env.VITE_BACKEND_URL}user/likeSong/${songId}`, {
		method: 'PUT',
	});
};

export const unlikeSong = songId => {
	return client(
		`${import.meta.env.VITE_BACKEND_URL}user/removeSong/${songId}`,
		{
			method: 'PUT',
		}
	);
};

export const likePlaylist = playlistId => {
	return client(
		`${import.meta.env.VITE_BACKEND_URL}user/likePlaylist/${playlistId}`,
		{
			method: 'PUT',
		}
	);
};

export const unlikePlaylist = playlistId => {
	return client(
		`${import.meta.env.VITE_BACKEND_URL}user/removePlaylist/${playlistId}`,
		{
			method: 'PUT',
		}
	);
};
export const isLikedSong = id => {
	return client(`${import.meta.env.VITE_BACKEND_URL}user/likedSong/${id}`, {
		method: 'GET',
	});
};
