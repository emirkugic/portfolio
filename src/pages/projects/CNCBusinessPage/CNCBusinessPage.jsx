import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../../components/common/BackButton/BackButton";
import styles from "./CNCBusinessPage.module.css";

const CNCBusinessPage = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [activeService, setActiveService] = useState("cnc");
	const [activeFaq, setActiveFaq] = useState(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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
							Zatražite Ponudu
						</a>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className={styles.main}>
				{/* Hero Section */}
				<section className={styles.heroSection}>
					<div className={styles.heroOverlay}></div>
					<div className={styles.heroContent}>
						<h2 className={styles.heroTitle}>
							<span className={styles.heroTitleLine}>
								Precizna Obrada Metala
							</span>
							<span className={styles.heroTitleLine}>
								Po Vašim Specifikacijama
							</span>
						</h2>
						<p className={styles.heroSubtitle}>
							Visokokvalitetna CNC obrada, rezanje i inžinjering rješenja za
							industriju
						</p>
						<div className={styles.heroActions}>
							<a href="#usluge" className={styles.primaryButton}>
								Naše Usluge
							</a>
							<a href="#kontakt" className={styles.secondaryButton}>
								Kontaktirajte Nas
							</a>
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
							<p>Tolerancije do ±0.01mm</p>
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
							<p>ISO 9001:2015 certificirani</p>
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
							<p>Od aluminijuma do nerđajućeg čelika</p>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className={styles.statsSection} id="stats-section">
					<div className={styles.statsInner}>
						<div className={styles.statCard}>
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
						<h2>Naše Usluge</h2>
						<p>Kompletna rješenja za obradu metala prema vašim potrebama</p>
					</div>

					<div className={styles.tabsContainer}>
						<div className={styles.tabsHeader}>
							<button
								className={`${styles.tabButton} ${
									activeService === "cnc" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("cnc")}
							>
								CNC Glodanje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "turning" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("turning")}
							>
								CNC Tokarenje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "laser" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("laser")}
							>
								Lasersko Rezanje
							</button>
							<button
								className={`${styles.tabButton} ${
									activeService === "welding" ? styles.activeTab : ""
								}`}
								onClick={() => handleServiceChange("welding")}
							>
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

									<a href="#kontakt" className={styles.learnMoreButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
										alt="CNC Glodanje"
									/>
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

									<a href="#kontakt" className={styles.learnMoreButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://metron.ba/wp-content/uploads/2022/11/c1-1024x683.jpg"
										alt="CNC Tokarenje"
									/>
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

									<a href="#kontakt" className={styles.learnMoreButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
										alt="Lasersko Rezanje"
									/>
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

									<a href="#kontakt" className={styles.learnMoreButton}>
										Zatražite Ponudu
									</a>
								</div>
								<div className={styles.tabImage}>
									<img
										src="https://weld-tech.co.za/images/GP500_%20smaller.jpg"
										alt="Zavarivanje"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Equipment Section */}
				<section className={styles.equipmentSection} id="oprema">
					<div className={styles.sectionHeading}>
						<h2>Naša Oprema</h2>
						<p>Najmodernija tehnologija za vrhunske rezultate</p>
					</div>

					<div className={styles.equipmentGrid}>
						<div
							className={styles.equipmentCard}
							ref={(el) => (serviceRefs.current[0] = el)}
						>
							<div className={styles.equipmentImage}>
								<img
									src="https://www.haascnc.com/content/dam/haascnc/machines/vertical-mills/vf-series/models/small/vf-2/gallery/haasvf2-rangle.jpg"
									alt="Haas VF-2 CNC Glodalica"
								/>
							</div>
							<div className={styles.equipmentContent}>
								<h3>Haas VF-2 CNC Glodalica</h3>
								<p>
									3-osna CNC glodalica sa radnim prostorom 762 x 406 x 508 mm
								</p>
								<ul className={styles.equipmentSpecs}>
									<li>Vreteno 12.000 o/min</li>
									<li>Izmjenjivač sa 24 alata</li>
									<li>Kontrola Haas CNC</li>
								</ul>
							</div>
						</div>

						<div
							className={styles.equipmentCard}
							ref={(el) => (serviceRefs.current[1] = el)}
						>
							<div className={styles.equipmentImage}>
								<img
									src="https://uk.dmgmori.com/resource/image/16478/product_picture/xs/10/nlx-2500-product-picture.png"
									alt="DMG MORI NLX 2500"
								/>
							</div>
							<div className={styles.equipmentContent}>
								<h3>DMG MORI NLX 2500</h3>
								<p>
									CNC tokarilica sa pogonjenim alatima za kompleksne dijelove
								</p>
								<ul className={styles.equipmentSpecs}>
									<li>Max. promjer tokarenja: Ø460 mm</li>
									<li>Max. dužina tokarenja: 730 mm</li>
									<li>Pogonjeni alati za glodanje i bušenje</li>
								</ul>
							</div>
						</div>

						<div
							className={styles.equipmentCard}
							ref={(el) => (serviceRefs.current[2] = el)}
						>
							<div className={styles.equipmentImage}>
								<img
									src="https://www.trumpf.com/filestorage/TRUMPF_Processed/_processed_/b/e/csm_TruLaser-5030-fiber-L76-process-cooler_1eab22bf1c_72ed30c55c.jpg"
									alt="Trumpf TruLaser 3030"
								/>
							</div>
							<div className={styles.equipmentContent}>
								<h3>Trumpf TruLaser 3030</h3>
								<p>Visokoprecizni fiber laser sistem za rezanje metala</p>
								<ul className={styles.equipmentSpecs}>
									<li>Radni prostor: 3000 x 1500 mm</li>
									<li>Rezanje materijala do 20 mm</li>
									<li>Preciznost rezanja ±0.1 mm</li>
								</ul>
							</div>
						</div>

						<div
							className={styles.equipmentCard}
							ref={(el) => (serviceRefs.current[3] = el)}
						>
							<div className={styles.equipmentImage}>
								<img
									src="https://www.todaysmedicaldevelopments.com/remote/aHR0cHM6Ly9naWVjZG4uYmxvYi5jb3JlLndpbmRvd3MubmV0L2ZpbGV1cGxvYWRzL2ltYWdlLzIwMjQvMDUvMjkvZG11NDBfc3RlYWx0aC5wbmc.E11-RzAs7y4.png?format=webp"
									alt="DMG MORI DMU 50"
								/>
							</div>
							<div className={styles.equipmentContent}>
								<h3>DMG MORI DMU 50</h3>
								<p>5-osna CNC glodalica za najkompleksnije geometrije</p>
								<ul className={styles.equipmentSpecs}>
									<li>5-osna simultana obrada</li>
									<li>Radni prostor: 500 x 450 x 400 mm</li>
									<li>Vreteno 18.000 o/min</li>
								</ul>
							</div>
						</div>
					</div>

					<div className={styles.equipmentCta}>
						<div className={styles.ctaText}>
							<h3>Trebate dodatne informacije o našim mašinama?</h3>
							<p>Naš stručni tim je spreman odgovoriti na sva vaša pitanja.</p>
						</div>
						<a href="#kontakt" className={styles.primaryButton}>
							Kontaktirajte Nas
						</a>
					</div>
				</section>

				{/* About Section */}
				<section className={styles.aboutSection} id="onama">
					<div className={styles.aboutContent}>
						<div className={styles.sectionHeading}>
							<span className={styles.sectionLabel}>O Nama</span>
							<h2>Tradicija i Inovacija</h2>
						</div>

						<p className={styles.aboutText}>
							MetalPrec je vodeća firma za CNC obradu metala u regiji, osnovana
							2008. godine. Sa više od 15 godina iskustva, specijalizirali smo
							se za preciznu obradu metala koristeći najmodernije CNC
							tehnologije.
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
										<polyline
											points="20 6 9 17 4 12"
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
						</div>

						<a href="#projekti" className={styles.learnMoreButton}>
							Naši Projekti
						</a>
					</div>

					<div className={styles.aboutImage}>
						<img
							src="https://images.unsplash.com/photo-1586765677067-f8030bd8e303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
							alt="MetalPrec Tim"
						/>
					</div>
				</section>

				{/* Projects/Gallery Section */}
				<section className={styles.projectsSection} id="projekti">
					<div className={styles.sectionHeading}>
						<h2>Naši Projekti</h2>
						<p>Primjeri našeg rada i stručnosti</p>
					</div>

					<div className={styles.projectsGrid}>
						<div className={styles.projectCard}>
							<img
								src="https://images.unsplash.com/photo-1581093583449-8255a7d46e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
								alt="Komponente za automobilsku industriju"
							/>
							<div className={styles.projectOverlay}>
								<h3>Komponente za automobilsku industriju</h3>
								<p>Precizni dijelovi za sigurnosne sisteme</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<img
								src="https://cdn.prod.website-files.com/62b58ca8abc6088f2afd1f66/62c581074d4487c0a94f58ac_medical-4600914_1920.jpg"
								alt="Medicinska oprema"
							/>
							<div className={styles.projectOverlay}>
								<h3>Medicinska oprema</h3>
								<p>Komponente za dijagnostičke uređaje</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<img
								src="https://www.improprecision.com/wp-content/uploads/2021/06/Hydraulic.png"
								alt="Hidrauličke komponente"
							/>
							<div className={styles.projectOverlay}>
								<h3>Hidrauličke komponente</h3>
								<p>Visokotlačni ventili i kontrolni blokovi</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<img
								src="https://prototool.com/wp-content/uploads/2022/06/a-shelf-of-CNC-machine-tools-1024x576.jpg"
								alt="Alati i kalupi"
							/>
							<div className={styles.projectOverlay}>
								<h3>Alati i kalupi</h3>
								<p>Precizni alati za injekcijsko brizganje</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<img
								src="https://images.unsplash.com/photo-1618247130379-980b9fe0df04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
								alt="Zrakoplovne komponente"
							/>
							<div className={styles.projectOverlay}>
								<h3>Zrakoplovne komponente</h3>
								<p>Visokoprecizni dijelovi za avionsku industriju</p>
							</div>
						</div>

						<div className={styles.projectCard}>
							<img
								src="https://robersontool.com/wp-content/uploads/2022/04/Prototyping-4.jpg"
								alt="Prototipovi"
							/>
							<div className={styles.projectOverlay}>
								<h3>Prototipovi</h3>
								<p>Brza izrada prototipova za inovativne projekte</p>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className={styles.testimonialsSection}>
					<div className={styles.sectionHeading}>
						<h2>Šta Kažu Naši Klijenti</h2>
						<p>Iskustva zadovoljnih partnera</p>
					</div>

					<div className={styles.testimonialsGrid}>
						<div className={styles.testimonialCard}>
							<div className={styles.testimonialContent}>
								<div className={styles.quoteIcon}>
									<svg viewBox="0 0 24 24" width="24" height="24">
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
								</p>
								<div className={styles.testimonialAuthor}>
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
									<svg viewBox="0 0 24 24" width="24" height="24">
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
									stručnost osoblja je impresivna.
								</p>
								<div className={styles.testimonialAuthor}>
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
									<svg viewBox="0 0 24 24" width="24" height="24">
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
									produktivnost.
								</p>
								<div className={styles.testimonialAuthor}>
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
						<p>Odgovori na najčešća pitanja o našim uslugama</p>
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
					</div>
				</section>

				{/* CTA Section */}
				<section className={styles.ctaSection} id="kontakt">
					<div className={styles.ctaContent}>
						<h2>Spremni ste za saradnju?</h2>
						<p>Kontaktirajte nas danas za besplatnu ponudu</p>
						<div className={styles.contactWrapper}>
							<div className={styles.contactForm}>
								<div className={styles.formGroup}>
									<label htmlFor="name">Vaše ime</label>
									<input type="text" id="name" placeholder="Unesite vaše ime" />
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="company">Naziv firme</label>
									<input
										type="text"
										id="company"
										placeholder="Unesite naziv firme"
									/>
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="email">Email adresa</label>
									<input
										type="email"
										id="email"
										placeholder="Unesite email adresu"
									/>
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="phone">Telefon</label>
									<input
										type="tel"
										id="phone"
										placeholder="Unesite broj telefona"
									/>
								</div>
								<div className={styles.formGroupFull}>
									<label htmlFor="message">Poruka</label>
									<textarea
										id="message"
										rows="4"
										placeholder="Opišite vaš projekat ili upit"
									></textarea>
								</div>
								<div className={styles.formGroupFull}>
									<button type="submit" className={styles.submitButton}>
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
								<div className={styles.socialLinks}>
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
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className={styles.footer}>
				<div className={styles.footerTop}>
					<div className={styles.footerColumn}>
						<div className={styles.footerLogo}>
							<h2>
								<span className={styles.logoText}>Metal</span>
								<span className={styles.logoHighlight}>Prec</span>
							</h2>
						</div>
						<p className={styles.footerTagline}>
							Precizna obrada metala po vašim specifikacijama
						</p>
						<div className={styles.certifications}>
							<div className={styles.certBadge}>ISO 9001:2015</div>
							<div className={styles.certBadge}>CE</div>
						</div>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Usluge</h3>
						<ul className={styles.footerLinks}>
							<li>
								<a href="#cnc-glodanje">CNC Glodanje</a>
							</li>
							<li>
								<a href="#cnc-tokarenje">CNC Tokarenje</a>
							</li>
							<li>
								<a href="#lasersko-rezanje">Lasersko Rezanje</a>
							</li>
							<li>
								<a href="#zavarivanje">Zavarivanje</a>
							</li>
							<li>
								<a href="#projektovanje">Projektovanje</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>O Nama</h3>
						<ul className={styles.footerLinks}>
							<li>
								<a href="#onama">O Kompaniji</a>
							</li>
							<li>
								<a href="#oprema">Naša Oprema</a>
							</li>
							<li>
								<a href="#projekti">Projekti</a>
							</li>
							<li>
								<a href="#karijere">Karijere</a>
							</li>
							<li>
								<a href="#kontakt">Kontakt</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Lokacija</h3>
						<div className={styles.footerMap}>
							<div className={styles.mapPlaceholder}>
								<img
									src="https://via.placeholder.com/300x200/e2e8f0/475569?text=Mapa+Lokacije"
									alt="Mapa Lokacije"
								/>
							</div>
							<address className={styles.footerAddress}>
								Industrijska zona bb
								<br />
								75000 Tuzla
								<br />
								Bosna i Hercegovina
							</address>
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
			</footer>
		</div>
	);
};

export default CNCBusinessPage;
