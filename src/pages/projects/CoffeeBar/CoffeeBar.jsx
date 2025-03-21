import React, { useState, useEffect, useRef } from "react";
import styles from "./CoffeeBar.module.css";

const CoffeeBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [scrollProgress, setScrollProgress] = useState(0);
	const [cupFillLevel, setCupFillLevel] = useState(0);
	const parallaxRef = useRef(null);
	const steamRef = useRef(null);

	// Handle scroll effects
	useEffect(() => {
		const handleScroll = () => {
			// Calculate scroll progress for various effects
			const totalHeight = document.body.scrollHeight - window.innerHeight;
			const progress = window.scrollY / totalHeight;
			setScrollProgress(progress);

			// Coffee cup fill animation based on scroll
			const fillPercentage = Math.min(
				100,
				(window.scrollY / (totalHeight * 0.5)) * 100
			);
			setCupFillLevel(fillPercentage);

			// Calculate which section is active
			const sections = ["home", "menu", "prica", "lokacije", "kontakt"];
			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 100 && rect.bottom >= 100) {
						setActiveSection(section);
						break;
					}
				}
			}

			// Parallax effect for background elements
			if (parallaxRef.current) {
				const yOffset = window.scrollY * 0.4;
				parallaxRef.current.style.transform = `translateY(${yOffset}px)`;
			}

			// Animate steam effect
			if (steamRef.current) {
				const steamOpacity = Math.max(0, 1 - window.scrollY / 500);
				steamRef.current.style.opacity = steamOpacity;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className={styles.container}>
			{/* Custom Coffee Progress Indicator */}
			<div className={styles.progressIndicator}>
				<div className={styles.coffeeCup}>
					<div
						className={styles.coffeeFill}
						style={{ height: `${cupFillLevel}%` }}
					></div>
					<div className={styles.coffeeHandle}></div>
					<div className={styles.steamContainer} ref={steamRef}>
						<div className={styles.steam}></div>
						<div
							className={styles.steam}
							style={{ animationDelay: "0.3s" }}
						></div>
						<div
							className={styles.steam}
							style={{ animationDelay: "0.5s" }}
						></div>
					</div>
				</div>
			</div>

			{/* Header */}
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.logo}>
						<svg
							className={styles.logoIcon}
							viewBox="0 0 24 24"
							width="32"
							height="32"
						>
							<path d="M2 21h18v-2H2v2zm6-4h10v-2H8v2zm-6-4h16v-2H2v2zm6-4h10V7H8v3zm2-6v2h6V3h-6z" />
						</svg>
						<span>KAFA</span>
						<span className={styles.logoAccent}>EKSPRES</span>
					</div>

					<nav
						className={`${styles.nav} ${isMenuOpen ? styles.navActive : ""}`}
					>
						<ul className={styles.navList}>
							<li>
								<a
									href="#home"
									className={`${styles.navLink} ${
										activeSection === "home" ? styles.activeLink : ""
									}`}
								>
									Početna
								</a>
							</li>
							<li>
								<a
									href="#menu"
									className={`${styles.navLink} ${
										activeSection === "menu" ? styles.activeLink : ""
									}`}
								>
									Meni
								</a>
							</li>
							<li>
								<a
									href="#prica"
									className={`${styles.navLink} ${
										activeSection === "prica" ? styles.activeLink : ""
									}`}
								>
									Naša Priča
								</a>
							</li>
							<li>
								<a
									href="#lokacije"
									className={`${styles.navLink} ${
										activeSection === "lokacije" ? styles.activeLink : ""
									}`}
								>
									Lokacije
								</a>
							</li>
							<li>
								<a
									href="#kontakt"
									className={`${styles.navLink} ${
										activeSection === "kontakt" ? styles.activeLink : ""
									}`}
								>
									Kontakt
								</a>
							</li>
						</ul>
					</nav>

					<button className={styles.reserveButton}>
						<svg
							className={styles.buttonIcon}
							viewBox="0 0 24 24"
							width="18"
							height="18"
						>
							<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
						</svg>
						Rezerviši Sto
					</button>

					<button
						className={styles.menuToggle}
						onClick={toggleMenu}
						aria-label="Togglaj meni"
					>
						<span
							className={`${styles.menuBar} ${
								isMenuOpen ? styles.menuBarActive : ""
							}`}
						></span>
						<span
							className={`${styles.menuBar} ${
								isMenuOpen ? styles.menuBarActive : ""
							}`}
						></span>
						<span
							className={`${styles.menuBar} ${
								isMenuOpen ? styles.menuBarActive : ""
							}`}
						></span>
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className={styles.hero} id="home">
				<div className={styles.heroBackground} ref={parallaxRef}></div>
				<div className={styles.heroCircle1}></div>
				<div className={styles.heroCircle2}></div>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>
						<span className={styles.animatedText}>Doživite</span>
						<span className={styles.highlight}> Artizansku</span>
						<span className={styles.animatedText}>Kafa Eksperijenciju</span>
					</h1>
					<p className={styles.heroSubtitle}>
						Gdje svaka šoljica ispriča priču o ukusu, zanatu i strasti
					</p>
					<div className={styles.heroCta}>
						<button className={styles.primaryButton}>
							<svg
								className={styles.buttonIcon}
								viewBox="0 0 24 24"
								width="18"
								height="18"
							>
								<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
							</svg>
							Pogledaj Naš Meni
						</button>
						<button className={styles.secondaryButton}>
							<svg
								className={styles.buttonIcon}
								viewBox="0 0 24 24"
								width="18"
								height="18"
							>
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" />
							</svg>
							Naše Putovanje
						</button>
					</div>
				</div>
				<div className={styles.scrollIndicator}>
					<div className={styles.scrollText}>Skrolajte dolje</div>
					<div className={styles.scrollArrow}></div>
				</div>
			</section>

			{/* Coffee Beans Floating Animation */}
			<div className={styles.floatingBeans}>
				{[...Array(10)].map((_, i) => (
					<div
						key={i}
						className={styles.floatingBean}
						style={{
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${10 + Math.random() * 20}s`,
						}}
					>
						<svg viewBox="0 0 24 24" width="30" height="30">
							<path d="M12 3C6.95 3 3.15 7.85 3.15 12.95c0 3.8 1.85 6.95 4.9 8.75 2.05 1.2 4.55 1.5 6.95 0.8 5.7-1.65 8.8-7.95 6.7-13.55C20.2 5 16.4 3 12 3zm0 2c3.35 0 6.4 1.65 8.15 4.8 1.6 2.8 1.6 6.25 0 9.05-1.4 2.45-3.95 4.1-6.75 4.3-2.8 0.2-5.45-1-7.15-3.2-2.5-3.2-2.35-7.9 0.35-10.9C8.35 6.4 10.15 5 12 5z" />
						</svg>
					</div>
				))}
			</div>

			{/* Featured Menu with 3D Card Effect */}
			<section className={styles.featured} id="menu">
				<div className={styles.sectionHeader}>
					<div className={styles.coffeeBeansAccent}></div>
					<h2 className={styles.sectionTitle}>
						<span className={styles.highlight}>Signature</span> Napitci
					</h2>
					<p className={styles.sectionSubtitle}>
						Naši bariste svakodnevno pripremaju ove izvrsne kafene doživljaje
					</p>
				</div>

				<div className={styles.featuredGrid}>
					{featuredItems.map((item, index) => (
						<div
							className={styles.featuredItem}
							key={index}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className={styles.featuredImageContainer}>
								<div
									className={styles.featuredImage}
									style={{ backgroundImage: `url(${item.image})` }}
								></div>
								<div className={styles.featuredPrice}>{item.price} KM</div>
							</div>
							<div className={styles.featuredContent}>
								<h3 className={styles.featuredTitle}>{item.title}</h3>
								<p className={styles.featuredDescription}>{item.description}</p>
								<button className={styles.featureOrderButton}>
									<svg viewBox="0 0 24 24" width="16" height="16">
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
									Dodaj u korpu
								</button>
							</div>
						</div>
					))}
				</div>

				<div className={styles.coffeeStain1}></div>
				<div className={styles.coffeeStain2}></div>

				<div className={styles.featuredCta}>
					<button className={styles.primaryButton}>
						<svg
							className={styles.buttonIcon}
							viewBox="0 0 24 24"
							width="18"
							height="18"
						>
							<path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z" />
						</svg>
						Kompletan Meni
					</button>
				</div>
			</section>

			{/* Interactive Coffee Journey Section */}
			<section className={styles.story} id="prica">
				<div className={styles.storyTimeline}>
					<div className={styles.timelineNode}>
						<div className={styles.timelineYear}>2010</div>
						<div className={styles.timelineConnector}></div>
					</div>
					<div className={styles.timelineNode}>
						<div className={styles.timelineYear}>2015</div>
						<div className={styles.timelineConnector}></div>
					</div>
					<div className={styles.timelineNode}>
						<div className={styles.timelineYear}>2020</div>
						<div className={styles.timelineConnector}></div>
					</div>
					<div className={styles.timelineNode}>
						<div className={styles.timelineYear}>2025</div>
					</div>
				</div>

				<div className={styles.storyContent}>
					<div className={styles.storyText}>
						<h2 className={styles.sectionTitle}>
							Naša <span className={styles.highlight}>Priča</span>
						</h2>
						<p className={styles.storyParagraph}>
							Osnovana 2010. godine, Kafa Ekspres započela je kao mali kiosk na
							lokalnoj tržnici. Naša osnivačica, Amina, upravo se vratila s
							putovanja po regijama kafe u Etiopiji, Kolumbiji i Indoneziji.
						</p>
						<p className={styles.storyParagraph}>
							Inspirirana bogatim tradicijama i inovativnim tehnikama s kojima
							se susrela, Amina je zamislila prostor gdje kafa nije samo izvor
							kofeina, već putovanje okusa i priča.
						</p>
						<p className={styles.storyParagraph}>
							Danas, s tri lokacije i direktnim odnosima s uzgajivačima širom
							svijeta, nastavljamo našu misiju posluživanja izvanredne kafe
							podržavajući održive prakse.
						</p>
						<div className={styles.storyCta}>
							<button className={styles.secondaryButton}>
								<svg
									className={styles.buttonIcon}
									viewBox="0 0 24 24"
									width="18"
									height="18"
								>
									<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
								</svg>
								Pročitaj Više
							</button>
						</div>
					</div>
					<div className={styles.storyImageGallery}>
						<div
							className={styles.galleryImage}
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
							}}
						></div>
						<div
							className={styles.galleryImage}
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
							}}
						></div>
						<div
							className={styles.galleryImage}
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
							}}
						></div>
					</div>
				</div>
			</section>

			{/* Interactive Testimonial Carousel */}
			<section className={styles.testimonials}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>
						Riječi Naših <span className={styles.highlight}>Gostiju</span>
					</h2>
				</div>

				<div className={styles.testimonialsCarousel}>
					<div className={styles.testimonialsTrack}>
						{testimonials.map((testimonial, index) => (
							<div className={styles.testimonialCard} key={index}>
								<div className={styles.testimonialRating}>
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className={styles.ratingStar}
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
										</svg>
									))}
								</div>
								<p className={styles.testimonialText}>{testimonial.text}</p>
								<div className={styles.testimonialAuthor}>
									<div
										className={styles.testimonialAvatar}
										style={{ backgroundImage: `url(${testimonial.avatar})` }}
									></div>
									<div className={styles.testimonialInfo}>
										<p className={styles.testimonialName}>{testimonial.name}</p>
										<p className={styles.testimonialTitle}>
											{testimonial.title}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={styles.testimonialControls}>
					<button className={styles.testimonialButton}>
						<svg viewBox="0 0 24 24" width="24" height="24">
							<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
						</svg>
					</button>
					<div className={styles.testimonialDots}>
						<span
							className={`${styles.testimonialDot} ${styles.activeDot}`}
						></span>
						<span className={styles.testimonialDot}></span>
						<span className={styles.testimonialDot}></span>
					</div>
					<button className={styles.testimonialButton}>
						<svg viewBox="0 0 24 24" width="24" height="24">
							<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
						</svg>
					</button>
				</div>
			</section>

			{/* Interactive Map Section */}
			<section className={styles.locations} id="lokacije">
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>
						Posjeti <span className={styles.highlight}>Nas</span>
					</h2>
					<p className={styles.sectionSubtitle}>
						Pronađite najbližu Kafa Ekspres lokaciju
					</p>
				</div>

				<div className={styles.locationsMap}>
					<div className={styles.mapContainer}>
						<div className={styles.mapPlaceholder}>
							<svg
								className={styles.mapIcon}
								viewBox="0 0 24 24"
								width="48"
								height="48"
							>
								<path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
							</svg>
							<p>Interaktivna mapa naših lokacija</p>
						</div>
					</div>

					<div className={styles.locationsList}>
						{locations.map((location, index) => (
							<div
								className={`${styles.locationCard} ${
									index === 0 ? styles.activeLocation : ""
								}`}
								key={index}
							>
								<div className={styles.locationHeader}>
									<h3 className={styles.locationName}>{location.name}</h3>
									<div className={styles.locationBadge}>{location.type}</div>
								</div>
								<p className={styles.locationAddress}>
									<svg
										className={styles.locationIcon}
										viewBox="0 0 24 24"
										width="16"
										height="16"
									>
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
									</svg>
									{location.address}
								</p>
								<p className={styles.locationHours}>
									<svg
										className={styles.locationIcon}
										viewBox="0 0 24 24"
										width="16"
										height="16"
									>
										<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
										<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
									</svg>
									{location.hours}
								</p>
								<div className={styles.locationButtons}>
									<button className={styles.locationButton}>
										<svg viewBox="0 0 24 24" width="16" height="16">
											<path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
										</svg>
										Upute
									</button>
									<button className={styles.locationButton}>
										<svg viewBox="0 0 24 24" width="16" height="16">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
										</svg>
										Više Informacija
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter with Animation */}
			<section className={styles.newsletter}>
				<div className={styles.newsContainerPerspective}>
					<div className={styles.newsletterCard}>
						<div className={styles.newsCardFront}>
							<div className={styles.newsletterContent}>
								<h2 className={styles.newsletterTitle}>Ostanite Povezani</h2>
								<p className={styles.newsletterSubtitle}>
									Pretplatite se za savjete o kafi, posebne ponude i događaje
								</p>
								<div className={styles.subscribeForm}>
									<input
										type="email"
										placeholder="Vaša email adresa"
										className={styles.subscribeInput}
									/>
									<button className={styles.subscribeButton}>
										<svg viewBox="0 0 24 24" width="20" height="20">
											<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div className={styles.newsCardBack}>
							<div className={styles.newsletterThanks}>
								<svg
									className={styles.checkIcon}
									viewBox="0 0 24 24"
									width="48"
									height="48"
								>
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								</svg>
								<h3>Hvala Vam!</h3>
								<p>Uspješno ste se pretplatili na naš newsletter.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className={styles.footer} id="kontakt">
				<div className={styles.coffeeWave}></div>

				<div className={styles.footerContent}>
					<div className={styles.footerColumn}>
						<div className={styles.footerLogo}>
							<svg
								className={styles.logoIcon}
								viewBox="0 0 24 24"
								width="28"
								height="28"
							>
								<path d="M2 21h18v-2H2v2zm6-4h10v-2H8v2zm-6-4h16v-2H2v2zm6-4h10V7H8v3zm2-6v2h6V3h-6z" />
							</svg>
							<span>KAFA</span>
							<span className={styles.logoAccent}>EKSPRES</span>
						</div>
						<p className={styles.footerTagline}>
							Stvaramo nezaboravne kafene doživljaje od 2010. godine
						</p>
						<div className={styles.socialLinks}>
							<a href="#" className={styles.socialLink} aria-label="Facebook">
								<svg
									viewBox="0 0 24 24"
									className={styles.socialIcon}
									width="20"
									height="20"
								>
									<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
								</svg>
							</a>
							<a href="#" className={styles.socialLink} aria-label="Instagram">
								<svg
									viewBox="0 0 24 24"
									className={styles.socialIcon}
									width="20"
									height="20"
								>
									<path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428-.254.66-.598 1.216-1.153 1.772-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465-.66-.254-1.216-.598-1.772-1.153-.509-.5-.902-1.105-1.153-1.772-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122 0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.5-.509 1.105-.902 1.772-1.153.637-.247 1.363-.415 2.428-.465 1.066-.047 1.405-.06 4.122-.06M12 0C9.25 0 8.83.01 7.75.05 6.62.1 5.76.27 5.01.51c-.87.33-1.57.78-2.24 1.54l-.02.02c-.76.676-1.211 1.38-1.54 2.24-.24.75-.41 1.61-.46 2.74C.01 8.83 0 9.25 0 12c0 2.75.01 3.17.05 4.25.05 1.13.22 1.99.46 2.74.33.87.78 1.57 1.54 2.24l.02.02c.676.76 1.38 1.211 2.24 1.54.75.24 1.61.41 2.74.46C8.83 23.99 9.25 24 12 24c2.75 0 3.17-.01 4.25-.05 1.13-.05 1.99-.22 2.74-.46.87-.33 1.57-.78 2.24-1.54l.02-.02c.76-.676 1.211-1.38 1.54-2.24.24-.75.41-1.61.46-2.74.04-1.08.05-1.5.05-4.25 0-2.75-.01-3.17-.05-4.25-.05-1.13-.22-1.99-.46-2.74-.33-.87-.78-1.57-1.54-2.24l-.02-.02c-.676-.76-1.38-1.211-2.24-1.54-.75-.24-1.61-.41-2.74-.46C15.17.01 14.75 0 12 0zm0 5.838c-3.403 0-6.162 2.76-6.162 6.162 0 3.403 2.76 6.162 6.162 6.162 3.403 0 6.162-2.76 6.162-6.162 0-3.403-2.76-6.162-6.162-6.162zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.406a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
								</svg>
							</a>
							<a href="#" className={styles.socialLink} aria-label="Twitter">
								<svg
									viewBox="0 0 24 24"
									className={styles.socialIcon}
									width="20"
									height="20"
								>
									<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
								</svg>
							</a>
						</div>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Brzi Linkovi</h3>
						<ul className={styles.footerLinks}>
							<li>
								<a href="#home">Početna</a>
							</li>
							<li>
								<a href="#menu">Meni</a>
							</li>
							<li>
								<a href="#prica">Naša Priča</a>
							</li>
							<li>
								<a href="#lokacije">Lokacije</a>
							</li>
							<li>
								<a href="#kontakt">Kontakt</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Kontaktirajte Nas</h3>
						<address className={styles.contactInfo}>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
								</svg>
								Email: info@kafaekspres.ba
							</p>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
								</svg>
								Telefon: (033) 123-456
							</p>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
								</svg>
								Glavna Lokacija: Ferhadija 12,
								<br />
								Sarajevo, 71000
							</p>
						</address>
					</div>

					<div className={styles.footerColumn}>
						<h3 className={styles.footerHeading}>Radno Vrijeme</h3>
						<div className={styles.hoursInfo}>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
									<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
								</svg>
								Ponedjeljak - Petak: 7h - 22h
							</p>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
									<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
								</svg>
								Subota: 8h - 23h
							</p>
							<p>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
									<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
								</svg>
								Nedjelja: 8h - 20h
							</p>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<p className={styles.copyright}>
						&copy; {new Date().getFullYear()} Kafa Ekspres. Sva prava zadržana.
					</p>
					<div className={styles.bottomLinks}>
						<a href="#">Politika Privatnosti</a>
						<a href="#">Uslovi Korištenja</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

// Sample data for featured items
const featuredItems = [
	{
		title: "Etiopijska Yirgacheffe",
		description:
			"Svijetle, voćne note s naglaskom na citruse i bobičasto voće. Naša signature lagana pržena kafa.",
		price: "4.50",
		image:
			"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Sumatra Tamno Pržena",
		description:
			"Odvažan, zemljani profil s niskom kiselošću i glatkim čokoladnim završetkom.",
		price: "4.25",
		image:
			"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Latte sa Javorovim Sirupom",
		description:
			"Espresso s toplim mlijekom, pravim javorovim sirupom i prstohvatom cimeta.",
		price: "5.75",
		image:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Cold Brew sa Tonikom",
		description:
			"Naš 24-satni cold brew nadopunjen artizanskom tonik vodom i kriskom naranče.",
		price: "5.50",
		image:
			"https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
];

// Sample testimonial data
const testimonials = [
	{
		text: "Kafa Ekspres je postao moj drugi ured. Atmosfera je savršena za rad, a njihova etiopijska kafa promijenila je moje razumijevanje onoga što kafa može biti.",
		name: "Emir Hadžić",
		title: "Grafički Dizajner",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		text: "Pažnja prema detaljima u svakoj šoljici je izvanredna. Vozim dodatnih 15 minuta pored drugih kafića samo da bih došla ovdje. Vrijedno svakog kilometra!",
		name: "Amina Selimović",
		title: "Marketing Stručnjak",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		text: "Kao bivši barista, izuzetno sam izbirljiv po pitanju kafe. Kafa Ekspres svaki put nadmašuje moja očekivanja. Njihovi sezonski specijali su posebno kreativni.",
		name: "Damir Kovačević",
		title: "Softverski Inženjer",
		avatar: "https://randomuser.me/api/portraits/men/67.jpg",
	},
];

// Sample location data
const locations = [
	{
		name: "Kafa Ekspres Centar",
		type: "Flagship Store",
		address: "Ferhadija 12, Sarajevo",
		hours: "7h - 22h Svaki Dan",
		image:
			"https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Kafa Ekspres Riverside",
		type: "Coffee Bar",
		address: "Obala Kulina Bana 24, Sarajevo",
		hours: "8h - 23h Svaki Dan",
		image:
			"https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Kafa Ekspres Art Kvart",
		type: "Coffee & Gallery",
		address: "Dženetića Čikma 8, Sarajevo",
		hours: "8h - 20h Svaki Dan",
		image:
			"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
];

export default CoffeeBar;
