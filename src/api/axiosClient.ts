import axios from "axios";

const axiosClient = axios.create({
	// Vite uses import.meta.env to access .env variables
	baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:5001/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Intercept requests to add the JWT token
axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("jwt_token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default axiosClient;
