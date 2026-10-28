// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { isAxiosError } from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await authService.login(email, password);
			// On success, redirect to the home page
			navigate("/");
		} catch (err) {
			if (isAxiosError(err)) {
				setError(
					err.response?.data?.message ||
						"Failed to login. Please check your credentials.",
				);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Link to="/" className="flex justify-center items-center gap-2 mb-6">
					<svg
						className="w-8 h-8 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="font-bold text-2xl text-gray-900 tracking-tight">
						Intercity<span className="text-blue-600">Rail</span>
					</span>
				</Link>
				<h2 className="text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
					<form className="space-y-6" onSubmit={handleLogin}>
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
								{error}
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition"
							>
								{isLoading ? "Signing in..." : "Sign in"}
							</button>
						</div>
					</form>

					<div className="mt-6 text-center text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Sign up here
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
