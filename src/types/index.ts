export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

export interface TrainSearchResponse {
	trainId: number;
	trainName: string;
	trainNumber: string;
	departureStation: string;
	arrivalStation: string;
	departureTime: string; // ISO string
	availableSeats: number;
}

export interface Station {
	id: number;
	code: string;
	name: string;
}

export interface Coach {
	id: number;
	trainId: number;
	coachType: string; // e.g., "AC 3-Tier", "Sleeper"
	coachNumber: string; // e.g., "B1", "S4"
	totalSeats: number;
	isAvailableForBooking: boolean; // Handling maintenance scenarios
}

export interface Seat {
	id: number;
	coachId: number;
	seatNumber: number;
	seatType:
		| "Window"
		| "Middle"
		| "Aisle"
		| "Upper"
		| "Lower"
		| "SideLower"
		| "SideUpper";
	isBooked: boolean;
}

export interface TrainAvailabilitySearch {
	trainId: number;
	trainName: string;
	sourceStation: Station;
	destinationStation: Station;
	departureTime: string;
	arrivalTime: string;
	availableCoachTypes: string[];
}
