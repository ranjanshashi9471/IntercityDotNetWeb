// src/components/SearchForm.tsx
import { useState } from "react";
import { useStations } from "../hooks/useQueries";

export default function SearchForm({
	onSearch,
}: {
	onSearch: (from: number, to: number, date: string) => void;
}) {
	const [fromId, setFromId] = useState<number | "">("");
	const [toId, setToId] = useState<number | "">("");
	const [date, setDate] = useState<string>("");

	// TanStack Query handles the API call and caching
	const { data: stations, isLoading, isError } = useStations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (fromId && toId && date) {
			onSearch(Number(fromId), Number(toId), date);
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mt-10">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Book Your Train Ticket
			</h2>

			{isLoading && (
				<p className="text-blue-500 mb-4 animate-pulse">
					Loading stations from server...
				</p>
			)}
			{isError && (
				<p className="text-red-500 mb-4">
					Failed to load stations. Is the .NET backend running?
				</p>
			)}

			<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
				{/* From Dropdown */}
				<div className="flex-1">
					<label className="block text-sm font-medium text-gray-600 mb-1">
						From
					</label>
					<select
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
						value={fromId}
						onChange={(e) => setFromId(Number(e.target.value))}
						disabled={isLoading || isError}
						required
					>
						<option value="" disabled>
							Select Source
						</option>
						{stations?.map((s) => (
							<option key={s.id} value={s.id}>
								{s.name} ({s.code})
							</option>
						))}
					</select>
				</div>

				{/* To Dropdown */}
				<div className="flex-1">
					<label className="block text-sm font-medium text-gray-600 mb-1">
						To
					</label>
					<select
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
						value={toId}
						onChange={(e) => setToId(Number(e.target.value))}
						disabled={isLoading || isError}
						required
					>
						<option value="" disabled>
							Select Destination
						</option>
						{stations?.map((s) => (
							<option key={s.id} value={s.id}>
								{s.name} ({s.code})
							</option>
						))}
					</select>
				</div>

				{/* Date Picker */}
				<div className="flex-1">
					<label className="block text-sm font-medium text-gray-600 mb-1">
						Date
					</label>
					<input
						type="date"
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</div>

				{/* Submit Button */}
				<div className="flex items-end">
					<button
						type="submit"
						className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition disabled:bg-gray-400"
						disabled={isLoading || isError}
					>
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
