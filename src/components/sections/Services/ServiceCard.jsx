import React, { useEffect, useRef } from "react";
import Card from "../../common/Card/Card";
import styles from "./Services.module.css";

const ServiceCard = ({ service, isVisible, delay = 0 }) => {
	const cardRef = useRef(null);

	useEffect(() => {
		if (isVisible && cardRef.current) {
			setTimeout(() => {
				cardRef.current.classList.add("fadeInUp", "active");
			}, delay * 1000);
		}
	}, [isVisible, delay]);

	return (
		<div className={`${styles.serviceCardWrapper} reveal`} ref={cardRef}>
			<Card className={styles.serviceCard} hoverable>
				<div className={styles.serviceIcon}>{service.icon}</div>
				<h3 className={styles.serviceTitle}>{service.title}</h3>
				<p className={styles.serviceDescription}>{service.description}</p>
				<a href="#contact" className={styles.serviceLink}>
					Learn More
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
				</a>
			</Card>
		</div>
	);
};

export default ServiceCard;
