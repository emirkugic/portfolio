import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import "./styles/global.css";
import "./styles/animations.css";

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
		<ThemeProvider>
			{isLoading ? (
				<div className="loading-screen">
					<div className="spinner"></div>
					<div className="loading-text">Loading amazing things...</div>
				</div>
			) : (
				<MainLayout>
					<Home />
				</MainLayout>
			)}
		</ThemeProvider>
	);
}

export default App;
