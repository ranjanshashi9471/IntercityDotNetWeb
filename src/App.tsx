// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SeatSelection from "./pages/SeatSelection";

// Admin Imports
import AdminLayout from "./components/Admin/AdminLayout";
import AdminTrains from "./pages/Admin/AdminTrains";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import AdminCoaches from "./pages/Admin/AdminCoaches";

// Placeholders for public pages
const Help = () => (
	<div className="p-20 text-center text-2xl font-bold">
		Help & FAQ (Coming Soon)
	</div>
);
const Contact = () => (
	<div className="p-20 text-center text-2xl font-bold">
		Contact Us (Coming Soon)
	</div>
);

// Placeholders for admin pages
const AdminDashboard = () => (
	<h2 className="text-2xl font-bold">Admin Dashboard Stats</h2>
);

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/help" element={<Help />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/seats" element={<SeatSelection />} />

				{/* Admin Routes (Wrapped in AdminLayout) */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<AdminDashboard />} /> {/* Renders at /admin */}
					<Route path="trains" element={<AdminTrains />} />{" "}
					{/* Renders at /admin/trains */}
					<Route path="routes" element={<AdminRoutes />} />
					<Route path="coaches" element={<AdminCoaches />} />
					<Route
						path="schedules"
						element={<div className="font-bold text-2xl">Modify Schedules</div>}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
