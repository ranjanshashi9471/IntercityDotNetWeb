// src/pages/Admin/AdminRoutes.tsx
import { useState } from "react";
import { useStations } from "../../hooks/useQueries";

interface RouteStop {
	id: string; // Internal UI id for rendering the list
	stationId: number | "";
	arrivalTime: string;
	departureTime: string;
	distanceFromSource: number | "";
}

export default function AdminRoutes() {
	const { data: stations, isLoading: loadingStations } = useStations();

	// Mock train list - replace with useQuery to fetch real trains later
	const mockTrains = [
		{ id: 1, name: "Mumbai Rajdhani Express (12951)" },
		{ id: 2, name: "Garib Rath Express (12203)" },
	];

	const [selectedTrainId, setSelectedTrainId] = useState<number | "">("");

	// Initialize with two empty stops (Source and Destination)
	const [stops, setStops] = useState<RouteStop[]>([
		{
			id: crypto.randomUUID(),
			stationId: "",
			arrivalTime: "",
			departureTime: "",
			distanceFromSource: 0,
		},
		{
			id: crypto.randomUUID(),
			stationId: "",
			arrivalTime: "",
			departureTime: "",
			distanceFromSource: "",
		},
	]);

	const handleAddStop = () => {
		setStops([
			...stops,
			{
				id: crypto.randomUUID(),
				stationId: "",
				arrivalTime: "",
				departureTime: "",
				distanceFromSource: "",
			},
		]);
	};

	const handleRemoveStop = (idToRemove: string) => {
		if (stops.length <= 2) {
			alert("A route must have at least a source and destination.");
			return;
		}
		setStops(stops.filter((stop) => stop.id !== idToRemove));
	};

	const handleUpdateStop = <K extends keyof RouteStop>(
		id: string,
		field: K,
		value: RouteStop[K],
	) => {
		setStops(
			stops.map((stop) =>
				stop.id === id ? { ...stop, [field]: value } : stop,
			),
		);
	};

	const handleSaveRoute = (e: React.FormEvent) => {
		e.preventDefault();

		// Prepare the payload for your .NET backend
		const payload = {
			trainId: selectedTrainId,
			stops: stops.map((stop, index) => ({
				stationId: stop.stationId,
				stopSequence: index + 1,
				arrivalTime: stop.arrivalTime,
				departureTime: stop.departureTime,
				distanceFromSource: stop.distanceFromSource,
			})),
		};

		console.log("Submitting to POST /api/admin/routes:", payload);
		alert("Route saved successfully! Check console for payload.");
	};

	return (
		<div className="max-w-6xl mx-auto pb-12">
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-gray-900">
					Route & Stops Mapping
				</h2>
				<p className="text-gray-500 text-sm mt-1">
					Define the sequence of stations, timings, and distances for a specific
					train.
				</p>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
				<label className="block text-sm font-bold text-gray-700 mb-2">
					1. Select Base Train
				</label>
				<select
					className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
					value={selectedTrainId}
					onChange={(e) => setSelectedTrainId(Number(e.target.value))}
				>
					<option value="" disabled>
						-- Select a Train --
					</option>
					{mockTrains.map((t) => (
						<option key={t.id} value={t.id}>
							{t.name}
						</option>
					))}
				</select>
			</div>

			{selectedTrainId && (
				<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-bold text-gray-800">
							2. Configure Route Timeline
						</h3>
						<button
							onClick={handleAddStop}
							className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-2"
						>
							+ Add Intermediate Stop
						</button>
					</div>

					<form onSubmit={handleSaveRoute}>
						<div className="space-y-4 mb-8 relative">
							{/* Visual timeline line */}
							<div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0 hidden md:block"></div>

							{stops.map((stop, index) => (
								<div
									key={stop.id}
									className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-end bg-gray-50 p-4 rounded-lg border border-gray-200"
								>
									{/* Sequence Number / Timeline Dot */}
									<div className="hidden md:flex flex-col items-center justify-center w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-700 font-bold text-xs mt-6 shrink-0">
										{index + 1}
									</div>

									{/* Station Selection */}
									<div className="flex-[2] w-full">
										<label className="block text-xs font-semibold text-gray-600 mb-1">
											{index === 0
												? "Source Station"
												: index === stops.length - 1
													? "Destination Station"
													: "Stop Station"}
										</label>
										<select
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
											value={stop.stationId}
											onChange={(e) =>
												handleUpdateStop(
													stop.id,
													"stationId",
													Number(e.target.value),
												)
											}
											disabled={loadingStations}
										>
											<option value="" disabled>
												Select Station
											</option>
											{stations?.map((s) => (
												<option key={s.id} value={s.id}>
													{s.name} ({s.code})
												</option>
											))}
										</select>
									</div>

									{/* Arrival Time */}
									<div className="flex-1 w-full">
										<label className="block text-xs font-semibold text-gray-600 mb-1">
											Arrival Time
										</label>
										<input
											type="time"
											required={index !== 0} // Source doesn't need arrival time
											disabled={index === 0}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100"
											value={stop.arrivalTime}
											onChange={(e) =>
												handleUpdateStop(stop.id, "arrivalTime", e.target.value)
											}
										/>
									</div>

									{/* Departure Time */}
									<div className="flex-1 w-full">
										<label className="block text-xs font-semibold text-gray-600 mb-1">
											Dep. Time
										</label>
										<input
											type="time"
											required={index !== stops.length - 1} // Dest doesn't need departure time
											disabled={index === stops.length - 1}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100"
											value={stop.departureTime}
											onChange={(e) =>
												handleUpdateStop(
													stop.id,
													"departureTime",
													e.target.value,
												)
											}
										/>
									</div>

									{/* Distance */}
									<div className="flex-1 w-full">
										<label className="block text-xs font-semibold text-gray-600 mb-1">
											Dist. (km)
										</label>
										<input
											type="number"
											min="0"
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
											value={stop.distanceFromSource}
											onChange={(e) =>
												handleUpdateStop(
													stop.id,
													"distanceFromSource",
													Number(e.target.value),
												)
											}
										/>
									</div>

									{/* Remove Button */}
									<div className="shrink-0">
										<button
											type="button"
											onClick={() => handleRemoveStop(stop.id)}
											className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30"
											disabled={stops.length <= 2}
											title="Remove Stop"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-end pt-4 border-t border-gray-200">
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition transform hover:-translate-y-0.5"
							>
								Save Complete Route
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
