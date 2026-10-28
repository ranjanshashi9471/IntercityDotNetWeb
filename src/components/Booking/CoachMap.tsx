// src/components/Booking/CoachMap.tsx
import { useBookingStore } from "../../stores/useBookingStore";

interface CoachMapProps {
	coachNumber: string; // e.g. "S1"
	totalSeats: number;
	bookedSeats: string[]; // e.g. ["12", "14"] coming from the backend
}

export default function CoachMap({
	coachNumber,
	totalSeats,
	bookedSeats,
}: CoachMapProps) {
	const { selectedSeats, toggleSeat } = useBookingStore();

	// Group seats into bays of 8
	const bays = [];
	for (let i = 1; i <= totalSeats; i += 8) {
		bays.push({
			startSeat: i,
			endSeat: Math.min(i + 7, totalSeats),
		});
	}

	const getSeatType = (seatNum: number) => {
		const mod = seatNum % 8;
		switch (mod) {
			case 1:
			case 4:
				return "L"; // Lower
			case 2:
			case 5:
				return "M"; // Middle
			case 3:
			case 6:
				return "U"; // Upper
			case 7:
				return "SL"; // Side Lower
			case 0:
				return "SU"; // Side Upper
			default:
				return "";
		}
	};

	return (
		<div className="bg-white p-6 rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
			<div className="flex items-center gap-4 mb-6">
				<h3 className="font-bold text-xl text-gray-800">Coach {coachNumber}</h3>

				{/* Legend */}
				<div className="flex gap-4 text-xs font-semibold ml-auto border-l pl-4 border-gray-200">
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm"></div>
						Available
					</div>
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm"></div>
						Booked
					</div>
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-3 bg-blue-600 border border-blue-700 rounded-sm"></div>
						Selected
					</div>
				</div>
			</div>

			{/* The Train Coach Visual container */}
			<div className="inline-flex flex-col bg-gray-50 border-2 border-gray-300 p-4 rounded-lg">
				<div className="flex gap-8">
					{bays.map((bay, bayIndex) => (
						<div
							key={bayIndex}
							className="flex flex-col gap-6 w-24 shrink-0 relative"
						>
							{/* Main Bay (Seats 1-6 in this group) */}
							<div className="flex justify-between w-full relative">
								{/* Left Side of Main Bay */}
								<div className="flex flex-col gap-1">
									{[1, 2, 3].map((offset) => {
										const seatNum = bay.startSeat + offset - 1;
										if (seatNum > totalSeats) return null;
										const seatId = `${coachNumber}-${seatNum}`;
										const isBooked = bookedSeats.includes(seatNum.toString());
										const isSelected = selectedSeats.includes(seatId);

										return (
											<button
												key={seatNum}
												disabled={isBooked}
												onClick={() => toggleSeat(seatId)}
												className={`w-10 h-10 rounded text-xs font-bold transition-all border ${
													isBooked
														? "bg-red-50 border-red-200 text-red-300 cursor-not-allowed"
														: isSelected
															? "bg-blue-600 border-blue-700 text-white shadow-inner"
															: "bg-white border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
												}`}
											>
												{seatNum}
												<span className="block text-[8px] opacity-70">
													{getSeatType(seatNum)}
												</span>
											</button>
										);
									})}
								</div>

								{/* Aisle space (empty gap) */}
								<div className="w-4 bg-gray-200/50 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 rounded-full"></div>

								{/* Right Side of Main Bay */}
								<div className="flex flex-col gap-1">
									{[4, 5, 6].map((offset) => {
										const seatNum = bay.startSeat + offset - 1;
										if (seatNum > totalSeats) return null;
										const seatId = `${coachNumber}-${seatNum}`;
										const isBooked = bookedSeats.includes(seatNum.toString());
										const isSelected = selectedSeats.includes(seatId);

										return (
											<button
												key={seatNum}
												disabled={isBooked}
												onClick={() => toggleSeat(seatId)}
												className={`w-10 h-10 rounded text-xs font-bold transition-all border ${
													isBooked
														? "bg-red-50 border-red-200 text-red-300 cursor-not-allowed"
														: isSelected
															? "bg-blue-600 border-blue-700 text-white shadow-inner"
															: "bg-white border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
												}`}
											>
												{seatNum}
												<span className="block text-[8px] opacity-70">
													{getSeatType(seatNum)}
												</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Side Bay (Seats 7-8) */}
							<div className="flex flex-col gap-1 items-center bg-white border border-gray-200 p-2 rounded w-full">
								{[7, 8].map((offset) => {
									const seatNum = bay.startSeat + offset - 1;
									if (seatNum > totalSeats) return null;
									const seatId = `${coachNumber}-${seatNum}`;
									const isBooked = bookedSeats.includes(seatNum.toString());
									const isSelected = selectedSeats.includes(seatId);

									return (
										<button
											key={seatNum}
											disabled={isBooked}
											onClick={() => toggleSeat(seatId)}
											className={`w-10 h-8 rounded text-xs font-bold transition-all border ${
												isBooked
													? "bg-red-50 border-red-200 text-red-300 cursor-not-allowed"
													: isSelected
														? "bg-blue-600 border-blue-700 text-white shadow-inner"
														: "bg-white border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
											}`}
										>
											{seatNum}
											<span className="ml-1 text-[8px] opacity-70">
												{getSeatType(seatNum)}
											</span>
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
