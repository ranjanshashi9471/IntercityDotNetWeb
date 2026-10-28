// src/pages/SeatSelection.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../stores/useBookingStore";
import CoachMap from "../components/Booking/CoachMap";

export default function SeatSelection() {
	const navigate = useNavigate();
	const { selectedTrain, selectedSeats } = useBookingStore();

	// In a real app, you would fetch this data from your backend:
	// GET /api/availability/coaches?trainId=123&date=2026-05-25
	const mockCoaches = [
		{
			id: "c1",
			number: "S1",
			type: "SL",
			totalSeats: 72,
			bookedSeats: ["4", "5", "6", "12", "14", "70"],
		},
		{
			id: "c2",
			number: "S2",
			type: "SL",
			totalSeats: 72,
			bookedSeats: ["1", "2", "8"],
		},
		{
			id: "c3",
			number: "B1",
			type: "3A",
			totalSeats: 72,
			bookedSeats: ["15", "16", "18"],
		},
	];

	const [activeCoach, setActiveCoach] = useState(mockCoaches[0]);

	// If the user refreshed the page and lost the Zustand state, send them back to Home
	useEffect(() => {
		if (!selectedTrain) {
			navigate("/");
		}
	}, [selectedTrain, navigate]);

	if (!selectedTrain) return null;

	return (
		<div className="min-h-screen bg-gray-50 pt-8 px-4 pb-24">
			<div className="max-w-7xl mx-auto">
				{/* Header elements */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-extrabold text-gray-900">
							{selectedTrain.trainName}
						</h1>
						<p className="text-gray-500 mt-1 font-medium">
							{selectedTrain.sourceStation.name} &rarr;{" "}
							{selectedTrain.destinationStation.name}
						</p>
					</div>
					<button
						onClick={() => navigate("/")}
						className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg"
					>
						Change Train
					</button>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Main Layout: Coach Tabs + Grid */}
					<div className="flex-1">
						{/* Coach Selection Tabs */}
						<div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 flex overflow-x-auto gap-2">
							{mockCoaches.map((coach) => (
								<button
									key={coach.id}
									onClick={() => setActiveCoach(coach)}
									className={`px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
										activeCoach.id === coach.id
											? "bg-blue-600 text-white shadow-md"
											: "bg-transparent text-gray-600 hover:bg-gray-100"
									}`}
								>
									{coach.number}{" "}
									<span className="font-normal text-xs opacity-80 block">
										{coach.type}
									</span>
								</button>
							))}
						</div>

						{/* Visual Coach Grid */}
						<div className="animate-fade-in">
							<CoachMap
								coachNumber={activeCoach.number}
								totalSeats={activeCoach.totalSeats}
								bookedSeats={activeCoach.bookedSeats}
							/>
						</div>
					</div>

					{/* Right Side: Booking Summary Panel */}
					<div className="w-full lg:w-80 shrink-0">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
							<h3 className="text-lg font-bold text-gray-900 mb-4">
								Booking Summary
							</h3>

							<div className="flex justify-between items-center py-3 border-b border-gray-100">
								<span className="text-gray-600">Selected Seats</span>
								<span className="font-bold text-blue-600 text-lg">
									{selectedSeats.length} / 6
								</span>
							</div>

							{selectedSeats.length > 0 ? (
								<div className="mt-4 flex flex-wrap gap-2">
									{selectedSeats.map((seat) => (
										<span
											key={seat}
											className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-md font-bold text-sm shadow-sm"
										>
											{seat}
										</span>
									))}
								</div>
							) : (
								<div className="mt-4 py-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded-lg">
									<p className="text-sm text-gray-500 font-medium">
										Please select a seat from the coach map.
									</p>
								</div>
							)}

							<button
								disabled={selectedSeats.length === 0}
								onClick={() => navigate("/passengers")}
								className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
							>
								Continue to Passengers
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
