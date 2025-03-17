import { useState, useEffect } from "react";

const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState({
		x: 0,
		y: 0,
		direction: null,
		lastY: 0,
	});

	useEffect(() => {
		let lastScrollY = window.pageYOffset;

		const updateScrollPosition = () => {
			const scrollY = window.pageYOffset;
			const direction = scrollY > lastScrollY ? "down" : "up";

			setScrollPosition({
				x: window.pageXOffset,
				y: scrollY,
				direction,
				lastY: lastScrollY,
			});

			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		window.addEventListener("scroll", updateScrollPosition, { passive: true });

		return () => {
			window.removeEventListener("scroll", updateScrollPosition);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
