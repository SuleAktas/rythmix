// client.js
const client = async (url, options = {}) => {
	try {
		const response = await fetch(url, {
			method: options.method || 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(options.headers || {}),
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Something went wrong');
		}

		return {
			status: 'Success',
			data,
		};
	} catch (err) {
		return {
			status: 'Error',
			message: err.message || err.toString(),
		};
	}
};

export default client;
