import React from "react";
import ServiceCard from "./ServiceCard";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./Services.module.css";

const Services = () => {
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const services = [
		{
			id: 1,
			title: "Web Development",
			description:
				"Custom website development tailored to your business needs, including e-commerce, corporate sites, and web applications.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
					<line x1="8" y1="21" x2="16" y2="21"></line>
					<line x1="12" y1="17" x2="12" y2="21"></line>
				</svg>
			),
		},
		{
			id: 2,
			title: "Mobile App Development",
			description:
				"Native and cross-platform mobile applications for iOS and Android that provide a seamless user experience.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
					<line x1="12" y1="18" x2="12.01" y2="18"></line>
				</svg>
			),
		},
		{
			id: 3,
			title: "UI/UX Design",
			description:
				"User-centric design that focuses on creating intuitive, engaging, and accessible digital experiences.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 19l7-7 3 3-7 7-3-3z"></path>
					<path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
					<path d="M2 2l7.586 7.586"></path>
					<circle cx="11" cy="11" r="2"></circle>
				</svg>
			),
		},
		{
			id: 4,
			title: "E-commerce Solutions",
			description:
				"Complete e-commerce solutions including shopping carts, payment gateways, inventory management, and customer portals.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="9" cy="21" r="1"></circle>
					<circle cx="20" cy="21" r="1"></circle>
					<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
				</svg>
			),
		},
		{
			id: 5,
			title: "API Development",
			description:
				"Robust and scalable API solutions for seamless integration between your applications and third-party services.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="16 18 22 12 16 6"></polyline>
					<polyline points="8 6 2 12 8 18"></polyline>
					<line x1="15" y1="9" x2="9" y2="15"></line>
				</svg>
			),
		},
		{
			id: 6,
			title: "Technical Consulting",
			description:
				"Expert advice on technology stack, architecture, and best practices to help you make informed decisions.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
				</svg>
			),
		},
	];

	return (
		<section id="services" className={styles.services}>
			<div className="container">
				<h2 className="section-title">My Services</h2>
				<p className="section-subtitle">
					Here's what I can do for you and your business
				</p>

				<div className={styles.servicesGrid} ref={ref}>
					{services.map((service, index) => (
						<ServiceCard
							key={service.id}
							service={service}
							isVisible={isVisible}
							delay={index * 0.1}
						/>
					))}
				</div>

				<div
					className={`${styles.servicesContact} ${isVisible ? "fadeIn" : ""}`}
				>
					<div className={styles.servicesContactContent}>
						<h3 className={styles.servicesContactTitle}>
							Need a custom service package?
						</h3>
						<p className={styles.servicesContactText}>
							Contact me today for a free consultation to discuss your project
							requirements and how I can help.
						</p>
						<a href="#contact" className={styles.servicesContactButton}>
							Get in Touch
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
