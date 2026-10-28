// src/components/TrainResults.tsx
import { useTrainSearch } from "../hooks/useQueries";
import { useBookingStore } from "../stores/useBookingStore";

interface TrainResultsProps {
	fromId: number;
	toId: number;
	date: string;
}

export default function TrainResults({
	fromId,
	toId,
	date,
}: TrainResultsProps) {
	// 1. Fetch data automatically based on search params
	const {
		data: trains,
		isLoading,
		isError,
	} = useTrainSearch(fromId, toId, date);

	// 2. Action to save the selected train to Zustand
	const setTrain = useBookingStore((state) => state.setTrain);

	// Loading State
	if (isLoading) {
		return (
			<div className="w-full max-w-4xl mx-auto mt-8 p-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
				<p className="text-gray-500 font-medium animate-pulse">
					Searching for the best trains...
				</p>
			</div>
		);
	}

	// Error State
	if (isError) {
		return (
			<div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
				<p className="text-red-600 font-medium">
					Failed to load trains. Please check your connection or backend server.
				</p>
			</div>
		);
	}

	// Empty State (No trains found)
	if (!trains || trains.length === 0) {
		return (
			<div className="w-full max-w-4xl mx-auto mt-8 p-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
				<svg
					className="w-16 h-16 text-gray-300 mx-auto mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<h3 className="text-lg font-bold text-gray-800 mb-1">
					No Trains Found
				</h3>
				<p className="text-gray-500">
					We couldn't find any trains for this route on the selected date.
				</p>
			</div>
		);
	}

	// Helper: Format ISO string to time (e.g., "14:30")
	const formatTime = (isoString: string) => {
		return new Date(isoString).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Helper: Calculate duration between departure and arrival
	const getDuration = (start: string, end: string) => {
		const diffMs = new Date(end).getTime() - new Date(start).getTime();
		if (isNaN(diffMs) || diffMs < 0) return "N/A";
		const hours = Math.floor(diffMs / (1000 * 60 * 60));
		const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}h ${mins}m`;
	};

	return (
		<div className="w-full max-w-4xl mx-auto mt-8 flex flex-col gap-6">
			<h3 className="text-2xl font-bold text-gray-800 px-2">
				Available Trains
			</h3>

			{trains.map((train) => (
				<div
					key={train.trainId}
					className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 group"
				>
					{/* Top Section: Train Name & Classes */}
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-blue-50 text-blue-600 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
								{/* Train Icon */}
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2zm1 9h6m-3-13a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="text-xl font-bold text-gray-900">
									{train.trainName}
								</h4>
								<p className="text-sm font-medium text-gray-500">
									Train No: {train.trainId}
								</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							{train.availableCoachTypes.map((type) => (
								<span
									key={type}
									className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full"
								>
									{type}
								</span>
							))}
						</div>
					</div>

					{/* Middle Section: Route Timeline */}
					<div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200/60">
						{/* Departure */}
						<div className="text-center sm:text-left min-w-[100px]">
							<p className="text-2xl font-extrabold text-gray-900">
								{formatTime(train.departureTime)}
							</p>
							<p className="text-sm font-semibold text-gray-700 mt-1">
								{train.sourceStation.name}
							</p>
							<p className="text-xs text-gray-500">
								{train.sourceStation.code}
							</p>
						</div>

						{/* Visual connecting line */}
						<div className="flex-1 hidden sm:flex flex-col items-center px-6">
							<span className="text-xs font-bold text-gray-500 mb-2 bg-white px-2 py-1 rounded-md border border-gray-200">
								{getDuration(train.departureTime, train.arrivalTime)}
							</span>
							<div className="w-full flex items-center">
								<div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow"></div>
								<div className="flex-1 h-0.5 bg-gray-300"></div>
								<div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow"></div>
							</div>
							<span className="text-xs text-gray-400 mt-2">Direct Route</span>
						</div>

						{/* Arrival */}
						<div className="text-center sm:text-right min-w-[100px]">
							<p className="text-2xl font-extrabold text-gray-900">
								{formatTime(train.arrivalTime)}
							</p>
							<p className="text-sm font-semibold text-gray-700 mt-1">
								{train.destinationStation.name}
							</p>
							<p className="text-xs text-gray-500">
								{train.destinationStation.code}
							</p>
						</div>
					</div>

					{/* Bottom Section: Action Button */}
					<div className="mt-6 flex justify-end">
						<button
							onClick={() => setTrain(train)}
							className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
						>
							Select & Book
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
