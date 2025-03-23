import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../../components/common/BackButton/BackButton";
import styles from "./CNCBusinessPage.module.css";

const CNCBusinessPage = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [activeService, setActiveService] = useState("cnc");
	const [activeFaq, setActiveFaq] = useState(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeEquipmentFilter, setActiveEquipmentFilter] = useState("all");
	const headerRef = useRef(null);
	const statsCountersRef = useRef([]);
	const serviceRefs = useRef([]);

	useEffect(() => {
		// Handle page load animation
		setTimeout(() => {
			setIsLoaded(true);
		}, 300);

		// Set up scroll listener for parallax and header effects
		const handleScroll = () => {
			if (!headerRef.current) return;
			const scrollY = window.scrollY;
			setScrollPosition(scrollY);

			if (scrollY > 50) {
				headerRef.current.classList.add(styles.scrolled);
			} else {
				headerRef.current.classList.remove(styles.scrolled);
			}

			// Animate counters when in view
			if (statsCountersRef.current) {
				const statsSection = document.getElementById("stats-section");
				if (statsSection) {
					const rect = statsSection.getBoundingClientRect();
					if (rect.top < window.innerHeight && rect.bottom > 0) {
						statsCountersRef.current.forEach((counter, index) => {
							if (counter && !counter.classList.contains(styles.counted)) {
								counter.classList.add(styles.counted);
								animateCounter(counter, index);
							}
						});
					}
				}
			}

			// Animate services when in view
			if (serviceRefs.current) {
				serviceRefs.current.forEach((service) => {
					if (service) {
						const rect = service.getBoundingClientRect();
						if (rect.top < window.innerHeight - 100) {
							service.classList.add(styles.visible);
						}
					}
				});
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Animate initial elements
		setTimeout(() => {
			if (serviceRefs.current) {
				const visibleServices = serviceRefs.current.filter(
					(service) =>
						service &&
						service.getBoundingClientRect().top < window.innerHeight - 100
				);

				visibleServices.forEach((service) => {
					service.classList.add(styles.visible);
				});
			}
		}, 500);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const animateCounter = (counterElement, index) => {
		const targetValue = parseInt(counterElement.dataset.target, 10);
		const duration = 2000; // 2 seconds
		const delay = index * 200; // Stagger the animations
		const startTime = Date.now() + delay;
		const startValue = 0;

		const updateCounter = () => {
			const now = Date.now();
			const elapsed = now - startTime;

			if (elapsed <= 0) {
				requestAnimationFrame(updateCounter);
				return;
			}

			let progress = Math.min(elapsed / duration, 1);
			// Use easing function for smoother animation
			progress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

			const currentValue = Math.floor(
				startValue + progress * (targetValue - startValue)
			);

			if (counterElement) {
				counterElement.textContent = currentValue.toLocaleString();

				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				}
			}
		};

		requestAnimationFrame(updateCounter);
	};

	// Handle tab change for services section
	const handleServiceChange = (service) => {
		setActiveService(service);
	};

	// Toggle FAQ accordion
	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	// Toggle mobile menu
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Handle equipment filtering
	const handleEquipmentFilter = (filter) => {
		setActiveEquipmentFilter(filter);
	};

	return (
		<div
			className={`${styles.businessContainer} ${isLoaded ? styles.loaded : ""}`}
		>
			{/* Back button to portfolio */}
			<div className={styles.backButtonWrapper}>
				<BackButton />
			</div>

			{/* Header */}
			<header className={styles.header} ref={headerRef}>
				<div className={styles.headerInner}>
					<div className={styles.logoContainer}>
						<h1 className={styles.logo}>
							<span className={styles.logoText}>Metal</span>
							<span className={styles.logoHighlight}>Prec</span>
							<span className={styles.logoBadge}>CNC</span>
						</h1>
					</div>

					<button className={styles.mobileMenuToggle} onClick={toggleMenu}>
						<span className={styles.toggleIcon}></span>
					</button>

					<nav
						className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ""}`}
					>
						<ul>
							<li>
								<a
									href="#usluge"
									onClick={() => isMenuOpen && setIsMenuOpen(false)}
								>
									Usluge
								</a>
							</li>
							<li>
								<a
									href="#oprema"
									onClick={() => isMenuOpen && setIsMenuOpen(false)}
								>
									Oprema
								</a>
							</li>
							<li>
								<a
									href="#onama"
									onClick={() => isMenuOpen && setIsMenuOpen(false)}
								>
									O nama
								</a>
							</li>
							<li>
								<a
									href="#projekti"
									onClick={() => isMenuOpen && setIsMenuOpen(false)}
								>
									Projekti
								</a>
							</li>
							<li>
								<a
									href="#kontakt"
									onClick={() => isMenuOpen && setIsMenuOpen(false)}
								>
									Kontakt
								</a>
							</li>
						</ul>
					</nav>

					<div className={styles.headerActions}>
						<a href="#kontakt" className={styles.ctaButton}>
							<svg
								className={styles.ctaIcon}
								viewBox="0 0 24 24"
								width="18"
								height="18"
							>
								<path
									d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<polyline
									points="7.5 4.21 12 6.81 16.5 4.21"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<polyline
									points="7.5 19.79 7.5 14.6 3 12"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<polyline
									points="21 12 16.5 14.6 16.5 19.79"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<polyline
									points="3.27 6.96 12 12.01 20.73 6.96"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<line
									x1="12"
									y1="22.08"
									x2="12"
									y2="12"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
							Zatražite Ponudu
						</a>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className={styles.main}>
				{/* Hero Section */}
				<section className={styles.heroSection}>
					<div className={styles.heroBackgroundVideo}>
						<img
							src="/cnc.webp"
							alt="CNC machining animation"
							className={styles.videoBackground}
						/>
						<div className={styles.heroOverlay}></div>
					</div>

					<div className={styles.heroContent}>
						<div className={styles.heroIconsBar}>
							<div className={styles.heroIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M3 3h18v18H3V3zm16 16V5H5v14h14z"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
									<path
										d="M14 14h4v4h-4v-4z"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
									<path
										d="M10 7L7 10M14 7l-7 7"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
								<span>CNC Glodanje</span>
							</div>

							<div className={styles.heroIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<circle
										cx="12"
										cy="12"
										r="8"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<path
										d="M12 4v16M4 12h16M7.5 7.5l9 9M7.5 16.5l9-9"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
								<span>CNC Tokarenje</span>
							</div>

							<div className={styles.heroIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M12 2v20M4 4l16 16M20 4L4 20"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
								<span>Lasersko Rezanje</span>
							</div>

							<div className={styles.heroIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<path
										d="M2 12h4M18 12h4M12 2v4M12 18v4"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
									<path
										d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeDasharray="1,1"
									/>
								</svg>
								<span>Zavarivanje</span>
							</div>
						</div>

						<div className={styles.heroTextContent}>
							<div className={styles.metalTextWrapper}>
								<h1 className={styles.metalHeroTitle}>
									<span className={styles.metalEffect}>PRECIZNA</span>
									<span className={styles.heroTitleLine}>
										CNC OBRADA METALA
									</span>
									<span className={styles.heroSubline}>
										Vrhunska kvaliteta & 15+ godina iskustva
									</span>
								</h1>
							</div>

							<div className={styles.heroDetails}>
								<div className={styles.heroDetailItem}>
									<div className={styles.detailIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<circle
												cx="12"
												cy="12"
												r="10"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											/>
											<polyline
												points="12 6 12 12 16 14"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</div>
									<div className={styles.detailText}>
										<span className={styles.detailHighlight}>24-48h</span>
										<span>brza izrada</span>
									</div>
								</div>

								<div className={styles.heroDetailItem}>
									<div className={styles.detailIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<path
												d="M22 12h-4l-3 9L9 3l-3 9H2"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.detailText}>
										<span className={styles.detailHighlight}>±0.01mm</span>
										<span>preciznost</span>
									</div>
								</div>

								<div className={styles.heroDetailItem}>
									<div className={styles.detailIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<path
												d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.detailText}>
										<span className={styles.detailHighlight}>3500+</span>
										<span>projekata</span>
									</div>
								</div>
							</div>

							<div className={styles.heroActions}>
								<a href="#usluge" className={styles.primaryButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.buttonIcon}
									>
										<polygon
											points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									Pogledajte Naše Mašine
								</a>
								<a href="#kontakt" className={styles.secondaryButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.buttonIcon}
									>
										<path
											d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									Zatražite Ponudu
								</a>
							</div>
						</div>
					</div>

					<div className={styles.heroScrollIndicator}>
						<div className={styles.scrollText}>Saznajte više</div>
						<div className={styles.scrollIcon}>
							<svg viewBox="0 0 24 24" width="24" height="24">
								<path
									d="M12 5v14M5 12l7 7 7-7"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</section>

				{/* Highlights Section */}
				<section className={styles.highlightsSection}>
					<div className={styles.sectionPattern}>
						<div className={styles.patternOverlay}></div>
					</div>
					<div className={styles.highlightsInner}>
						<div className={styles.highlightCard}>
							<div className={styles.highlightIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<path
										d="M12 6v6l4 2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							<h3>Brza Isporuka</h3>
							<p>Precizna izrada u kratkim rokovima</p>
							<div className={styles.highlightLine}></div>
							<div className={styles.highlightDetail}>
								24-48h za standardne narudžbe
							</div>
						</div>

						<div className={styles.highlightCard}>
							<div className={styles.highlightIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M22 12h-4l-3 9L9 3l-3 9H2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3>Visoka Preciznost</h3>
							<p>Tolerancije za najzahtjevnije projekte</p>
							<div className={styles.highlightLine}></div>
							<div className={styles.highlightDetail}>
								Tolerancije do ±0.01mm
							</div>
						</div>

						<div className={styles.highlightCard}>
							<div className={styles.highlightIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3>Vrhunski Kvalitet</h3>
							<p>Certifikacija koja garantira kvalitetu</p>
							<div className={styles.highlightLine}></div>
							<div className={styles.highlightDetail}>
								ISO 9001:2015 certificirani
							</div>
						</div>

						<div className={styles.highlightCard}>
							<div className={styles.highlightIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<rect
										x="2"
										y="7"
										width="20"
										height="14"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<path
										d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							<h3>Svi Materijali</h3>
							<p>Stručnost u obradi raznih metala</p>
							<div className={styles.highlightLine}></div>
							<div className={styles.highlightDetail}>
								Od aluminijuma do nerđajućeg čelika
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className={styles.statsSection} id="stats-section">
					<div className={styles.statsOverlay}></div>
					<div className={styles.statsTitleWrapper}>
						<h2 className={styles.statsTitle}>
							Iskustvo Koje Govori Samo Za Sebe
						</h2>
					</div>
					<div className={styles.statsInner}>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<polyline
										points="12 6 12 12 16 14"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							<div className={styles.statValue}>
								<span
									ref={(el) => (statsCountersRef.current[0] = el)}
									data-target="15"
									className={styles.statCounter}
								>
									0
								</span>
								<span className={styles.statUnit}>+</span>
							</div>
							<div className={styles.statLabel}>Godina Iskustva</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<polyline
										points="22 12 18 12 15 21 9 3 6 12 2 12"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<div className={styles.statValue}>
								<span
									ref={(el) => (statsCountersRef.current[1] = el)}
									data-target="3500"
									className={styles.statCounter}
								>
									0
								</span>
								<span className={styles.statUnit}>+</span>
							</div>
							<div className={styles.statLabel}>Završenih Projekata</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle
										cx="9"
										cy="7"
										r="4"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<path
										d="M23 21v-2a4 4 0 0 0-3-3.87"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<path
										d="M16 3.13a4 4 0 0 1 0 7.75"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							<div className={styles.statValue}>
								<span
									ref={(el) => (statsCountersRef.current[2] = el)}
									data-target="120"
									className={styles.statCounter}
								>
									0
								</span>
								<span className={styles.statUnit}>+</span>
							</div>
							<div className={styles.statLabel}>Zadovoljnih Klijenata</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<rect
										x="2"
										y="2"
										width="20"
										height="8"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<rect
										x="2"
										y="14"
										width="20"
										height="8"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<line
										x1="6"
										y1="6"
										x2="6.01"
										y2="6"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="6"
										y1="18"
										x2="6.01"
										y2="18"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							<div className={styles.statValue}>
								<span
									ref={(el) => (statsCountersRef.current[3] = el)}
									data-target="12"
									className={styles.statCounter}
								>
									0
								</span>
								<span className={styles.statUnit}>+</span>
							</div>
							<div className={styles.statLabel}>CNC Mašina</div>
						</div>
					</div>
				</section>

				{/* Services Section */}
				<section className={styles.servicesSection} id="usluge">
					<div className={styles.sectionHeading}>
						<h2>Precizne CNC Usluge</h2>
						<p>
							Kompletna rješenja za obradu metala prema vašim specifikacijama
						</p>
					</div>

					<div className={styles.tabsContainer}>
						<div className={styles.tabsHeader}>
							<button
								className={`${styles.tabButton} ${
									activeService === "cnc" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("cnc")}
							>
								<span className={styles.tabIcon}>
									<svg viewBox="0 0 24 24" width="24" height="24">
										<path
											d="M3 3h18v18H3z"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<path
											d="M9 3v18M15 3v18M3 9h18M3 15h18"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
								</span>
								CNC Glodanje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "turning" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("turning")}
							>
								<span className={styles.tabIcon}>
									<svg viewBox="0 0 24 24" width="24" height="24">
										<circle
											cx="12"
											cy="12"
											r="10"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<line
											x1="2"
											y1="12"
											x2="22"
											y2="12"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<line
											x1="12"
											y1="2"
											x2="12"
											y2="22"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
								</span>
								CNC Tokarenje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "laser" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("laser")}
							>
								<span className={styles.tabIcon}>
									<svg viewBox="0 0 24 24" width="24" height="24">
										<circle
											cx="12"
											cy="12"
											r="10"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<line
											x1="12"
											y1="2"
											x2="12"
											y2="22"
											stroke="currentColor"
											strokeWidth="2"
											strokeDasharray="1,1"
										/>
										<line
											x1="2"
											y1="12"
											x2="22"
											y2="12"
											stroke="currentColor"
											strokeWidth="2"
											strokeDasharray="1,1"
										/>
										<path
											d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
								</span>
								Lasersko Rezanje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "welding" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("welding")}
							>
								<span className={styles.tabIcon}>
									<svg viewBox="0 0 24 24" width="24" height="24">
										<polyline
											points="23 6 13.5 15.5 8.5 10.5 1 18"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<polyline
											points="17 6 23 6 23 12"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								Zavarivanje
							</button>
						</div>

						<div className={styles.tabsContent}>
							<div
								className={`${styles.tabPanel} ${
									activeService === "cnc" ? styles.activePanel : ""
								}`}
							>
								<div className={styles.tabContent}>
									<div className={styles.serviceBadge}>
										Najpopularnija usluga
									</div>
									<h3>CNC Glodanje</h3>
									<p>
										Nudimo visoko preciznu CNC obradu glodanjem za širok spektar
										potreba. Naše moderne 3-osne i 5-osne CNC mašine omogućavaju
										izradu kompleksnih dijelova s visokom preciznošću.
									</p>

									<ul className={styles.featuresList}>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>3-osno i 5-osno glodanje</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Tolerancije do ±0.01mm</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Pojedinačni dijelovi i serijska proizvodnja</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Obrada svih vrsta metala</span>
										</li>
									</ul>

									<div className={styles.serviceParams}>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Max. dimenzije</div>
											<div className={styles.paramValue}>
												1500 x 800 x 500 mm
											</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Materijali</div>
											<div className={styles.paramValue}>
												Aluminijum, čelik, inox, titan, bakar, mesing...
											</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Preciznost</div>
											<div className={styles.paramValue}>±0.01mm - ±0.05mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Isporuka</div>
											<div className={styles.paramValue}>3-10 radnih dana</div>
										</div>
									</div>

									<a href="#kontakt" className={styles.serviceButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
										alt="CNC Glodanje"
									/>
									<div className={styles.imageCaption}>
										5-osno CNC glodanje složenih dijelova
									</div>
								</div>
							</div>

							<div
								className={`${styles.tabPanel} ${
									activeService === "turning" ? styles.activePanel : ""
								}`}
							>
								<div className={styles.tabContent}>
									<h3>CNC Tokarenje</h3>
									<p>
										Naš pogon opremljen je modernim CNC tokarilicama za preciznu
										izradu rotacionih dijelova po vašim nacrtima. Možemo
										osigurati visoku preciznost i kvalitetu završne obrade.
									</p>

									<ul className={styles.featuresList}>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>CNC tokarenje s pogonskim alatima</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Promjeri od 1mm do 500mm</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Višeosno tokarenje kompleksnih oblika</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Povoljno za manje i velike serije</span>
										</li>
									</ul>

									<div className={styles.serviceParams}>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Max. promjer</div>
											<div className={styles.paramValue}>500 mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Max. dužina</div>
											<div className={styles.paramValue}>1000 mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Preciznost</div>
											<div className={styles.paramValue}>±0.01mm - ±0.03mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Isporuka</div>
											<div className={styles.paramValue}>2-7 radnih dana</div>
										</div>
									</div>

									<a href="#kontakt" className={styles.serviceButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://metron.ba/wp-content/uploads/2022/11/c1-1024x683.jpg"
										alt="CNC Tokarenje"
									/>
									<div className={styles.imageCaption}>
										Precizno CNC tokarenje metalnih komponenti
									</div>
								</div>
							</div>

							<div
								className={`${styles.tabPanel} ${
									activeService === "laser" ? styles.activePanel : ""
								}`}
							>
								<div className={styles.tabContent}>
									<h3>Lasersko Rezanje</h3>
									<p>
										Sa našim naprednim laserskim sistemima za rezanje nudimo
										izuzetno precizne rezove različitih materijala. Idealno za
										kompleksne oblike i brzu proizvodnju.
									</p>

									<ul className={styles.featuresList}>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Rezanje metala debljine do 20mm</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Visoka preciznost i kvaliteta reza</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Brza izrada prototipova</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Ekonomično za složene oblike</span>
										</li>
									</ul>

									<div className={styles.serviceParams}>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Max. dimenzije</div>
											<div className={styles.paramValue}>3000 x 1500 mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Max. debljina</div>
											<div className={styles.paramValue}>
												20 mm (čelik), 15 mm (inox), 10 mm (aluminijum)
											</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Preciznost</div>
											<div className={styles.paramValue}>±0.1mm</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Isporuka</div>
											<div className={styles.paramValue}>1-5 radnih dana</div>
										</div>
									</div>

									<a href="#kontakt" className={styles.serviceButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
										alt="Lasersko Rezanje"
									/>
									<div className={styles.imageCaption}>
										Precizno lasersko rezanje metala
									</div>
								</div>
							</div>

							<div
								className={`${styles.tabPanel} ${
									activeService === "welding" ? styles.activePanel : ""
								}`}
							>
								<div className={styles.tabContent}>
									<h3>Zavarivanje</h3>
									<p>
										Naši certificirani zavarivači koriste najmodernije metode za
										spajanje svih vrsta metala. Nudimo TIG, MIG/MAG i druge
										metode zavarivanja sa najvišim standardima kvalitete.
									</p>

									<ul className={styles.featuresList}>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>TIG, MIG/MAG zavarivanje</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Zavarivanje aluminijuma i nerđajućih čelika</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Certificirani zavarivači</span>
										</li>
										<li>
											<span className={styles.featureIcon}>
												<svg viewBox="0 0 24 24" width="24" height="24">
													<polyline
														points="20 6 9 17 4 12"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span>Za konstrukcije i pojedinačne dijelove</span>
										</li>
									</ul>

									<div className={styles.serviceParams}>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Metode</div>
											<div className={styles.paramValue}>TIG, MIG, MAG</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Materijali</div>
											<div className={styles.paramValue}>
												Aluminijum, čelik, inox, specijalne legure
											</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Certifikati</div>
											<div className={styles.paramValue}>
												EN ISO 9606-1, EN ISO 9606-2
											</div>
										</div>
										<div className={styles.serviceParam}>
											<div className={styles.paramLabel}>Primjena</div>
											<div className={styles.paramValue}>
												Konstrukcije, tačkasto zavarivanje, reparature
											</div>
										</div>
									</div>

									<a href="#kontakt" className={styles.serviceButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://weld-tech.co.za/images/GP500_%20smaller.jpg"
										alt="Zavarivanje"
									/>
									<div className={styles.imageCaption}>
										Profesionalno zavarivanje metalnih konstrukcija
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Equipment Section */}
				<section className={styles.equipmentSection} id="oprema">
					<div className={styles.sectionHeading}>
						<h2>Naša CNC Oprema</h2>
						<p>Najmodernija tehnologija za vrhunske rezultate</p>
					</div>

					<div className={styles.equipmentFilters}>
						<button
							className={`${styles.filterButton} ${
								activeEquipmentFilter === "all" ? styles.activeFilter : ""
							}`}
							onClick={() => handleEquipmentFilter("all")}
						>
							Sva oprema
						</button>
						<button
							className={`${styles.filterButton} ${
								activeEquipmentFilter === "milling" ? styles.activeFilter : ""
							}`}
							onClick={() => handleEquipmentFilter("milling")}
						>
							Glodalice
						</button>
						<button
							className={`${styles.filterButton} ${
								activeEquipmentFilter === "turning" ? styles.activeFilter : ""
							}`}
							onClick={() => handleEquipmentFilter("turning")}
						>
							Tokarilice
						</button>
						<button
							className={`${styles.filterButton} ${
								activeEquipmentFilter === "laser" ? styles.activeFilter : ""
							}`}
							onClick={() => handleEquipmentFilter("laser")}
						>
							Laseri
						</button>
					</div>

					<div className={styles.equipmentGrid}>
						<div
							className={`${styles.equipmentCard} ${
								activeEquipmentFilter === "all" ||
								activeEquipmentFilter === "milling"
									? styles.visible
									: styles.hidden
							}`}
							ref={(el) => (serviceRefs.current[0] = el)}
							data-category="milling"
						>
							<div className={styles.equipmentImageWrapper}>
								<img
									src="https://www.haascnc.com/content/dam/haascnc/machines/vertical-mills/vf-series/models/small/vf-2/gallery/haasvf2-rangle.jpg"
									alt="Haas VF-2 CNC Glodalica"
									className={styles.equipmentImage}
								/>
								<div className={styles.equipmentOverlay}>
									<div className={styles.equipmentType}>CNC Glodalica</div>
								</div>
							</div>
							<div className={styles.equipmentContent}>
								<h3>Haas VF-2 CNC Glodalica</h3>
								<div className={styles.equipmentDetails}>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Radni prostor:</span>
										<span className={styles.detailValue}>
											762 x 406 x 508 mm
										</span>
									</div>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Snaga vretena:</span>
										<span className={styles.detailValue}>22.4 kW</span>
									</div>
								</div>
								<ul className={styles.equipmentSpecs}>
									<li>Vreteno 12.000 o/min</li>
									<li>Izmjenjivač sa 24 alata</li>
									<li>Kontrola Haas CNC</li>
									<li>Preciznost pozicioniranja ±0.0051 mm</li>
								</ul>
								<div className={styles.equipmentFooter}>
									<div className={styles.equipmentBadge}>3-osna</div>
									<button className={styles.equipmentMoreButton}>
										Tehničke specifikacije
									</button>
								</div>
							</div>
						</div>

						<div
							className={`${styles.equipmentCard} ${
								activeEquipmentFilter === "all" ||
								activeEquipmentFilter === "turning"
									? styles.visible
									: styles.hidden
							}`}
							ref={(el) => (serviceRefs.current[1] = el)}
							data-category="turning"
						>
							<div className={styles.equipmentImageWrapper}>
								<img
									src="https://uk.dmgmori.com/resource/image/16478/product_picture/xs/10/nlx-2500-product-picture.png"
									alt="DMG MORI NLX 2500"
									className={styles.equipmentImage}
								/>
								<div className={styles.equipmentOverlay}>
									<div className={styles.equipmentType}>CNC Tokarilica</div>
								</div>
							</div>
							<div className={styles.equipmentContent}>
								<h3>DMG MORI NLX 2500</h3>
								<div className={styles.equipmentDetails}>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Max. promjer:</span>
										<span className={styles.detailValue}>Ø460 mm</span>
									</div>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Max. dužina:</span>
										<span className={styles.detailValue}>730 mm</span>
									</div>
								</div>
								<ul className={styles.equipmentSpecs}>
									<li>Vreteno 4.000 o/min</li>
									<li>Pogonjeni alati za glodanje i bušenje</li>
									<li>Y-osa za kompleksne obrade</li>
									<li>Visoka preciznost i stabilnost</li>
								</ul>
								<div className={styles.equipmentFooter}>
									<div className={styles.equipmentBadge}>Power Turning</div>
									<button className={styles.equipmentMoreButton}>
										Tehničke specifikacije
									</button>
								</div>
							</div>
						</div>

						<div
							className={`${styles.equipmentCard} ${
								activeEquipmentFilter === "all" ||
								activeEquipmentFilter === "laser"
									? styles.visible
									: styles.hidden
							}`}
							ref={(el) => (serviceRefs.current[2] = el)}
							data-category="laser"
						>
							<div className={styles.equipmentImageWrapper}>
								<img
									src="https://www.trumpf.com/filestorage/TRUMPF_Processed/_processed_/b/e/csm_TruLaser-5030-fiber-L76-process-cooler_1eab22bf1c_72ed30c55c.jpg"
									alt="Trumpf TruLaser 3030"
									className={styles.equipmentImage}
								/>
								<div className={styles.equipmentOverlay}>
									<div className={styles.equipmentType}>Fiber Laser</div>
								</div>
							</div>
							<div className={styles.equipmentContent}>
								<h3>Trumpf TruLaser 3030</h3>
								<div className={styles.equipmentDetails}>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Radni prostor:</span>
										<span className={styles.detailValue}>3000 x 1500 mm</span>
									</div>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Snaga lasera:</span>
										<span className={styles.detailValue}>4 kW</span>
									</div>
								</div>
								<ul className={styles.equipmentSpecs}>
									<li>Visokoprecizni fiber laser</li>
									<li>Rezanje materijala do 20 mm</li>
									<li>Preciznost rezanja ±0.1 mm</li>
									<li>Automatizirano punjenje i uklanjanje materijala</li>
								</ul>
								<div className={styles.equipmentFooter}>
									<div className={styles.equipmentBadge}>4kW Fiber</div>
									<button className={styles.equipmentMoreButton}>
										Tehničke specifikacije
									</button>
								</div>
							</div>
						</div>

						<div
							className={`${styles.equipmentCard} ${
								activeEquipmentFilter === "all" ||
								activeEquipmentFilter === "milling"
									? styles.visible
									: styles.hidden
							}`}
							ref={(el) => (serviceRefs.current[3] = el)}
							data-category="milling"
						>
							<div className={styles.equipmentImageWrapper}>
								<img
									src="https://www.todaysmedicaldevelopments.com/remote/aHR0cHM6Ly9naWVjZG4uYmxvYi5jb3JlLndpbmRvd3MubmV0L2ZpbGV1cGxvYWRzL2ltYWdlLzIwMjQvMDUvMjkvZG11NDBfc3RlYWx0aC5wbmc.E11-RzAs7y4.png?format=webp"
									alt="DMG MORI DMU 50"
									className={styles.equipmentImage}
								/>
								<div className={styles.equipmentOverlay}>
									<div className={styles.equipmentType}>5-osna Glodalica</div>
								</div>
							</div>
							<div className={styles.equipmentContent}>
								<h3>DMG MORI DMU 50</h3>
								<div className={styles.equipmentDetails}>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Radni prostor:</span>
										<span className={styles.detailValue}>
											500 x 450 x 400 mm
										</span>
									</div>
									<div className={styles.equipmentDetail}>
										<span className={styles.detailLabel}>Brzina vretena:</span>
										<span className={styles.detailValue}>18.000 o/min</span>
									</div>
								</div>
								<ul className={styles.equipmentSpecs}>
									<li>5-osna simultana obrada</li>
									<li>Savršeno za najkompleksnije geometrije</li>
									<li>Kontrola DMG MORI CELOS</li>
									<li>Visoka dinamika i preciznost</li>
								</ul>
								<div className={styles.equipmentFooter}>
									<div className={styles.equipmentBadge}>5-osna Simultana</div>
									<button className={styles.equipmentMoreButton}>
										Tehničke specifikacije
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.equipmentCta}>
						<div className={styles.ctaText}>
							<h3>Trebate dodatne informacije o našim mašinama?</h3>
							<p>
								Naš stručni tim je spreman odgovoriti na sva vaša pitanja o
								specifikacijama i mogućnostima naše opreme.
							</p>
						</div>
						<a href="#kontakt" className={styles.primaryButton}>
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								className={styles.buttonIcon}
							>
								<path
									d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Kontaktirajte Inžinjera
						</a>
					</div>
				</section>

				{/* About Section */}
				<section className={styles.aboutSection} id="onama">
					<div className={styles.aboutBackground}></div>
					<div className={styles.aboutContent}>
						<div className={styles.aboutHeader}>
							<span className={styles.sectionLabel}>O Nama</span>
							<h2>Tradicija i Inovacija</h2>
						</div>

						<p className={styles.aboutText}>
							<span className={styles.companyHighlight}>MetalPrec</span> je
							vodeća firma za CNC obradu metala u regiji, osnovana 2008. godine.
							Sa više od 15 godina iskustva, specijalizirali smo se za preciznu
							obradu metala koristeći najmodernije CNC tehnologije.
						</p>

						<p className={styles.aboutText}>
							Naš tim od preko 35 visokokvalifikovanih inžinjera, tehničara i
							operatera posvećen je pružanju vrhunske kvalitete i preciznosti u
							svakom projektu. Kontinuirano ulaganje u najnoviju tehnologiju
							omogućava nam da ostanemo lideri u industriji.
						</p>

						<div className={styles.valueProps}>
							<div className={styles.valueProp}>
								<div className={styles.valuePropIcon}>
									<svg viewBox="0 0 24 24" width="32" height="32">
										<path
											d="M22 12h-4l-3 9L9 3l-3 9H2"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div className={styles.valuePropContent}>
									<h4>ISO 9001:2015 Certificirani</h4>
									<p>Garancija kvalitete kroz cijeli proizvodni proces</p>
								</div>
							</div>

							<div className={styles.valueProp}>
								<div className={styles.valuePropIcon}>
									<svg viewBox="0 0 24 24" width="32" height="32">
										<path
											d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div className={styles.valuePropContent}>
									<h4>Fokus na Inovacije</h4>
									<p>Kontinuirano ulaganje u nove tehnologije</p>
								</div>
							</div>

							<div className={styles.valueProp}>
								<div className={styles.valuePropIcon}>
									<svg viewBox="0 0 24 24" width="32" height="32">
										<path
											d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div className={styles.valuePropContent}>
									<h4>Stručni Tim</h4>
									<p>Visokokvalifikovani inžinjeri i tehničari</p>
								</div>
							</div>

							<div className={styles.valueProp}>
								<div className={styles.valuePropIcon}>
									<svg viewBox="0 0 24 24" width="32" height="32">
										<path
											d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<polyline
											points="3.27 6.96 12 12.01 20.73 6.96"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<line
											x1="12"
											y1="22.08"
											x2="12"
											y2="12"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
								</div>
								<div className={styles.valuePropContent}>
									<h4>Mogućnost Prototipizacije</h4>
									<p>Brz razvoj prototipova i uzoraka</p>
								</div>
							</div>
						</div>

						<div className={styles.aboutActions}>
							<a href="#projekti" className={styles.primaryButton}>
								<svg
									viewBox="0 0 24 24"
									width="20"
									height="20"
									className={styles.buttonIcon}
								>
									<rect
										x="2"
										y="3"
										width="20"
										height="14"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="8"
										y1="21"
										x2="16"
										y2="21"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="12"
										y1="17"
										x2="12"
										y2="21"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								Naši Projekti
							</a>
							<a href="#kontakt" className={styles.secondaryButtonDark}>
								<svg
									viewBox="0 0 24 24"
									width="20"
									height="20"
									className={styles.buttonIcon}
								>
									<path
										d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<polyline
										points="14 2 14 8 20 8"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="9"
										y1="15"
										x2="15"
										y2="15"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								Kompanijski Profil
							</a>
						</div>
					</div>

					<div className={styles.aboutImage}>
						<img
							src="https://images.unsplash.com/photo-1586765677067-f8030bd8e303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
							alt="MetalPrec Tim"
						/>
						<div className={styles.aboutImageOverlay}>
							<div className={styles.overlayText}>
								<div className={styles.overlayNumber}>15+</div>
								<div className={styles.overlayLabel}>godina iskustva</div>
							</div>
						</div>
					</div>
				</section>

				{/* Projects/Gallery Section */}
				<section className={styles.projectsSection} id="projekti">
					<div className={styles.sectionHeading}>
						<h2>Naši Projekti</h2>
						<p>Primjeri našeg rada i stručnosti u CNC obradi metala</p>
					</div>

					<div className={styles.projectsGrid}>
						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://images.unsplash.com/photo-1581093583449-8255a7d46e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
									alt="Komponente za automobilsku industriju"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>Aluminijum, čelik</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>
											CNC glodanje, tokarenje
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>±0.02mm</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>
									Automobilska industrija
								</div>
								<h3>Komponente za sigurnosne sisteme</h3>
								<p>
									Precizni CNC dijelovi za sigurnosne sisteme automobila visokog
									performansa
								</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://cdn.prod.website-files.com/62b58ca8abc6088f2afd1f66/62c581074d4487c0a94f58ac_medical-4600914_1920.jpg"
									alt="Medicinska oprema"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>Titanijum, inox</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>5-osno CNC glodanje</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>±0.01mm</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>
									Medicinska industrija
								</div>
								<h3>Komponente za dijagnostičke uređaje</h3>
								<p>Visokoprecizni dijelovi za naprednu medicinsku opremu</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://www.improprecision.com/wp-content/uploads/2021/06/Hydraulic.png"
									alt="Hidrauličke komponente"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>Legure čelika, inox</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>
											CNC tokarenje, glodanje
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>±0.03mm</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>Hidraulika</div>
								<h3>Visokotlačni ventili i kontrolni blokovi</h3>
								<p>
									Precizno obrađene komponente za hidrauličke sisteme pod
									visokim pritiskom
								</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://prototool.com/wp-content/uploads/2022/06/a-shelf-of-CNC-machine-tools-1024x576.jpg"
									alt="Alati i kalupi"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>
											Alatni čelik, specijalne legure
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>
											CNC glodanje, obrada žicom
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>±0.005mm</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>Tooling</div>
								<h3>Alati i kalupi</h3>
								<p>
									Specijalizirani alati za injekcijsko brizganje i precizne
									kalupe
								</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://images.pexels.com/photos/28929545/pexels-photo-28929545/free-photo-of-industrial-welder-at-work-on-large-machine-part.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt="Zrakoplovne komponente"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>
											Titanijum, aluminijumske legure
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>5-osno CNC glodanje</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>±0.01mm</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>Avijacija</div>
								<h3>Zrakoplovne komponente</h3>
								<p>
									Visokoprecizni dijelovi za avionsku industriju sa strogim
									standardima
								</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={styles.projectImageWrapper}>
								<img
									src="https://robersontool.com/wp-content/uploads/2022/04/Prototyping-4.jpg"
									alt="Prototipovi"
								/>
								<div className={styles.projectOverlay}>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Materijal</div>
										<div className={styles.specValue}>
											Razni metali i legure
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Proces</div>
										<div className={styles.specValue}>
											CNC glodanje, tokarenje, laser
										</div>
									</div>
									<div className={styles.projectSpec}>
										<div className={styles.specLabel}>Tolerancija</div>
										<div className={styles.specValue}>prema specifikaciji</div>
									</div>
								</div>
							</div>
							<div className={styles.projectContent}>
								<div className={styles.projectCategory}>R&D</div>
								<h3>Prototipovi</h3>
								<p>
									Brza izrada prototipova za inovativne projekte i razvojne
									potrebe
								</p>
							</div>
						</div>
					</div>

					<div className={styles.projectCta}>
						<a href="#kontakt" className={styles.primaryButton}>
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								className={styles.buttonIcon}
							>
								<path
									d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Razgovarajte s Nama o Vašem Projektu
						</a>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className={styles.testimonialsSection}>
					<div className={styles.testimonialPattern}></div>
					<div className={styles.sectionHeading}>
						<h2>Šta Kažu Naši Klijenti</h2>
						<p>Iskustva zadovoljnih partnera</p>
					</div>

					<div className={styles.testimonialsGrid}>
						<div className={styles.testimonialCard}>
							<div className={styles.testimonialContent}>
								<div className={styles.quoteIcon}>
									<svg viewBox="0 0 24 24" width="36" height="36">
										<path
											d="M10 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
										<path
											d="M22 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
									</svg>
								</div>
								<p>
									MetalPrec je naš dugogodišnji partner za sve naše potrebe za
									obradu metala. Preciznost i kvaliteta njihovih proizvoda je
									besprijekorna, a rokovi isporuke se uvijek poštuju.
									Inžinjerski tim uvijek pronalazi optimalno rješenje za naše
									najzahtevnije projekte.
								</p>
								<div className={styles.testimonialAuthor}>
									<div className={styles.authorAvatar}>
										<img
											src="https://randomuser.me/api/portraits/men/41.jpg"
											alt="Admir Hadžić"
										/>
									</div>
									<div className={styles.authorInfo}>
										<h4>Admir Hadžić</h4>
										<p>Tehnički direktor, Tehnika d.o.o.</p>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.testimonialCard}>
							<div className={styles.testimonialContent}>
								<div className={styles.quoteIcon}>
									<svg viewBox="0 0 24 24" width="36" height="36">
										<path
											d="M10 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
										<path
											d="M22 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
									</svg>
								</div>
								<p>
									Složen zadatak izrade prototipa za naš novi proizvod bio je
									izvršen savršeno i u rekordnom roku. Profesionalnost i
									stručnost osoblja je impresivna. MetalPrec nam je omogućio da
									ubrzamo proces razvoja i lako prijeđemo u proizvodnu fazu.
								</p>
								<div className={styles.testimonialAuthor}>
									<div className={styles.authorAvatar}>
										<img
											src="https://randomuser.me/api/portraits/women/63.jpg"
											alt="Amina Kovačević"
										/>
									</div>
									<div className={styles.authorInfo}>
										<h4>Amina Kovačević</h4>
										<p>R&D Manager, Inovacija Grupa</p>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.testimonialCard}>
							<div className={styles.testimonialContent}>
								<div className={styles.quoteIcon}>
									<svg viewBox="0 0 24 24" width="36" height="36">
										<path
											d="M10 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
										<path
											d="M22 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 00-1-1z"
											fill="currentColor"
										/>
									</svg>
								</div>
								<p>
									Suradnja s MetalPrec-om drastično je poboljšala našu
									proizvodnju. Njihova sposobnost da isporuče složene dijelove
									konstantne kvalitete omogućila nam je da povećamo
									produktivnost. Posebno cijenimo njihovu brzinu reakcije na
									naše hitne zahtjeve.
								</p>
								<div className={styles.testimonialAuthor}>
									<div className={styles.authorAvatar}>
										<img
											src="https://randomuser.me/api/portraits/men/29.jpg"
											alt="Emir Begić"
										/>
									</div>
									<div className={styles.authorInfo}>
										<h4>Emir Begić</h4>
										<p>Vlasnik, Auto-Dijelovi d.o.o</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className={styles.faqSection}>
					<div className={styles.sectionHeading}>
						<h2>Često Postavljana Pitanja</h2>
						<p>Odgovori na najčešća pitanja o našim CNC uslugama</p>
					</div>

					<div className={styles.faqList}>
						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 0 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(0)}
							>
								<span>Koji je minimalni broj komada za narudžbu?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 0 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 0 ? styles.show : ""
								}`}
							>
								<p>
									Ne postoji minimalna količina. Nudimo usluge od pojedinačnih
									prototipova do velikih serija od nekoliko hiljada komada.
									Cijena po komadu će varirati ovisno o količini, ali smo
									fleksibilni za sve vrste zahtjeva.
								</p>
							</div>
						</div>

						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 1 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(1)}
							>
								<span>Koliko brzo možete isporučiti dijelove?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 1 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 1 ? styles.show : ""
								}`}
							>
								<p>
									Vrijeme isporuke zavisi od složenosti i količine.
									Jednostavnije dijelove možemo isporučiti u roku od 3-5 radnih
									dana, dok za složenije projekte ili veće serije može biti
									potrebno 1-3 sedmice. Za hitne projekte, nudimo i usluge
									ubrzane proizvodnje uz dodatnu naknadu.
								</p>
							</div>
						</div>

						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 2 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(2)}
							>
								<span>Koje materijale obrađujete?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 2 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 2 ? styles.show : ""
								}`}
							>
								<p>
									Obrađujemo širok spektar materijala uključujući aluminijum i
									legure, nehrđajuće čelike, čelik, titan, bakar, mesing,
									bronze, plastike i mnoge druge specifične materijale. Ako
									imate posebne zahtjeve za materijal, slobodno nas
									kontaktirajte s upitom.
								</p>
							</div>
						</div>

						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 3 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(3)}
							>
								<span>Koje formate tehničkih crteža prihvatate?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 3 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 3 ? styles.show : ""
								}`}
							>
								<p>
									Prihvatamo većinu CAD formata uključujući STEP, IGES,
									SolidWorks, AutoCAD, Inventor, DXF i PDF. Ako imate fizički
									dio koji treba replicirati, možemo također koristiti 3D
									skeniranje za stvaranje digitalnog modela. Naš inžinjerski tim
									može vam pomoći u pripremi dokumentacije ako je potrebno.
								</p>
							</div>
						</div>

						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 4 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(4)}
							>
								<span>Da li nudite usluge projektovanja?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 4 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 4 ? styles.show : ""
								}`}
							>
								<p>
									Da, naš inžinjerski tim pruža kompletne usluge projektovanja.
									Možemo raditi na osnovu vaših koncepata ili ideja i razviti
									potpune tehničke crteže i 3D modele. Također nudimo usluge
									optimizacije postojećih dizajna za proizvodnju, što može
									značajno smanjiti troškove i poboljšati funkcionalnost.
								</p>
							</div>
						</div>

						<div className={styles.faqItem}>
							<button
								className={`${styles.faqQuestion} ${
									activeFaq === 5 ? styles.active : ""
								}`}
								onClick={() => toggleFaq(5)}
							>
								<span>Kako garantirate kvalitetu proizvodnje?</span>
								<span className={styles.faqIcon}>
									{activeFaq === 5 ? (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									) : (
										<svg viewBox="0 0 24 24" width="24" height="24">
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									)}
								</span>
							</button>
							<div
								className={`${styles.faqAnswer} ${
									activeFaq === 5 ? styles.show : ""
								}`}
							>
								<p>
									Koristimo napredne metode kontrole kvalitete kroz cijeli
									proizvodni proces. Svaki izrađeni dio prolazi kroz rigoroznu
									kontrolu kvalitete koristeći precizne mjerne instrumente kao
									što su CMM (Coordinate Measuring Machine) i optički mjerni
									sustavi. Svi naši procesi su ISO 9001:2015 certificirani, a za
									posebno zahtjevne industrije poput zrakoplovne i medicinske
									imamo dodatne specijalizirane certifikate.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Process Section */}
				<section className={styles.processSection}>
					<div className={styles.sectionHeading}>
						<h2>Naš Proces Rada</h2>
						<p>Jednostavan put od vaše ideje do gotovog proizvoda</p>
					</div>

					<div className={styles.processSteps}>
						<div className={styles.processStep}>
							<div className={styles.processIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<line
										x1="12"
										y1="8"
										x2="12"
										y2="12"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="12"
										y1="16"
										x2="12.01"
										y2="16"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<div className={styles.stepNumber}>01</div>
							</div>
							<div className={styles.processContent}>
								<h3>Upit i Konsultacije</h3>
								<p>
									Pošaljite nam vaše zahtjeve, tehnički crtež ili 3D model. Naš
									tim će analizirati projekat i pružiti vam savjete za
									optimizaciju.
								</p>
							</div>
						</div>

						<div className={styles.processStep}>
							<div className={styles.processIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<rect
										x="3"
										y="3"
										width="18"
										height="18"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<line
										x1="3"
										y1="9"
										x2="21"
										y2="9"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<line
										x1="9"
										y1="21"
										x2="9"
										y2="9"
										stroke="currentColor"
										strokeWidth="2"
									/>
								</svg>
								<div className={styles.stepNumber}>02</div>
							</div>
							<div className={styles.processContent}>
								<h3>Ponuda i Planiranje</h3>
								<p>
									Dobit ćete detaljnu ponudu s cijenom i rokovima isporuke.
									Nakon potvrde, projekt ulazi u fazu planiranja proizvodnje.
								</p>
							</div>
						</div>

						<div className={styles.processStep}>
							<div className={styles.processIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<polyline
										points="16 3 21 3 21 8"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="4"
										y1="20"
										x2="21"
										y2="3"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<path
										d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<div className={styles.stepNumber}>03</div>
							</div>
							<div className={styles.processContent}>
								<h3>Proizvodnja</h3>
								<p>
									Naši stručnjaci izrađuju vaše dijelove koristeći najmoderniju
									CNC opremu, strogo prateći tehničke specifikacije.
								</p>
							</div>
						</div>

						<div className={styles.processStep}>
							<div className={styles.processIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<path
										d="M22 11.08V12a10 10 0 11-5.93-9.14"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<polyline
										points="22 4 12 14.01 9 11.01"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<div className={styles.stepNumber}>04</div>
							</div>
							<div className={styles.processContent}>
								<h3>Kontrola Kvalitete</h3>
								<p>
									Svaki dio prolazi detaljnu kontrolu kvalitete kako bi se
									osiguralo da sve dimenzije i karakteristike odgovaraju
									zahtjevima.
								</p>
							</div>
						</div>

						<div className={styles.processStep}>
							<div className={styles.processIcon}>
								<svg viewBox="0 0 24 24" width="40" height="40">
									<rect
										x="1"
										y="3"
										width="15"
										height="13"
										rx="2"
										ry="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<circle
										cx="16"
										cy="16"
										r="6"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<circle
										cx="16"
										cy="16"
										r="2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									/>
								</svg>
								<div className={styles.stepNumber}>05</div>
							</div>
							<div className={styles.processContent}>
								<h3>Isporuka</h3>
								<p>
									Gotovi proizvodi se pažljivo pakiraju i isporučuju na vašu
									adresu. Uz proizvode dobijate i svu potrebnu dokumentaciju.
								</p>
							</div>
						</div>
					</div>

					<div className={styles.processCta}>
						<a href="#kontakt" className={styles.primaryButton}>
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								className={styles.buttonIcon}
							>
								<polyline
									points="23 4 23 10 17 10"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<path
									d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
							Započnite Proces Danas
						</a>
					</div>
				</section>

				{/* CTA Section / Contact */}
				<section className={styles.ctaSection} id="kontakt">
					<div className={styles.ctaContent}>
						<div className={styles.ctaHeader}>
							<h2>Spremni za saradnju?</h2>
							<p>
								Kontaktirajte nas danas za besplatnu ponudu za vaš CNC projekt
							</p>
						</div>

						<div className={styles.contactWrapper}>
							<div className={styles.contactForm}>
								<div className={styles.formHeader}>
									<div className={styles.formTitle}>Zatražite ponudu</div>
									<div className={styles.formSubtitle}>
										Popunite formular i odgovorit ćemo u roku od 24 sata
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="name">Vaše ime</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<path
												d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<circle
												cx="12"
												cy="7"
												r="4"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<input
											type="text"
											id="name"
											placeholder="Unesite vaše ime"
										/>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="company">Naziv firme</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<path
												d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<polyline
												points="9 22 9 12 15 12 15 22"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<input
											type="text"
											id="company"
											placeholder="Unesite naziv firme"
										/>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="email">Email adresa</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<path
												d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<polyline
												points="22,6 12,13 2,6"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<input
											type="email"
											id="email"
											placeholder="Unesite email adresu"
										/>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="phone">Telefon</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<path
												d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<input
											type="tel"
											id="phone"
											placeholder="Unesite broj telefona"
										/>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="service">Potrebna usluga</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<path
												d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<polyline
												points="3.29 7 12 12 20.71 7"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="12"
												y1="22"
												x2="12"
												y2="12"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<select id="service">
											<option value="">Odaberite uslugu</option>
											<option value="cnc-milling">CNC Glodanje</option>
											<option value="cnc-turning">CNC Tokarenje</option>
											<option value="laser-cutting">Lasersko Rezanje</option>
											<option value="welding">Zavarivanje</option>
											<option value="design">Projektovanje</option>
											<option value="other">Drugo</option>
										</select>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="quantity">Količina</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<line
												x1="16.5"
												y1="9.4"
												x2="7.5"
												y2="4.21"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<rect
												x="3"
												y="6"
												width="18"
												height="12"
												rx="2"
												ry="2"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											/>
											<line
												x1="12"
												y1="12"
												x2="12"
												y2="12"
												stroke="currentColor"
												strokeWidth="3"
												strokeLinecap="round"
											/>
										</svg>
										<select id="quantity">
											<option value="">Odaberite količinu</option>
											<option value="prototype">Prototip (1-5 kom)</option>
											<option value="small">Mala serija (6-50 kom)</option>
											<option value="medium">
												Srednja serija (51-500 kom)
											</option>
											<option value="large">Velika serija (500+ kom)</option>
										</select>
									</div>
								</div>

								<div className={styles.formGroupFull}>
									<label htmlFor="message">Poruka</label>
									<div className={styles.inputWrapper}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.inputIcon}
										>
											<line
												x1="17"
												y1="10"
												x2="3"
												y2="10"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="21"
												y1="6"
												x2="3"
												y2="6"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="21"
												y1="14"
												x2="3"
												y2="14"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="17"
												y1="18"
												x2="3"
												y2="18"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<textarea
											id="message"
											rows="4"
											placeholder="Opišite vaš projekat ili upit (materijal, dimenzije, specifikacije, rok izrade...)"
										></textarea>
									</div>
								</div>

								<div className={styles.formFilesSection}>
									<div className={styles.fileUploadLabel}>
										Priložite tehnički crtež (opcionalno)
									</div>
									<div className={styles.fileUploadDescription}>
										Dozvoljen PDF, DXF, STEP, STP, IGES, IGS (max 50MB)
									</div>
									<div className={styles.fileUploadArea}>
										<svg
											viewBox="0 0 24 24"
											width="32"
											height="32"
											className={styles.uploadIcon}
										>
											<path
												d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<polyline
												points="17 8 12 3 7 8"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<line
												x1="12"
												y1="3"
												x2="12"
												y2="15"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										<div className={styles.uploadText}>
											Prevucite i ispustite datoteke ovdje ili kliknite za
											pretraživanje
										</div>
										<input
											type="file"
											id="fileInput"
											className={styles.fileInput}
										/>
									</div>
								</div>

								<div className={styles.formCheckbox}>
									<input type="checkbox" id="privacy" />
									<label htmlFor="privacy">
										Slažem se s politikom privatnosti i obradom podataka
									</label>
								</div>

								<div className={styles.formGroupFull}>
									<button type="submit" className={styles.submitButton}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.buttonIcon}
										>
											<line
												x1="22"
												y1="2"
												x2="11"
												y2="13"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<polygon
												points="22 2 15 22 11 13 2 9 22 2"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										Pošaljite Upit
									</button>
								</div>
							</div>

							<div className={styles.contactInfo}>
								<h3>Kontakt Informacije</h3>
								<div className={styles.infoItem}>
									<div className={styles.infoIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<path
												d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<circle
												cx="12"
												cy="10"
												r="3"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.infoText}>
										<strong>Adresa:</strong>
										<p>
											Industrijska zona bb, 75000 Tuzla, Bosna i Hercegovina
										</p>
									</div>
								</div>
								<div className={styles.infoItem}>
									<div className={styles.infoIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<path
												d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.infoText}>
										<strong>Telefon:</strong>
										<p>+387 35 123 456</p>
									</div>
								</div>
								<div className={styles.infoItem}>
									<div className={styles.infoIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<path
												d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<polyline
												points="22,6 12,13 2,6"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.infoText}>
										<strong>Email:</strong>
										<p>info@metalprec.ba</p>
									</div>
								</div>
								<div className={styles.infoItem}>
									<div className={styles.infoIcon}>
										<svg viewBox="0 0 24 24" width="24" height="24">
											<circle
												cx="12"
												cy="12"
												r="10"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<polyline
												points="12 6 12 12 16 14"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className={styles.infoText}>
										<strong>Radno Vrijeme:</strong>
										<p>Pon - Pet: 08:00 - 16:00</p>
									</div>
								</div>

								<div className={styles.contactAction}>
									<a href="tel:+38735123456" className={styles.phoneButton}>
										<svg
											viewBox="0 0 24 24"
											width="20"
											height="20"
											className={styles.buttonIcon}
										>
											<path
												d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
										Nazovite Nas
									</a>
								</div>

								<div className={styles.socialLinks}>
									<div className={styles.socialTitle}>Pratite nas:</div>
									<div className={styles.socialButtons}>
										<a href="#facebook" className={styles.socialLink}>
											<svg viewBox="0 0 24 24" width="20" height="20">
												<path
													d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</a>
										<a href="#linkedin" className={styles.socialLink}>
											<svg viewBox="0 0 24 24" width="20" height="20">
												<path
													d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<rect
													x="2"
													y="9"
													width="4"
													height="12"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<circle
													cx="4"
													cy="4"
													r="2"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</a>
										<a href="#instagram" className={styles.socialLink}>
											<svg viewBox="0 0 24 24" width="20" height="20">
												<rect
													x="2"
													y="2"
													width="20"
													height="20"
													rx="5"
													ry="5"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<line
													x1="17.5"
													y1="6.5"
													x2="17.51"
													y2="6.5"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</a>
										<a href="#youtube" className={styles.socialLink}>
											<svg viewBox="0 0 24 24" width="20" height="20">
												<path
													d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
												/>
												<polygon
													points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
												/>
											</svg>
										</a>
									</div>
								</div>

								<div className={styles.mapContainer}>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819.251539091125!2d18.6808!3d44.5381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDMyJzE3LjIiTiAxOcKwNDAnNTAuOSJF!5e0!3m2!1sen!2sba!4v1589365446531!5m2!1sen!2sba"
										width="100%"
										height="160"
										style={{ border: 0, borderRadius: "8px" }}
										allowFullScreen=""
										loading="lazy"
										title="Location map"
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className={styles.footer}>
				<div className={styles.footerPattern}></div>
				<div className={styles.footerTop}>
					<div className={styles.footerColumn}>
						<div className={styles.footerLogo}>
							<h2>
								<span className={styles.logoText}>Metal</span>
								<span className={styles.logoHighlight}>Prec</span>
							</h2>
						</div>
						<p className={styles.footerTagline}>
							Precizna CNC obrada metala po vašim specifikacijama
						</p>
						<div className={styles.companyDetails}>
							<div className={styles.companyDetail}>
								<span className={styles.detailLabel}>ID:</span>
								<span className={styles.detailValue}>4209123456789</span>
							</div>
							<div className={styles.companyDetail}>
								<span className={styles.detailLabel}>PDV:</span>
								<span className={styles.detailValue}>209123456789</span>
							</div>
						</div>
						<div className={styles.certifications}>
							<div className={styles.certBadge}>ISO 9001:2015</div>
							<div className={styles.certBadge}>CE</div>
						</div>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Usluge</h3>
						<ul className={styles.footerLinks}>
							<li>
								<a href="#cnc-glodanje">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									CNC Glodanje
								</a>
							</li>
							<li>
								<a href="#cnc-tokarenje">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									CNC Tokarenje
								</a>
							</li>
							<li>
								<a href="#lasersko-rezanje">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Lasersko Rezanje
								</a>
							</li>
							<li>
								<a href="#zavarivanje">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Zavarivanje
								</a>
							</li>
							<li>
								<a href="#projektovanje">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Projektovanje
								</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>O Nama</h3>
						<ul className={styles.footerLinks}>
							<li>
								<a href="#onama">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									O Kompaniji
								</a>
							</li>
							<li>
								<a href="#oprema">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Naša Oprema
								</a>
							</li>
							<li>
								<a href="#projekti">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Projekti
								</a>
							</li>
							<li>
								<a href="#karijere">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Karijere
								</a>
							</li>
							<li>
								<a href="#kontakt">
									<svg
										viewBox="0 0 24 24"
										width="16"
										height="16"
										className={styles.footerIcon}
									>
										<polyline
											points="9 18 15 12 9 6"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
									Kontakt
								</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Kontakt</h3>
						<ul className={styles.footerContactList}>
							<li className={styles.footerContactItem}>
								<svg
									viewBox="0 0 24 24"
									width="18"
									height="18"
									className={styles.contactIcon}
								>
									<path
										d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle
										cx="12"
										cy="10"
										r="3"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<address className={styles.footerAddress}>
									Industrijska zona bb
									<br />
									75000 Tuzla
									<br />
									Bosna i Hercegovina
								</address>
							</li>
							<li className={styles.footerContactItem}>
								<svg
									viewBox="0 0 24 24"
									width="18"
									height="18"
									className={styles.contactIcon}
								>
									<path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<span>+387 35 123 456</span>
							</li>
							<li className={styles.footerContactItem}>
								<svg
									viewBox="0 0 24 24"
									width="18"
									height="18"
									className={styles.contactIcon}
								>
									<path
										d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<polyline
										points="22,6 12,13 2,6"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<a href="mailto:info@metalprec.ba">info@metalprec.ba</a>
							</li>
							<li className={styles.footerContactItem}>
								<svg
									viewBox="0 0 24 24"
									width="18"
									height="18"
									className={styles.contactIcon}
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<polyline
										points="12 6 12 12 16 14"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<span>Pon - Pet: 08:00 - 16:00</span>
							</li>
						</ul>

						<div className={styles.newsletterForm}>
							<h4 className={styles.newsletterTitle}>
								Pretplatite se na novosti
							</h4>
							<p className={styles.newsletterDescription}>
								Budite u toku sa našim novostima i ponudama
							</p>
							<div className={styles.newsletterInput}>
								<input type="email" placeholder="Vaša email adresa" />
								<button className={styles.newsletterButton}>
									<svg viewBox="0 0 24 24" width="18" height="18">
										<line
											x1="22"
											y1="2"
											x2="11"
											y2="13"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<polygon
											points="22 2 15 22 11 13 2 9 22 2"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<div className={styles.copyright}>
						&copy; {new Date().getFullYear()} MetalPrec d.o.o. Sva prava
						pridržana.
					</div>
					<div className={styles.legalLinks}>
						<a href="#privatnost">Privatnost</a>
						<a href="#uslovi">Uslovi korištenja</a>
						<a href="#kolacici">Kolačići</a>
					</div>
				</div>

				<div className={styles.scrollToTop}>
					<a href="#top">
						<svg viewBox="0 0 24 24" width="24" height="24">
							<polyline
								points="17 11 12 6 7 11"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<polyline
								points="17 18 12 13 7 18"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</a>
				</div>
			</footer>
		</div>
	);
};

export default CNCBusinessPage;
