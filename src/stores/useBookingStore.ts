// src/stores/useBookingStore.ts
import { create } from "zustand";
import type { TrainAvailabilitySearch } from "../types";

export interface Passenger {
	id: string;
	name: string;
	age: number;
	gender: "M" | "F" | "O";
	// Link passenger to a specific seat later
	seatNumber?: string;
}

interface BookingState {
	selectedTrain: TrainAvailabilitySearch | null;
	selectedCoachType: string | null;
	selectedSeats: string[]; // e.g., ["S1-14", "S1-15"]
	passengers: Passenger[];

	setTrain: (train: TrainAvailabilitySearch) => void;
	setCoachType: (type: string) => void;
	toggleSeat: (seatId: string) => void;
	addPassenger: () => void;
	removePassenger: (id: string) => void;
	updatePassenger: <K extends keyof Passenger>(
		id: string,
		field: K,
		value: Passenger[K],
	) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
	selectedTrain: null,
	selectedCoachType: null,
	selectedSeats: [],
	passengers: [],

	setTrain: (train) =>
		set({
			selectedTrain: train,
			selectedCoachType: null,
			selectedSeats: [],
			passengers: [],
		}),

	setCoachType: (type) => set({ selectedCoachType: type, selectedSeats: [] }), // Reset seats if they change class

	toggleSeat: (seatId) =>
		set((state) => {
			const isSelected = state.selectedSeats.includes(seatId);
			if (isSelected) {
				return {
					selectedSeats: state.selectedSeats.filter((id) => id !== seatId),
				};
			}
			// Limit to 6 seats per booking
			if (state.selectedSeats.length >= 6) {
				alert("Maximum 6 seats allowed per booking.");
				return state;
			}
			return { selectedSeats: [...state.selectedSeats, seatId] };
		}),

	addPassenger: () =>
		set((state) => ({
			passengers: [
				...state.passengers,
				{ id: crypto.randomUUID(), name: "", age: 0, gender: "M" },
			],
		})),

	removePassenger: (id) =>
		set((state) => ({
			passengers: state.passengers.filter((p) => p.id !== id),
		})),

	updatePassenger: (id, field, value) =>
		set((state) => ({
			passengers: state.passengers.map((p) =>
				p.id === id ? { ...p, [field]: value } : p,
			),
		})),
}));
