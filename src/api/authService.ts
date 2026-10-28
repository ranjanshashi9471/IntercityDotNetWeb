// src/api/authService.ts
import axiosClient from "./axiosClient";
import type { User } from "../types";

interface AuthResponse {
	token: string;
	user: User;
}

export const authService = {
	login: async (email: string, password: string) => {
		const response = await axiosClient.post<AuthResponse>("/auth/login", {
			email,
			password,
		});
		if (response.data.token) {
			localStorage.setItem("jwt_token", response.data.token);
		}
		return response.data;
	},

	register: async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => {
		const response = await axiosClient.post("/auth/register", {
			firstName,
			lastName,
			email,
			password,
		});
		return response.data;
	},

	logout: () => {
		localStorage.removeItem("jwt_token");
	},
};
