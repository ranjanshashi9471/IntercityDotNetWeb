// src/hooks/useQueries.ts
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import type { Station, TrainAvailabilitySearch } from "../types";

// Fetch Stations
export const useStations = () => {
	return useQuery<Station[]>({
		queryKey: ["stations"],
		queryFn: async () => {
			const { data } = await axiosClient.get("/stations");
			return data;
		},
		// Stations rarely change, so cache them for 24 hours
		staleTime: 1000 * 60 * 60 * 24,
	});
};

// Fetch Trains (We will use this in the Search Form)
export const useTrainSearch = (
	fromId: number | null,
	toId: number | null,
	date: string,
) => {
	return useQuery<TrainAvailabilitySearch[]>({
		queryKey: ["trainSearch", fromId, toId, date],
		queryFn: async () => {
			const { data } = await axiosClient.get("/availability/search", {
				params: { sourceId: fromId, destinationId: toId, date },
			});
			return data;
		},
		// Only run this query if the user has filled out all three search fields
		enabled: !!fromId && !!toId && !!date,
	});
};
