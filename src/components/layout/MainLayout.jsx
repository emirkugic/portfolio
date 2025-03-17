import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useScrollPosition from "../../hooks/useScrollPosition";

const MainLayout = ({ children }) => {
	const { y } = useScrollPosition();

	// Animate elements when they come into view
	useEffect(() => {
		const revealElements = document.querySelectorAll(".reveal");

		const revealOnScroll = () => {
			revealElements.forEach((element) => {
				const elementTop = element.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;

				if (elementTop < windowHeight - 100) {
					element.classList.add("active");
				}
			});
		};

		window.addEventListener("scroll", revealOnScroll);
		revealOnScroll(); // Initial check

		return () => window.removeEventListener("scroll", revealOnScroll);
	}, []);

	return (
		<>
			<Header isScrolled={y > 50} />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
