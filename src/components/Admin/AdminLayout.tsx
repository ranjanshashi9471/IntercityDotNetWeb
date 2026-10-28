// src/components/Admin/AdminLayout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
	const location = useLocation();

	const navItems = [
		{ name: "Dashboard", path: "/admin" },
		{ name: "Trains", path: "/admin/trains" },
		{ name: "Routes & Stops", path: "/admin/routes" },
		{ name: "Coach Management", path: "/admin/coaches" },
		{ name: "Schedules", path: "/admin/schedules" },
	];

	return (
		<div className="min-h-screen bg-gray-100 flex">
			{/* Sidebar */}
			<aside className="w-64 bg-slate-900 text-white flex flex-col">
				<div className="h-16 flex items-center px-6 border-b border-slate-800">
					<span className="font-bold text-xl tracking-tight">
						Intercity<span className="text-blue-500">Admin</span>
					</span>
				</div>
				<nav className="flex-1 px-4 py-6 space-y-2">
					{navItems.map((item) => {
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.name}
								to={item.path}
								className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-600 text-white"
										: "text-slate-300 hover:bg-slate-800 hover:text-white"
								}`}
							>
								{item.name}
							</Link>
						);
					})}
				</nav>
				<div className="p-4 border-t border-slate-800">
					<Link
						to="/"
						className="text-sm text-slate-400 hover:text-white flex items-center gap-2"
					>
						&larr; Back to Main Site
					</Link>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className="flex-1 flex flex-col">
				<header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm">
					<h1 className="text-xl font-semibold text-gray-800">
						Admin Control Panel
					</h1>
				</header>
				<div className="p-8 overflow-y-auto h-[calc(100vh-4rem)]">
					{/* The nested route components will render right here inside Outlet */}
					<Outlet />
				</div>
			</main>
		</div>
	);
}
