// src/pages/Home.tsx
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { useBookingStore } from "../stores/useBookingStore";
import TrainResults from "../components/TrainResults";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useState<{
		from: number;
		to: number;
		date: string;
	} | null>(null);
	const selectedTrain = useBookingStore((state) => state.selectedTrain);

	const handleSearch = (from: number, to: number, date: string) => {
		setSearchParams({ from, to, date });
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Navigation Bar */}
			<header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
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
							<span className="font-bold text-xl text-gray-900 tracking-tight">
								Intercity<span className="text-blue-600">Rail</span>
							</span>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-8">
							<Link
								to="/"
								className="text-gray-600 hover:text-blue-600 font-medium transition"
							>
								Home
							</Link>
							<Link
								to="/help"
								className="text-gray-600 hover:text-blue-600 font-medium transition"
							>
								Help
							</Link>
							<Link
								to="/contact"
								className="text-gray-600 hover:text-blue-600 font-medium transition"
							>
								Contact Us
							</Link>
						</nav>

						{/* Auth Buttons */}
						<div className="flex items-center space-x-4">
							<Link
								to="/login"
								className="text-gray-600 hover:text-blue-600 font-medium transition"
							>
								Log in
							</Link>
							<Link
								to="/signup"
								className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
							>
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="flex-grow">
				<div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 pb-32 pt-20">
					{/* Subtle background pattern (optional) */}
					<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
							Your Journey Starts Here
						</h1>
						<p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
							Book train tickets instantly with our real-time dynamic seating
							engine. Fast, secure, and hassle-free.
						</p>
					</div>
				</div>

				{/* Search Component (Pulled up to overlap the hero section) */}
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-12">
					<SearchForm onSearch={handleSearch} />
				</div>

				{/* Results Section */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
					{searchParams && !selectedTrain && (
						<TrainResults
							fromId={searchParams.from}
							toId={searchParams.to}
							date={searchParams.date}
						/>
					)}

					{selectedTrain && (
						<div className="max-w-4xl mx-auto p-6 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
							<h2 className="text-2xl font-bold text-green-800">
								You selected: {selectedTrain.trainName}
							</h2>
							<p className="text-green-600 mt-2">
								Next step: Let's pick your coach and seats.
							</p>
							<button
								onClick={() => navigate("/seats")}
								className="mt-4 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
							>
								Continue to Seat Selection &rarr;
							</button>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
