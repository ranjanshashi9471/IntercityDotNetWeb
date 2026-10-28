// src/pages/Admin/AdminTrains.tsx
import { useState } from "react";

export default function AdminTrains() {
	const [isAdding, setIsAdding] = useState(false);
	const [trainName, setTrainName] = useState("");
	const [trainNumber, setTrainNumber] = useState("");

	const handleAddTrain = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting to POST /api/admin/trains:", {
			trainName,
			trainNumber,
		});
		// Trigger TanStack mutation here, then reset form
		setIsAdding(false);
		setTrainName("");
		setTrainNumber("");
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Train Management</h2>
					<p className="text-gray-500 text-sm mt-1">
						Manage base train profiles before assigning routes or coaches.
					</p>
				</div>
				<button
					onClick={() => setIsAdding(!isAdding)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
				>
					{isAdding ? "Cancel" : "+ Add New Train"}
				</button>
			</div>

			{isAdding && (
				<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						Register New Train
					</h3>
					<form onSubmit={handleAddTrain} className="flex gap-4 items-end">
						<div className="flex-1">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Train Number
							</label>
							<input
								type="text"
								required
								placeholder="e.g. 12951"
								value={trainNumber}
								onChange={(e) => setTrainNumber(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<div className="flex-[2]">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Train Name
							</label>
							<input
								type="text"
								required
								placeholder="e.g. Mumbai Rajdhani Express"
								value={trainName}
								onChange={(e) => setTrainName(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<button
							type="submit"
							className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
						>
							Save Train
						</button>
					</form>
				</div>
			)}

			{/* Mock Table - Will be replaced by TanStack Query data */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Train Number
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Train Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						<tr>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
								12951
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
								Mumbai Rajdhani Express
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
									Active
								</span>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button className="text-blue-600 hover:text-blue-900">
									Edit
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
