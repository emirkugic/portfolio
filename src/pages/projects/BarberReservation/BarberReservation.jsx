import React, { useState, useEffect, useRef } from "react";
import styles from "./BarberReservation.module.css";
import BackButton from "../../../components/common/BackButton/BackButton";
import {
	Scissors,
	ChevronDown,
	Instagram,
	Menu,
	X,
	ArrowRight,
	Mail,
	Check,
	Calendar,
	Users,
	Play,
	Phone,
	MapPin,
	Star,
	Clock,
	ChevronRight,
} from "lucide-react";

const BarberReservation = () => {
	// State management
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isRevealed, setIsRevealed] = useState(false);
	const [activeBarber, setActiveBarber] = useState(null);

	const [activeDay, setActiveDay] = useState(new Date().getDay());
	const [activeTime, setActiveTime] = useState(null);
	const [playingAnimation, setPlayingAnimation] = useState(true);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollDirection, setScrollDirection] = useState("down");
	const [lastScrollPosition, setLastScrollPosition] = useState(0);

	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const servicesRef = useRef(null);

	// State management

	// Selected service state
	const [selectedService, setSelectedService] = useState(null);

	// Current day
	const today = new Date();

	// Fake loading and intro animation
	useEffect(() => {
		const loadingInterval = setInterval(() => {
			setLoadingProgress((prev) => {
				const newProgress = prev + Math.random() * 10;
				if (newProgress >= 100) {
					clearInterval(loadingInterval);
					setTimeout(() => {
						setIsLoading(false);
						setTimeout(() => {
							setIsRevealed(true);
						}, 500);
					}, 500);
					return 100;
				}
				return newProgress;
			});
		}, 80);

		return () => clearInterval(loadingInterval);
	}, []);

	// Scroll monitoring
	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrollDirection(position > lastScrollPosition ? "down" : "up");
			setLastScrollPosition(position);
			setScrollPosition(position);

			// Determine active section
			const sections = document.querySelectorAll("section[id]");
			sections.forEach((section) => {
				const sectionTop = section.offsetTop - 100;
				const sectionHeight = section.offsetHeight;
				if (position >= sectionTop && position < sectionTop + sectionHeight) {
					setActiveSection(section.id);
				}
			});
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollPosition]);

	// Services data
	const services = [
		{
			id: 1,
			name: "Signature",
			longName: "Signature Haircut",
			description:
				"Naše ekskluzivno iskustvo šišanja sa stručnim stiliziranjem i detaljnom konsultacijom.",
			price: "45",
			duration: 45,
			image:
				"https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=600",
			category: "premium",
		},
		{
			id: 2,
			name: "Royal",
			longName: "Royal Luksuzno Šišanje",
			description:
				"Premium tretman koji uključuje šišanje, topli peškir za lice, masažu glave i styling.",
			price: "65",
			duration: 60,
			image:
				"https://images.pexels.com/photos/1860567/pexels-photo-1860567.jpeg?auto=compress&cs=tinysrgb&w=600",
			category: "premium",
		},
		{
			id: 3,
			name: "Klasik",
			longName: "Klasik Šišanje",
			description:
				"Tradicionalno brijačko šišanje s preciznom tehnikom i završnim detaljima.",
			price: "35",
			duration: 30,
			image:
				"https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
			category: "basic",
		},
		{
			id: 4,
			name: "Fade",
			longName: "Premium Fade",
			description:
				"Savršeno izblendiran fade sa stiliziranjem po želji i preciznošću.",
			price: "40",
			duration: 45,
			image:
				"https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&auto=format&fit=crop",
			category: "basic",
		},
		{
			id: 5,
			name: "Brada",
			longName: "Luksuzno Oblikovanje Brade",
			description:
				"Kompletno oblikovanje i stiliziranje brade uz korištenje premium proizvoda.",
			price: "30",
			duration: 30,
			image:
				"https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
			category: "beard",
		},
		{
			id: 6,
			name: "Hot Towel",
			longName: "Hot Towel Brijanje",
			description:
				"Tradicionalno brijanje britvom uz tretman toplim peškirom za glatko iskustvo.",
			price: "35",
			duration: 35,
			image:
				"https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=600",
			category: "beard",
		},
	];

	// Barbers data
	const barbers = [
		{
			id: 1,
			name: "Amir Hadžić",
			position: "Master Barber",
			description: "Specijaliziran za klasične stilove i premium fade tehnike.",
			experience: 8,
			rating: 4.9,
			clients: 1500,
			available: ["Pon", "Uto", "Sri", "Čet", "Pet"],
			image:
				"https://images.pexels.com/photos/3037215/pexels-photo-3037215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			instagram: "amir.masterbarber",
		},
		{
			id: 2,
			name: "Damir Kovačević",
			position: "Style Specialist",
			description:
				"Inovativni stilist s okom za najnovije trendove i kreativne stilove.",
			experience: 5,
			rating: 4.8,
			clients: 1200,
			available: ["Uto", "Sri", "Čet", "Pet", "Sub"],
			image:
				"https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			instagram: "damir.styles",
		},
		{
			id: 3,
			name: "Emir Begić",
			position: "Senior Barber",
			description:
				"Veteran u industriji poznat po svojoj preciznosti i detaljima.",
			experience: 12,
			rating: 4.9,
			clients: 2200,
			available: ["Pon", "Uto", "Pet", "Sub", "Ned"],
			image:
				"https://images.pexels.com/photos/1989242/pexels-photo-1989242.jpeg?auto=compress&cs=tinysrgb&w=600",
			instagram: "emir.barber",
		},
	];

	// Time slots
	const timeSlots = [
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"12:30",
		"13:00",
		"13:30",
		"14:00",
		"14:30",
		"15:00",
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30",
		"18:00",
		"18:30",
		"19:00",
	];

	// Get next 7 days
	const getNext7Days = () => {
		const days = [];
		const dayNames = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"Maj",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Okt",
			"Nov",
			"Dec",
		];

		for (let i = 0; i < 7; i++) {
			const date = new Date();
			date.setDate(today.getDate() + i);
			days.push({
				full: date,
				day: date.getDate(),
				weekday: dayNames[date.getDay()],
				month: monthNames[date.getMonth()],
			});
		}

		return days;
	};

	// Handle smooth scrolling
	const scrollTo = (id) => {
		const element = document.getElementById(id);
		if (element) {
			window.scrollTo({
				top: element.offsetTop - 80,
				behavior: "smooth",
			});
		}
		setIsMenuOpen(false);
	};

	return (
		<div className={styles.container}>
			{/* <BackButton /> */}
			{/* Loading Screen */}
			<div
				className={`${styles.loadingScreen} ${
					!isLoading ? styles.loadingComplete : ""
				}`}
			>
				<div className={styles.loadingContent}>
					<div className={styles.loadingLogo}>
						<div className={styles.logoScissors}>
							<Scissors size={36} />
						</div>
						<span>NOIR</span>
					</div>
					<div className={styles.loadingProgressWrapper}>
						<div
							className={styles.loadingProgressBar}
							style={{ width: `${loadingProgress}%` }}
						></div>
					</div>
					<span className={styles.loadingPercent}>
						{Math.floor(loadingProgress)}%
					</span>
				</div>
			</div>

			{/* Main Content */}
			<div
				className={`${styles.mainContent} ${isRevealed ? styles.revealed : ""}`}
			>
				{/* Fixed Background Elements */}
				<div className={styles.fixedBackground}>
					<div className={styles.bgLines}>
						<div className={styles.bgLine}></div>
						<div className={styles.bgLine}></div>
						<div className={styles.bgLine}></div>
						<div className={styles.bgLine}></div>
						<div className={styles.bgLine}></div>
					</div>
				</div>

				{/* Fixed Social Links */}
				<div className={styles.fixedSocial}>
					<div className={styles.socialLabel}>PRATITE NAS</div>
					<div className={styles.socialDivider}></div>
					<a
						href="#"
						className={styles.socialIcon}
						data-cursor-text="Instagram"
					>
						<Instagram size={16} />
					</a>
					<a href="#" className={styles.socialIcon}>
						<Facebook size={16} />
					</a>
					<a href="#" className={styles.socialIcon}>
						<Twitter size={16} />
					</a>
				</div>

				{/* Fixed Scroll Indicator */}
				<div
					className={`${styles.scrollIndicator} ${
						scrollPosition > 100 ? styles.scrollIndicatorHidden : ""
					}`}
				>
					<div className={styles.scrollLine}>
						<div className={styles.scrollBall}></div>
					</div>
					<div className={styles.scrollText}>SCROLL</div>
				</div>

				{/* Header */}
				<header
					className={`${styles.header} ${
						scrollPosition > 100 ? styles.headerScrolled : ""
					} ${
						scrollDirection === "up" && scrollPosition > 500
							? styles.headerVisible
							: ""
					}`}
				>
					<div className={styles.headerInner}>
						<div className={styles.logo}>
							<div className={styles.logoScissors}>
								<Scissors size={24} />
							</div>
							<span>NOIR</span>
						</div>

						<nav className={styles.navbar}>
							<a
								href="#home"
								className={`${styles.navLink} ${
									activeSection === "home" ? styles.activeNav : ""
								}`}
								onClick={(e) => {
									e.preventDefault();
									scrollTo("home");
								}}
							>
								POČETNA
							</a>
							<a
								href="#services"
								className={`${styles.navLink} ${
									activeSection === "services" ? styles.activeNav : ""
								}`}
								onClick={(e) => {
									e.preventDefault();
									scrollTo("services");
								}}
							>
								USLUGE
							</a>
							<a
								href="#barbers"
								className={`${styles.navLink} ${
									activeSection === "barbers" ? styles.activeNav : ""
								}`}
								onClick={(e) => {
									e.preventDefault();
									scrollTo("barbers");
								}}
							>
								BRIJAČI
							</a>
							<a
								href="#booking"
								className={`${styles.navLink} ${
									activeSection === "booking" ? styles.activeNav : ""
								}`}
								onClick={(e) => {
									e.preventDefault();
									scrollTo("booking");
								}}
							>
								REZERVIŠI
							</a>
							<a
								href="#gallery"
								className={`${styles.navLink} ${
									activeSection === "gallery" ? styles.activeNav : ""
								}`}
								onClick={(e) => {
									e.preventDefault();
									scrollTo("gallery");
								}}
							>
								GALERIJA
							</a>
						</nav>

						<div className={styles.headerActions}>
							<a href="tel:+38733223344" className={styles.phoneLink}>
								<Phone size={18} />
							</a>
							<button
								className={styles.menuToggle}
								onClick={() => setIsMenuOpen(true)}
							>
								<span className={styles.menuBar}></span>
								<span className={styles.menuBar}></span>
							</button>
						</div>
					</div>
				</header>

				{/* Mobile Menu */}
				<div
					className={`${styles.mobileMenu} ${
						isMenuOpen ? styles.menuOpen : ""
					}`}
				>
					<div className={styles.menuHeader}>
						<div className={styles.menuLogo}>
							<Scissors size={28} />
							<span>NOIR</span>
						</div>
						<button
							className={styles.menuClose}
							onClick={() => setIsMenuOpen(false)}
							data-cursor-text="Zatvori"
						>
							<X size={24} />
						</button>
					</div>
					<nav className={styles.menuNav}>
						<a
							href="#home"
							className={styles.menuLink}
							onClick={(e) => {
								e.preventDefault();
								scrollTo("home");
							}}
						>
							<span className={styles.menuLinkNumber}>01</span>
							<span className={styles.menuLinkText}>Početna</span>
						</a>
						<a
							href="#services"
							className={styles.menuLink}
							onClick={(e) => {
								e.preventDefault();
								scrollTo("services");
							}}
							data-hover="true"
						>
							<span className={styles.menuLinkNumber}>02</span>
							<span className={styles.menuLinkText}>Usluge</span>
						</a>
						<a
							href="#barbers"
							className={styles.menuLink}
							onClick={(e) => {
								e.preventDefault();
								scrollTo("barbers");
							}}
							data-hover="true"
						>
							<span className={styles.menuLinkNumber}>03</span>
							<span className={styles.menuLinkText}>Brijači</span>
						</a>
						<a
							href="#booking"
							className={styles.menuLink}
							onClick={(e) => {
								e.preventDefault();
								scrollTo("booking");
							}}
							data-hover="true"
						>
							<span className={styles.menuLinkNumber}>04</span>
							<span className={styles.menuLinkText}>Rezerviši</span>
						</a>
						<a
							href="#gallery"
							className={styles.menuLink}
							onClick={(e) => {
								e.preventDefault();
								scrollTo("gallery");
							}}
							data-hover="true"
						>
							<span className={styles.menuLinkNumber}>05</span>
							<span className={styles.menuLinkText}>Galerija</span>
						</a>
					</nav>
					<div className={styles.menuFooter}>
						<div className={styles.menuContact}>
							<p>
								<Phone size={16} /> +387 33 223 344
							</p>
							<p>
								<Mail size={16} /> info@noirbarber.ba
							</p>
							<p>
								<MapPin size={16} /> Ferhadija 12, Sarajevo
							</p>
						</div>
						<div className={styles.menuSocial}>
							<a href="#" className={styles.menuSocialIcon}>
								<Instagram size={20} />
							</a>
							<a href="#" className={styles.menuSocialIcon}>
								<Facebook size={20} />
							</a>
							<a href="#" className={styles.menuSocialIcon}>
								<Twitter size={20} />
							</a>
						</div>
					</div>
				</div>

				{/* Video Modal */}
				<div
					className={`${styles.videoModal} ${
						isVideoModalOpen ? styles.videoModalOpen : ""
					}`}
				>
					<button
						className={styles.videoModalClose}
						onClick={() => setIsVideoModalOpen(false)}
						data-cursor-text="Zatvori"
					>
						<X size={24} />
					</button>
				</div>

				{/* Hero Section */}
				<section className={styles.hero} id="home">
					<div className={styles.heroContent}>
						<div className={styles.heroTextContent}>
							<h4 className={styles.heroOverline}>PREMIUM BARBER SHOP</h4>
							<h1 className={styles.heroTitle}>
								<span className={styles.heroTitleLine}>BRIJAČNICA</span>
								<span className={styles.heroTitleLine}>
									ZA <span className={styles.accentText}>PRAVE</span>
								</span>
								<span className={styles.heroTitleLine}>MUŠKARCE</span>
							</h1>
							<p className={styles.heroDescription}>
								Ekskluzivno brijačko iskustvo s modernim pristupom klasičnom
								zanatu. Prepustite se profesionalcima i doživite transformaciju.
							</p>
							<div className={styles.heroActions}>
								<button
									className={styles.primaryButton}
									onClick={() => scrollTo("booking")}
								>
									<span>REZERVIŠI TERMIN</span>
									<ArrowRight size={16} />
								</button>
							</div>
						</div>
						<div className={styles.heroVisual}>
							<div className={styles.heroImageContainer}>
								<div className={styles.heroImage}>
									<img
										src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop"
										alt="Barber Shop"
									/>
								</div>
							</div>
							<div className={styles.heroStat}>
								<div className={styles.statInner}>
									<span className={styles.statNumber}>8+</span>
									<span className={styles.statLabel}>GODINA ISKUSTVA</span>
								</div>
							</div>
							<div className={styles.heroStat}>
								<div className={styles.statInner}>
									<span className={styles.statNumber}>3</span>
									<span className={styles.statLabel}>MASTER BRIJAČA</span>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.heroBgDecoration}>
						<div className={styles.heroBgLine}></div>
						<div className={styles.heroBgLine}></div>
						<div className={styles.heroBgLine}></div>
					</div>
				</section>

				{/* Services Section */}
				<section className={styles.services} id="services" ref={servicesRef}>
					<div className={styles.sectionHeader}>
						<div className={styles.sectionHeaderRow}>
							<span className={styles.sectionOverline}>NAŠE USLUGE</span>
							<span className={styles.sectionNumber}>01</span>
						</div>
						<h2 className={styles.sectionTitle}>
							PREMIUM <span className={styles.accentText}>USLUGE</span>
						</h2>
					</div>

					<div className={styles.servicesContainer}>
						<div className={styles.servicesList}>
							{services.map((service) => (
								<div
									key={service.id}
									className={`${styles.serviceCard} ${
										selectedService === service.id ? styles.activeService : ""
									}`}
									onClick={() =>
										setSelectedService(
											service.id === selectedService ? null : service.id
										)
									}
									data-hover="true"
								>
									<span className={styles.serviceCardName}>{service.name}</span>
									<div className={styles.serviceCardDetails}>
										<span className={styles.serviceCardPrice}>
											{service.price} KM
										</span>
										<div className={styles.serviceCardTime}>
											<Clock size={14} />
											<span>{service.duration} MIN</span>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className={styles.servicesDetails}>
							{services.map((service) => (
								<div
									key={service.id}
									className={`${styles.serviceDetail} ${
										selectedService === service.id ? styles.activeDetail : ""
									}`}
								>
									<div className={styles.serviceImageContainer}>
										<img
											src={service.image}
											alt={service.name}
											className={styles.serviceImage}
										/>
									</div>
									<div className={styles.serviceInfo}>
										<h3 className={styles.serviceDetailName}>
											{service.longName}
										</h3>
										<p className={styles.serviceDescription}>
											{service.description}
										</p>
										<div className={styles.serviceDetailMeta}>
											<div className={styles.serviceDuration}>
												<Clock size={16} />
												<span>{service.duration} minuta</span>
											</div>
											<div className={styles.servicePrice}>
												<span>{service.price} KM</span>
											</div>
										</div>
										<button
											className={styles.bookServiceButton}
											onClick={() => scrollTo("booking")}
											data-cursor-text="Rezerviši"
										>
											<span>REZERVIŠI</span>
											<ArrowRight size={16} />
										</button>
									</div>
								</div>
							))}

							{!selectedService && (
								<div className={styles.selectServicePrompt}>
									<div className={styles.promptIcon}>
										<ChevronLeft size={24} stroke-width={1.5} />
									</div>
									<p>Izaberite uslugu da vidite detalje</p>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Barbers Section */}
				<section className={styles.barbers} id="barbers">
					<div className={styles.sectionHeader}>
						<div className={styles.sectionHeaderRow}>
							<span className={styles.sectionOverline}>NAŠ TIM</span>
							<span className={styles.sectionNumber}>02</span>
						</div>
						<h2 className={styles.sectionTitle}>
							NAŠI <span className={styles.accentText}>BRIJAČI</span>
						</h2>
					</div>

					<div className={styles.barbersContainer}>
						{barbers.map((barber) => (
							<div
								key={barber.id}
								className={`${styles.barberCard} ${
									activeBarber === barber.id ? styles.activeBarber : ""
								}`}
								onClick={() =>
									setActiveBarber(activeBarber === barber.id ? null : barber.id)
								}
								data-hover="true"
							>
								<div className={styles.barberCardInner}>
									<div className={styles.barberImageContainer}>
										<img
											src={barber.image}
											alt={barber.name}
											className={styles.barberImage}
										/>
									</div>
									<div className={styles.barberInfo}>
										<h3 className={styles.barberName}>{barber.name}</h3>
										<span className={styles.barberPosition}>
											{barber.position}
										</span>

										<div className={styles.barberDetails}>
											<p className={styles.barberDescription}>
												{barber.description}
											</p>

											<div className={styles.barberStats}>
												<div className={styles.barberStat}>
													<span className={styles.barberStatValue}>
														{barber.experience}+
													</span>
													<span className={styles.barberStatLabel}>
														Godine iskustva
													</span>
												</div>
												<div className={styles.barberStat}>
													<span className={styles.barberStatValue}>
														{barber.rating}
													</span>
													<span className={styles.barberStatLabel}>
														Prosječna ocjena
													</span>
												</div>
												<div className={styles.barberStat}>
													<span className={styles.barberStatValue}>
														{barber.clients}+
													</span>
													<span className={styles.barberStatLabel}>
														Zadovoljnih klijenata
													</span>
												</div>
											</div>

											<div className={styles.barberAvailability}>
												<h4>Dostupan:</h4>
												<div className={styles.availabilityDays}>
													{[
														"Pon",
														"Uto",
														"Sri",
														"Čet",
														"Pet",
														"Sub",
														"Ned",
													].map((day) => (
														<span
															key={day}
															className={`${styles.availabilityDay} ${
																barber.available.includes(day)
																	? styles.available
																	: ""
															}`}
														>
															{day}
														</span>
													))}
												</div>
											</div>

											<button
												className={styles.bookBarberButton}
												onClick={(e) => {
													e.stopPropagation();
													scrollTo("booking");
												}}
												data-cursor-text="Rezerviši"
											>
												<span>
													REZERVIŠI KOD{" "}
													{barber.name.split(" ")[0].toUpperCase()}
												</span>
												<ArrowRight size={16} />
											</button>
										</div>

										<div className={styles.barberCardActions}>
											<span className={styles.barberInstagram}>
												<Instagram size={16} />@{barber.instagram}
											</span>
											<span className={styles.barberExpandIcon}>
												{activeBarber === barber.id ? (
													<ChevronDown size={20} />
												) : (
													<ChevronRight size={20} />
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Booking Section */}
				<section className={styles.booking} id="booking">
					<div className={styles.sectionHeader}>
						<div className={styles.sectionHeaderRow}>
							<span className={styles.sectionOverline}>REZERVACIJA</span>
							<span className={styles.sectionNumber}>03</span>
						</div>
						<h2 className={styles.sectionTitle}>
							REZERVIŠI <span className={styles.accentText}>TERMIN</span>
						</h2>
					</div>

					<div className={styles.bookingContainer}>
						<div className={styles.bookingForm}>
							<div className={styles.formStep}>
								<span className={styles.stepNumber}>01</span>
								<h3 className={styles.stepTitle}>Izaberite Uslugu</h3>
								<div className={styles.serviceSelection}>
									<div className={styles.serviceSelectionScroll}>
										{services.map((service) => (
											<div
												key={service.id}
												className={`${styles.serviceOption} ${
													selectedService === service.id
														? styles.serviceOptionSelected
														: ""
												}`}
												onClick={() =>
													setSelectedService(
														service.id === selectedService ? null : service.id
													)
												}
												data-hover="true"
											>
												<div className={styles.serviceOptionInfo}>
													<span className={styles.serviceOptionName}>
														{service.longName}
													</span>
													<div className={styles.serviceOptionMeta}>
														<span>{service.duration} min</span>
														<span className={styles.serviceDot}>•</span>
														<span>{service.price} KM</span>
													</div>
												</div>
												<div className={styles.serviceOptionCheck}>
													{selectedService === service.id && (
														<Check size={18} />
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className={styles.formStep}>
								<span className={styles.stepNumber}>02</span>
								<h3 className={styles.stepTitle}>Izaberite Brijača</h3>
								<div className={styles.barberSelection}>
									{barbers.map((barber) => (
										<div
											key={barber.id}
											className={`${styles.barberOption} ${
												activeBarber === barber.id
													? styles.barberOptionSelected
													: ""
											}`}
											onClick={() =>
												setActiveBarber(
													barber.id === activeBarber ? null : barber.id
												)
											}
											data-hover="true"
											data-cursor-text="Izaberi"
										>
											<div className={styles.barberOptionImage}>
												<img src={barber.image} alt={barber.name} />
											</div>
											<div className={styles.barberOptionInfo}>
												<span className={styles.barberOptionName}>
													{barber.name}
												</span>
												<div className={styles.barberOptionRating}>
													<Star size={14} fill="#D4B362" color="#D4B362" />
													<span>{barber.rating}</span>
												</div>
											</div>
											<div className={styles.barberOptionCheck}>
												{activeBarber === barber.id && <Check size={18} />}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className={styles.formStep}>
								<span className={styles.stepNumber}>03</span>
								<h3 className={styles.stepTitle}>Izaberite Datum & Vrijeme</h3>
								<div className={styles.dateSelection}>
									<div className={styles.dateDays}>
										{getNext7Days().map((day, index) => (
											<div
												key={index}
												className={`${styles.dateDay} ${
													index === activeDay ? styles.activeDateDay : ""
												}`}
												onClick={() => setActiveDay(index)}
												data-hover="true"
												data-cursor-text="Izaberi"
											>
												<span className={styles.dateWeekday}>
													{day.weekday}
												</span>
												<span className={styles.dateNumber}>{day.day}</span>
												<span className={styles.dateMonth}>{day.month}</span>
											</div>
										))}
									</div>

									<div className={styles.timeSelection}>
										<h4 className={styles.timeSelectionTitle}>
											Dostupna vremena
										</h4>
										<div className={styles.timeSlots}>
											{timeSlots.map((time, index) => (
												<div
													key={index}
													className={`${styles.timeSlot} ${
														activeTime === time ? styles.activeTimeSlot : ""
													} ${index % 3 === 2 ? styles.unavailableSlot : ""}`}
													onClick={() =>
														index % 3 !== 2 &&
														setActiveTime(time === activeTime ? null : time)
													}
													data-hover="true"
													data-cursor-text={
														index % 3 === 2 ? "Nedostupno" : "Izaberi"
													}
												>
													{time}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							<div className={styles.formStep}>
								<span className={styles.stepNumber}>04</span>
								<h3 className={styles.stepTitle}>Vaši Podaci</h3>
								<div className={styles.contactForm}>
									<div className={styles.formRow}>
										<div className={styles.formField}>
											<label htmlFor="name">Ime i prezime</label>
											<input
												type="text"
												id="name"
												placeholder="Vaše ime i prezime"
											/>
										</div>
									</div>

									<div className={styles.formRow}>
										<div className={styles.formField}>
											<label htmlFor="phone">Telefon</label>
											<input
												type="tel"
												id="phone"
												placeholder="+387 XX XXX XXX"
											/>
										</div>
									</div>

									<div className={styles.formRow}>
										<div className={styles.formField}>
											<label htmlFor="email">Email</label>
											<input
												type="email"
												id="email"
												placeholder="vaš@email.com"
											/>
										</div>
									</div>

									<div className={styles.formRow}>
										<div className={styles.formField}>
											<label htmlFor="notes">Napomena</label>
											<textarea
												id="notes"
												placeholder="Dodatne napomene ili posebni zahtjevi"
												rows={3}
											></textarea>
										</div>
									</div>
								</div>
							</div>

							<button
								className={styles.submitBookingButton}
								disabled={!selectedService || !activeBarber || !activeTime}
							>
								<span>POTVRDI REZERVACIJU</span>
								<ArrowRight size={16} />
							</button>
						</div>

						<div className={styles.bookingSummary}>
							<h3 className={styles.summaryTitle}>Tvoja Rezervacija</h3>

							{selectedService || activeBarber || activeTime ? (
								<div className={styles.summaryDetails}>
									{selectedService && (
										<div className={styles.summaryItem}>
											<div className={styles.summaryItemIcon}>
												<Scissors size={18} />
											</div>
											<div className={styles.summaryItemContent}>
												<span className={styles.summaryItemLabel}>Usluga</span>
												<span className={styles.summaryItemValue}>
													{
														services.find((s) => s.id === selectedService)
															?.longName
													}
												</span>
											</div>
										</div>
									)}

									{activeBarber && (
										<div className={styles.summaryItem}>
											<div className={styles.summaryItemIcon}>
												<Users size={18} />
											</div>
											<div className={styles.summaryItemContent}>
												<span className={styles.summaryItemLabel}>Brijač</span>
												<span className={styles.summaryItemValue}>
													{barbers.find((b) => b.id === activeBarber)?.name}
												</span>
											</div>
										</div>
									)}

									{activeDay !== null && (
										<div className={styles.summaryItem}>
											<div className={styles.summaryItemIcon}>
												<Calendar size={18} />
											</div>
											<div className={styles.summaryItemContent}>
												<span className={styles.summaryItemLabel}>Datum</span>
												<span className={styles.summaryItemValue}>
													{getNext7Days()[activeDay].weekday},{" "}
													{getNext7Days()[activeDay].day}.{" "}
													{getNext7Days()[activeDay].month}
												</span>
											</div>
										</div>
									)}

									{activeTime && (
										<div className={styles.summaryItem}>
											<div className={styles.summaryItemIcon}>
												<Clock size={18} />
											</div>
											<div className={styles.summaryItemContent}>
												<span className={styles.summaryItemLabel}>Vrijeme</span>
												<span className={styles.summaryItemValue}>
													{activeTime} h
												</span>
											</div>
										</div>
									)}

									{selectedService && (
										<div className={styles.summaryPrice}>
											<span className={styles.summaryPriceLabel}>Ukupno:</span>
											<span className={styles.summaryPriceValue}>
												{services.find((s) => s.id === selectedService)?.price}{" "}
												KM
											</span>
										</div>
									)}
								</div>
							) : (
								<div className={styles.emptySummary}>
									<p>
										Izaberite uslugu, brijača i termin da vidite rezime vaše
										rezervacije.
									</p>
								</div>
							)}

							<div className={styles.summaryContact}>
								<div className={styles.contactItem}>
									<Phone size={16} /> +387 33 223 344
								</div>
								<div className={styles.contactItem}>
									<MapPin size={16} /> Ferhadija 12, Sarajevo
								</div>
								<div className={styles.contactItem}>
									<Clock size={16} /> Pon-Pet: 10-20h, Sub: 10-18h
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Gallery Section */}
				<section className={styles.gallery} id="gallery">
					<div className={styles.sectionHeader}>
						<div className={styles.sectionHeaderRow}>
							<span className={styles.sectionOverline}>GALERIJA</span>
							<span className={styles.sectionNumber}>04</span>
						</div>
						<h2 className={styles.sectionTitle}>
							NAŠI <span className={styles.accentText}>RADOVI</span>
						</h2>
					</div>

					<div className={styles.galleryGrid}>
						<div className={`${styles.galleryItem} ${styles.galleryItemLarge}`}>
							<img
								src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=2069&auto=format&fit=crop"
								alt="Barber work"
							/>
							<div className={styles.galleryItemOverlay} data-hover="true">
								<div className={styles.galleryItemContent}>
									<h3>Classic Cut</h3>
									<p>Premium muško šišanje</p>
								</div>
							</div>
						</div>
						<div className={styles.galleryItem}>
							<img
								src="https://images.pexels.com/photos/7781848/pexels-photo-7781848.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Barber work"
							/>
							<div
								className={styles.galleryItemOverlay}
								data-hover="true"
								data-cursor-text="Zumiraj"
							>
								<div className={styles.galleryItemContent}>
									<h3>Fade Premium</h3>
									<p>Precizno šišanje</p>
								</div>
							</div>
						</div>
						<div className={styles.galleryItem}>
							<img
								src="https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Barber work"
							/>
							<div
								className={styles.galleryItemOverlay}
								data-hover="true"
								data-cursor-text="Zumiraj"
							>
								<div className={styles.galleryItemContent}>
									<h3>Royal Beard</h3>
									<p>Oblikovanje brade</p>
								</div>
							</div>
						</div>
						<div className={styles.galleryItem}>
							<img
								src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
								alt="Barber work"
							/>
							<div
								className={styles.galleryItemOverlay}
								data-hover="true"
								data-cursor-text="Zumiraj"
							>
								<div className={styles.galleryItemContent}>
									<h3>Hot Shave</h3>
									<p>Tradicionalno brijanje</p>
								</div>
							</div>
						</div>
						<div className={styles.galleryItem}>
							<img
								src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop"
								alt="Barber work"
							/>
							<div
								className={styles.galleryItemOverlay}
								data-hover="true"
								data-cursor-text="Zumiraj"
							>
								<div className={styles.galleryItemContent}>
									<h3>Premium Cut</h3>
									<p>Moderno šišanje</p>
								</div>
							</div>
						</div>
						<div className={`${styles.galleryItem} ${styles.galleryItemLarge}`}>
							<img
								src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
								alt="Barber work"
							/>
							<div
								className={styles.galleryItemOverlay}
								data-hover="true"
								data-cursor-text="Zumiraj"
							>
								<div className={styles.galleryItemContent}>
									<h3>Beard Design</h3>
									<p>Kreativno oblikovanje</p>
								</div>
							</div>
						</div>
					</div>

					<a href="#" className={styles.viewMoreButton}>
						<span>VIŠE NA INSTAGRAMU</span>
						<Instagram size={16} />
					</a>
				</section>

				{/* Footer */}
				<footer className={styles.footer}>
					<div className={styles.footerContent}>
						<div className={styles.footerTop}>
							<div className={styles.footerLogo}>
								<div className={styles.logoScissors}>
									<Scissors size={32} />
								</div>
								<span>NOIR</span>
							</div>

							<div className={styles.footerNav}>
								<a
									href="#home"
									className={styles.footerLink}
									onClick={(e) => {
										e.preventDefault();
										scrollTo("home");
									}}
									data-hover="true"
								>
									Početna
								</a>
								<a
									href="#services"
									className={styles.footerLink}
									onClick={(e) => {
										e.preventDefault();
										scrollTo("services");
									}}
									data-hover="true"
								>
									Usluge
								</a>
								<a
									href="#barbers"
									className={styles.footerLink}
									onClick={(e) => {
										e.preventDefault();
										scrollTo("barbers");
									}}
									data-hover="true"
								>
									Brijači
								</a>
								<a
									href="#booking"
									className={styles.footerLink}
									onClick={(e) => {
										e.preventDefault();
										scrollTo("booking");
									}}
									data-hover="true"
								>
									Rezerviši
								</a>
								<a
									href="#gallery"
									className={styles.footerLink}
									onClick={(e) => {
										e.preventDefault();
										scrollTo("gallery");
									}}
									data-hover="true"
								>
									Galerija
								</a>
							</div>

							<div className={styles.footerContact}>
								<div className={styles.footerContactItem}>
									<strong>Email:</strong> info@noirbarber.ba
								</div>
								<div className={styles.footerContactItem}>
									<strong>Telefon:</strong> +387 33 223 344
								</div>
								<div className={styles.footerContactItem}>
									<strong>Adresa:</strong> Ferhadija 12, Sarajevo
								</div>
							</div>

							<div className={styles.footerSocial}>
								<a
									href="#"
									className={styles.footerSocialIcon}
									data-cursor-text="Instagram"
								>
									<Instagram size={20} />
								</a>
								<a
									href="#"
									className={styles.footerSocialIcon}
									data-cursor-text="Facebook"
								>
									<Facebook size={20} />
								</a>
								<a
									href="#"
									className={styles.footerSocialIcon}
									data-cursor-text="Twitter"
								>
									<Twitter size={20} />
								</a>
							</div>
						</div>

						<div className={styles.footerBottom}>
							<div className={styles.copyright}>
								© {new Date().getFullYear()} NOIR Barber Shop. Sva prava
								pridržana.
							</div>

							<button
								className={styles.scrollToTopButton}
								onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							>
								<ArrowUp size={20} />
							</button>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

// Adding missing components that don't exist in the imports
const Facebook = ({ size }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
		</svg>
	);
};

const Twitter = ({ size }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
		</svg>
	);
};

const ChevronLeft = ({ size, ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<polyline points="15 18 9 12 15 6"></polyline>
		</svg>
	);
};

const ArrowUp = ({ size }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="12" y1="19" x2="12" y2="5"></line>
			<polyline points="5 12 12 5 19 12"></polyline>
		</svg>
	);
};

export default BarberReservation;
