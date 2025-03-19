// First, install react-router-dom:
// npm install react-router-dom

// src/App.js (updated with routing)
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import PhotographyProject from "./pages/projects/Photography/PhotographyProject";
import NewsPage from "./pages/projects/NewsPage/NewsPage";
import CNCBusinessPage from "./pages/projects/CNCBusinessPage/CNCBusinessPage";
import BarberReservation from "./pages/projects/BarberReservation/BarberReservation";

import "./styles/global.css";
import "./styles/animations.css";
import "./styles/projects.css";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate initial loading
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Router>
			<LanguageProvider>
				<ThemeProvider>
					{isLoading ? (
						<div className="loading-screen">
							<div className="spinner"></div>
							<div className="loading-text">Loading amazing things...</div>
						</div>
					) : (
						<Routes>
							<Route
								path="/"
								element={
									<MainLayout>
										<Home />
									</MainLayout>
								}
							/>
							<Route
								path="/projects/photography"
								element={<PhotographyProject />}
							/>
							<Route path="/projects/news" element={<NewsPage />} />
							<Route path="/projects/metalprec" element={<CNCBusinessPage />} />
							<Route path="/projects/barber" element={<BarberReservation />} />
						</Routes>
					)}
				</ThemeProvider>
			</LanguageProvider>
		</Router>
	);
}

export default App;
