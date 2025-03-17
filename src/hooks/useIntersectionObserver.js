import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options = {}) => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: options.root || null,
				rootMargin: options.rootMargin || "0px",
				threshold: options.threshold || 0.1,
			}
		);

		const currentRef = ref.current;

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [options.root, options.rootMargin, options.threshold]);

	return [ref, isVisible];
};

export default useIntersectionObserver;
