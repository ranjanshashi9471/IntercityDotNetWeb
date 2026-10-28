// src/pages/Admin/AdminCoaches.tsx
import { useState } from "react";

// Common Indian Railway coach types
const COACH_TYPES = [
	{ type: "1A", name: "AC First Class", defaultSeats: 24 },
	{ type: "2A", name: "AC 2-Tier", defaultSeats: 54 },
	{ type: "3A", name: "AC 3-Tier", defaultSeats: 72 },
	{ type: "SL", name: "Sleeper", defaultSeats: 72 },
	{ type: "GEN", name: "General", defaultSeats: 90 },
];

interface CoachDefinition {
	id: string;
	coachType: string;
	coachNumber: string; // e.g., 'S1', 'B1'
	totalSeats: number;
}

export default function AdminCoaches() {
	// Mock train list
	const mockTrains = [
		{ id: 1, name: "Mumbai Rajdhani Express (12951)" },
		{ id: 2, name: "Garib Rath Express (12203)" },
	];

	const [selectedTrainId, setSelectedTrainId] = useState<number | "">("");
	const [coaches, setCoaches] = useState<CoachDefinition[]>([]);

	// State for adding a new coach
	const [newCoachType, setNewCoachType] = useState(COACH_TYPES[3].type);
	const [newCoachNumber, setNewCoachNumber] = useState("");
	const [newTotalSeats, setNewTotalSeats] = useState<number>(
		COACH_TYPES[3].defaultSeats,
	);

	// Handle default seat updates when coach type changes
	const handleTypeChange = (type: string) => {
		setNewCoachType(type);
		const defaults = COACH_TYPES.find((c) => c.type === type);
		if (defaults) setNewTotalSeats(defaults.defaultSeats);
	};

	const handleAddCoach = (e: React.FormEvent) => {
		e.preventDefault();
		if (coaches.some((c) => c.coachNumber === newCoachNumber.toUpperCase())) {
			alert(
				`Coach number ${newCoachNumber.toUpperCase()} already exists on this train!`,
			);
			return;
		}

		setCoaches([
			...coaches,
			{
				id: crypto.randomUUID(),
				coachType: newCoachType,
				coachNumber: newCoachNumber.toUpperCase(),
				totalSeats: newTotalSeats,
			},
		]);

		setNewCoachNumber(""); // Reset input for next coach
	};

	const handleRemoveCoach = (id: string) => {
		setCoaches(coaches.filter((c) => c.id !== id));
	};

	const handleSaveComposition = () => {
		const payload = {
			trainId: selectedTrainId,
			coaches: coaches.map((c) => ({
				coachType: c.coachType,
				coachNumber: c.coachNumber,
				totalSeats: c.totalSeats,
			})),
		};

		console.log("Submitting to POST /api/admin/coaches:", payload);
		alert("Train composition saved successfully! Check console.");
	};

	return (
		<div className="max-w-6xl mx-auto pb-12">
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-gray-900">
					Dynamic Coach Composer
				</h2>
				<p className="text-gray-500 text-sm mt-1">
					Construct the physical layout of the train by adding coaches and
					defining seat capacities.
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
				<>
					{/* Coach Addition Form */}
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
						<h3 className="text-lg font-bold text-gray-800 mb-4">
							2. Add Coach to Rake
						</h3>
						<form
							onSubmit={handleAddCoach}
							className="flex flex-wrap items-end gap-4"
						>
							<div className="flex-1 min-w-[150px]">
								<label className="block text-xs font-semibold text-gray-600 mb-1">
									Coach Type
								</label>
								<select
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
									value={newCoachType}
									onChange={(e) => handleTypeChange(e.target.value)}
								>
									{COACH_TYPES.map((c) => (
										<option key={c.type} value={c.type}>
											{c.name} ({c.type})
										</option>
									))}
								</select>
							</div>

							<div className="flex-1 min-w-[150px]">
								<label className="block text-xs font-semibold text-gray-600 mb-1">
									Coach Number / Label
								</label>
								<input
									type="text"
									required
									placeholder="e.g., S1, B1, A1"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
									value={newCoachNumber}
									onChange={(e) => setNewCoachNumber(e.target.value)}
								/>
							</div>

							<div className="flex-1 min-w-[150px]">
								<label className="block text-xs font-semibold text-gray-600 mb-1">
									Total Seats
								</label>
								<input
									type="number"
									required
									min="10"
									max="120"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
									value={newTotalSeats}
									onChange={(e) => setNewTotalSeats(Number(e.target.value))}
								/>
							</div>

							<button
								type="submit"
								className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition whitespace-nowrap"
							>
								+ Add Coach
							</button>
						</form>
					</div>

					{/* Visual Train Composition */}
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-lg font-bold text-gray-800">
								3. Current Train Composition
							</h3>
							<span className="text-sm font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
								Total Coaches: {coaches.length}
							</span>
						</div>

						{coaches.length === 0 ? (
							<div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
								<p className="text-gray-500 font-medium">
									No coaches added yet. Start adding coaches above.
								</p>
							</div>
						) : (
							<div className="overflow-x-auto pb-4">
								<div className="flex items-center min-w-max px-4">
									{/* Engine Graphic */}
									<div className="w-24 h-16 bg-red-600 rounded-l-3xl rounded-r-md border-b-4 border-gray-800 flex items-center justify-center text-white font-bold shadow-md shrink-0 z-10 relative">
										ENGINE
										{/* Headlight */}
										<div className="absolute left-1 top-4 w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]"></div>
									</div>

									{coaches.map((coach) => (
										<div
											key={coach.id}
											className="flex items-center group relative shrink-0"
										>
											{/* Coupler (Connector between coaches) */}
											<div className="w-6 h-2 bg-gray-600 border-y border-gray-800 z-0"></div>

											{/* Coach Body */}
											<div className="w-32 h-16 bg-blue-700 rounded-md border-b-4 border-gray-800 flex flex-col items-center justify-center text-white shadow-md relative z-10 hover:bg-blue-600 transition group">
												<span className="font-extrabold text-lg">
													{coach.coachNumber}
												</span>
												<span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded uppercase tracking-wide">
													{coach.coachType} • {coach.totalSeats}
												</span>

												{/* Windows */}
												<div className="absolute top-2 w-full flex justify-evenly px-2">
													<div className="w-4 h-3 bg-sky-200 rounded-sm opacity-50"></div>
													<div className="w-4 h-3 bg-sky-200 rounded-sm opacity-50"></div>
													<div className="w-4 h-3 bg-sky-200 rounded-sm opacity-50"></div>
													<div className="w-4 h-3 bg-sky-200 rounded-sm opacity-50"></div>
												</div>

												{/* Delete button (shows on hover) */}
												<button
													onClick={() => handleRemoveCoach(coach.id)}
													className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg"
													title="Remove Coach"
												>
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
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{coaches.length > 0 && (
							<div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
								<button
									onClick={handleSaveComposition}
									className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition transform hover:-translate-y-0.5"
								>
									Save Train Composition
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
