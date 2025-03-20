import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../../components/common/BackButton/BackButton";
import styles from "./NewsPage.module.css";
import data from "./data.json";

const NewsPage = () => {
	const [activeCategory, setActiveCategory] = useState("front");
	const [searchTerm, setSearchTerm] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState("");
	const [showBreakingNews, setShowBreakingNews] = useState(true);
	const [activeStoryIndex, setActiveStoryIndex] = useState(0);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [focusedArticle, setFocusedArticle] = useState(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [readLaterList, setReadLaterList] = useState([]);
	const [likedArticles, setLikedArticles] = useState([]);
	const [showReadingList, setShowReadingList] = useState(false);

	// Refs for animated elements
	const headerRef = useRef(null);
	const heroRef = useRef(null);
	const scrollRef = useRef(null);

	// Current time display
	const [currentTime, setCurrentTime] = useState(getCurrentTime());
	const [coverStoryIndex, setCoverStoryIndex] = useState(0);

	// Format current date in Bosnian
	useEffect(() => {
		const today = new Date();
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		// Use Bosnian formatting
		const formatter = new Intl.DateTimeFormat("bs-BA", options);

		// Update year to 2025
		const formattedDate = formatter.format(today).replace(/2023|2024/, "2025");
		setCurrentDate(formattedDate);

		// Handle page load animation
		setTimeout(() => {
			setPageLoaded(true);
		}, 300);

		// Set up scroll listener for parallax and header effects
		const handleScroll = () => {
			if (!headerRef.current) return;
			const scrollY = window.scrollY;
			setScrollPosition(scrollY);

			if (scrollY > 50) {
				headerRef.current.classList.add(styles.np_scrolled);
			} else {
				headerRef.current.classList.remove(styles.np_scrolled);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Breaking news ticker controller with auto-rotation
	useEffect(() => {
		if (!showBreakingNews) return;

		const interval = setInterval(() => {
			setActiveStoryIndex((prev) => (prev + 1) % data.breakingNews.length);
		}, 7000);

		return () => clearInterval(interval);
	}, [showBreakingNews]);

	// Automated headline carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCoverStoryIndex((prev) => (prev + 1) % data.coverStories.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	function getCurrentTime() {
		const now = new Date();
		return now.toLocaleTimeString("bs-BA", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(getCurrentTime());
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	}, []);

	// Filter news based on active category
	const getFilteredNews = () => {
		if (activeCategory === "front") return data.latestNews;
		return data.latestNews.filter(
			(news) => news.category.toLowerCase() === activeCategory.toLowerCase()
		);
	};

	// Handle search input change
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// Handle category selection
	const handleCategoryChange = (categoryId) => {
		setActiveCategory(categoryId);
		setIsMobileMenuOpen(false);
	};

	// Save article to Reading List
	const toggleReadLater = (articleId, event) => {
		event.stopPropagation();
		setReadLaterList((prev) => {
			if (prev.includes(articleId)) {
				return prev.filter((id) => id !== articleId);
			} else {
				return [...prev, articleId];
			}
		});
	};

	// Like an article
	const toggleLike = (articleId, event) => {
		event.stopPropagation();
		setLikedArticles((prev) => {
			if (prev.includes(articleId)) {
				return prev.filter((id) => id !== articleId);
			} else {
				return [...prev, articleId];
			}
		});
	};

	// Get category color for badges
	const getCategoryColor = (category) => {
		const categoryMap = {
			politics: styles.np_categoryPolitics,
			business: styles.np_categoryBusiness,
			world: styles.np_categoryWorld,
			sports: styles.np_categorySports,
			culture: styles.np_categoryCulture,
			tech: styles.np_categoryTech,
			lifestyle: styles.np_categoryLifestyle,
			health: styles.np_categoryHealth,
			education: styles.np_categoryEducation,
			local: styles.np_categoryLocal,
		};

		return categoryMap[category] || styles.np_categoryDefault;
	};

	// Get iconography for UI elements
	const getIcon = (name) => {
		switch (name) {
			case "home":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M9 22V12h6v10"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "politics":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M2 20h20"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M5 20v-4a2 2 0 012-2h1a2 2 0 012 2v4"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M14 20v-4a2 2 0 012-2h1a2 2 0 012 2v4"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M12 4L3 9h18L12 4z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "business":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M22 12h-4l-3 9L9 3l-3 9H2"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "world":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<circle
							cx="12"
							cy="12"
							r="10"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "sports":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<circle
							cx="12"
							cy="12"
							r="10"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "culture":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "tech":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<rect
							width="18"
							height="12"
							x="3"
							y="4"
							rx="2"
							ry="2"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M8 20h8M12 16v4"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "lifestyle":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "search":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<circle
							cx="11"
							cy="11"
							r="8"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M21 21l-4.35-4.35"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "bookmark":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "bookmarkFilled":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
							fill="currentColor"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "heart":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "heartFilled":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
							fill="currentColor"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "share":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "comment":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "time":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<circle
							cx="12"
							cy="12"
							r="10"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M12 6v6l4 2"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "crown":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M2 8l4 9h12l4-9"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M12 8L2 8M22 8L12 8"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M5 3L8 8 12 3 16 8 19 3"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M2 21h20"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "trending":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M23 6l-9.5 9.5-5-5L1 18"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M17 6h6v6"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "sunny":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<circle
							cx="12"
							cy="12"
							r="5"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "partly_cloudy":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M8 3v2M16 3v2M3 8h2M19 8h2M3 16h2M5.45 5.46l1.41 1.41M18.54 5.48l-1.41 1.41"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M9 16a5 5 0 116.5-6.5M16 16a3 3 0 106-1 5 5 0 10-10 0"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "rainy":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M16 13v8M8 13v8M12 15v8"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M20 13a5 5 0 10-10 0 5 5 0 00-10 0M20 13a5 5 0 11-10 0 5 5 0 0110 0z"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "date":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<rect
							x="3"
							y="4"
							width="18"
							height="18"
							rx="2"
							ry="2"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
						<path
							d="M16 2v4M8 2v4M3 10h18"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "close":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M18 6L6 18M6 6l12 12"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "chevron-right":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M9 18l6-6-6-6"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			case "notifications":
				return (
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className={`${styles.np_newsContainer} ${
				pageLoaded ? styles.np_loaded : ""
			}`}
		>
			{/* Back button to portfolio */}
			<div className={styles.np_backButtonWrapper}>
				<BackButton />
			</div>

			{/* Breaking news ticker */}
			{showBreakingNews && (
				<div className={styles.np_breakingNewsContainer}>
					<div className={styles.np_breakingNewsContent}>
						<span className={styles.np_breakingLabel}>
							<div className={styles.np_pulsingDot}></div>
							NAJNOVIJE
						</span>
						<div className={styles.np_breakingTextWrapper}>
							{data.breakingNews.map((news, index) => (
								<div
									key={news.id}
									className={`${styles.np_breakingText} ${
										index === activeStoryIndex
											? styles.np_activeBreakingNews
											: ""
									}`}
								>
									<a href={`#${news.id}`}>
										<span className={styles.np_breakingCategory}>
											{news.category}
										</span>
										{news.title}
										<span className={styles.np_breakingTime}>
											{news.timestamp}
										</span>
									</a>
								</div>
							))}
						</div>
						<div className={styles.np_breakingProgress}>
							<div
								className={styles.np_breakingProgressBar}
								style={{
									width: `${
										((activeStoryIndex + 1) / data.breakingNews.length) * 100
									}%`,
								}}
							></div>
						</div>
						<button
							className={styles.np_closeBreaking}
							onClick={() => setShowBreakingNews(false)}
							aria-label="Zatvori"
						>
							{getIcon("close")}
						</button>
					</div>
				</div>
			)}

			{/* Header */}
			<header
				className={styles.np_newsHeader}
				ref={headerRef}
				style={{
					top: showBreakingNews ? "44px" : "0",
				}}
			>
				<div className={styles.np_headerMain}>
					<div className={styles.np_logoContainer}>
						<h1 className={styles.np_newsLogo}>
							<span className={styles.np_logoText}>Glasnik</span>
							<span className={styles.np_logoDot}></span>
						</h1>
					</div>

					<div className={styles.np_headerControls}>
						<div className={styles.np_dateWeather}>
							<div className={styles.np_date}>
								<span className={styles.np_dateIcon}>{getIcon("date")}</span>
								{currentDate}
							</div>
							<div className={styles.np_weather}>
								<span className={styles.np_weatherIcon}>
									{getIcon("sunny")}
								</span>
								<span className={styles.np_weatherTemp}>
									{data.weatherData.temp}
								</span>
								<span className={styles.np_weatherCity}>
									{data.weatherData.city}
								</span>
								<div className={styles.np_weatherForecastWrapper}>
									<div className={styles.np_weatherForecast}>
										<div className={styles.np_forecastHeader}>
											<span>5-dnevna prognoza</span>
										</div>
										<div className={styles.np_forecastContent}>
											{data.weatherData.forecast.map((day) => (
												<div key={day.day} className={styles.np_forecastDay}>
													<span className={styles.np_forecastIcon}>
														{getIcon(day.icon)}
													</span>
													<span className={styles.np_forecastTemp}>
														{day.temp}
													</span>
													<span className={styles.np_forecastName}>
														{day.day}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.np_headerActions}>
							<div className={styles.np_searchContainer}>
								<span className={styles.np_searchIcon}>
									{getIcon("search")}
								</span>
								<input
									type="text"
									placeholder="Pretraži vijesti..."
									value={searchTerm}
									onChange={handleSearchChange}
									className={styles.np_searchInput}
								/>
							</div>

							<button
								className={styles.np_readingListButton}
								onClick={() => setShowReadingList(!showReadingList)}
								aria-label="Lista za čitanje"
							>
								<span className={styles.np_readingListIcon}>
									{getIcon("bookmark")}
									{readLaterList.length > 0 && (
										<span className={styles.np_notificationBadge}>
											{readLaterList.length}
										</span>
									)}
								</span>
							</button>

							<div className={styles.np_userMenu}>
								<button className={styles.np_userMenuButton}>
									<span className={styles.np_notificationsIcon}>
										{getIcon("notifications")}
										<span className={styles.np_notificationBadge}>3</span>
									</span>
								</button>
								<div className={styles.np_userAvatar}>
									<img
										src="https://i.pravatar.cc/150?img=32"
										alt="Korisnički profil"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Categories navigation */}
				<nav className={styles.np_categoriesNav}>
					<button
						className={styles.np_mobileMenuButton}
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						aria-label="Kategorije"
					>
						<span>Kategorije</span>
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							style={{
								transform: isMobileMenuOpen ? "rotate(180deg)" : "rotate(0)",
							}}
						>
							<polyline
								points="6 9 12 15 18 9"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</button>

					<ul
						className={`${styles.np_categoriesList} ${
							isMobileMenuOpen ? styles.np_mobileMenuOpen : ""
						}`}
					>
						{data.categories.map((category, index) => (
							<li key={category.id}>
								<button
									className={`${styles.np_categoryButton} ${
										activeCategory === category.id
											? styles.np_activeCategory
											: ""
									}`}
									onClick={() => handleCategoryChange(category.id)}
									style={{ animationDelay: `${index * 0.05}s` }}
								>
									<span className={styles.np_categoryIcon}>
										{getIcon(category.icon)}
									</span>
									<span>{category.name}</span>
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* Subscription banner */}
				<div className={styles.np_premiumBanner}>
					<div className={styles.np_premiumContent}>
						<div className={styles.np_premiumIcon}>{getIcon("crown")}</div>
						<div className={styles.np_premiumText}>
							<h3>Glasnik Premium</h3>
							<p>
								Ekskluzivni sadržaj, analitika i pristup svim arhiviranim
								izdanjima
							</p>
						</div>
					</div>
					<button className={styles.np_premiumButton}>
						Aktiviraj 30 dana besplatno
					</button>
				</div>
			</header>

			{/* Main content */}
			<main className={styles.np_newsContent}>
				{/* Cover Story Hero Section */}
				<section className={styles.np_coverStorySection}>
					<div
						className={styles.np_coverStoriesTrack}
						style={{ transform: `translateX(-${coverStoryIndex * 100}%)` }}
					>
						{data.coverStories.map((story, index) => (
							<article
								key={story.id}
								className={`${styles.np_coverStory} ${
									index === coverStoryIndex ? styles.np_activeCoverStory : ""
								}`}
							>
								<div className={styles.np_coverImageWrapper}>
									<img
										src={story.image}
										alt={story.title}
										className={styles.np_coverImage}
									/>
									<div className={styles.np_coverOverlay}>
										<div className={styles.np_coverContent}>
											<div className={styles.np_coverMeta}>
												<span
													className={`${
														styles.np_coverCategory
													} ${getCategoryColor(story.category)}`}
												>
													{story.category}
												</span>
												{story.premium && (
													<span className={styles.np_premiumLabel}>
														<span className={styles.np_premiumIcon}>
															{getIcon("crown")}
														</span>
														Premium
													</span>
												)}
											</div>

											<h2 className={styles.np_coverTitle}>{story.title}</h2>
											<p className={styles.np_coverExcerpt}>{story.excerpt}</p>

											<div className={styles.np_coverDetails}>
												<div className={styles.np_coverAuthor}>
													<div className={styles.np_authorInitials}>
														{story.author
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</div>
													<span>{story.author}</span>
												</div>

												<div className={styles.np_coverMisc}>
													<span className={styles.np_coverDate}>
														<span className={styles.np_dateIcon}>
															{getIcon("date")}
														</span>
														{story.date}
													</span>
													<span className={styles.np_coverReadTime}>
														<span className={styles.np_timeIcon}>
															{getIcon("time")}
														</span>
														{story.readTime}
													</span>
												</div>

												<div className={styles.np_coverActions}>
													<button
														className={`${styles.np_actionButton} ${
															readLaterList.includes(story.id)
																? styles.np_active
																: ""
														}`}
														onClick={(e) => toggleReadLater(story.id, e)}
														aria-label={
															readLaterList.includes(story.id)
																? "Ukloni iz liste za čitanje"
																: "Sačuvaj za kasnije"
														}
													>
														{readLaterList.includes(story.id)
															? getIcon("bookmarkFilled")
															: getIcon("bookmark")}
													</button>
													<button
														className={`${styles.np_actionButton} ${
															likedArticles.includes(story.id)
																? styles.np_active
																: ""
														}`}
														onClick={(e) => toggleLike(story.id, e)}
														aria-label={
															likedArticles.includes(story.id)
																? "Ukloni oznaku 'Sviđa mi se'"
																: "Označi sa 'Sviđa mi se'"
														}
													>
														{likedArticles.includes(story.id)
															? getIcon("heartFilled")
															: getIcon("heart")}
													</button>
													<button
														className={`${styles.np_actionButton}`}
														aria-label="Dijeli"
													>
														{getIcon("share")}
													</button>
												</div>
											</div>

											<a
												href={`/news/${story.id}`}
												className={styles.np_coverReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.np_coverReadMoreIcon}>
													{getIcon("chevron-right")}
												</span>
											</a>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className={styles.np_coverStoryControls}>
						<div className={styles.np_coverStoryDots}>
							{data.coverStories.map((_, index) => (
								<button
									key={index}
									className={`${styles.np_coverStoryDot} ${
										index === coverStoryIndex ? styles.np_activeDot : ""
									}`}
									onClick={() => setCoverStoryIndex(index)}
									aria-label={`Prijeđi na vijest ${index + 1}`}
								></button>
							))}
						</div>
					</div>
				</section>

				{/* Main grid layout for news content */}
				<div className={styles.np_newsGrid}>
					{/* Featured News Column */}
					<section className={styles.np_featuredNews}>
						<div className={styles.np_sectionHeader}>
							<h2 className={styles.np_sectionTitle}>
								<span className={styles.np_titleText}>Izdvojeno</span>
								<span className={styles.np_titleLine}></span>
							</h2>
						</div>

						<div className={styles.np_featuredNewsGrid}>
							{data.featuredNews.map((article) => (
								<article key={article.id} className={styles.np_featuredArticle}>
									<div className={styles.np_featuredImageWrapper}>
										<img
											src={article.image}
											alt={article.title}
											className={styles.np_featuredImage}
										/>
										<div className={styles.np_featuredMeta}>
											<span
												className={`${
													styles.np_featuredCategory
												} ${getCategoryColor(article.category)}`}
											>
												{article.category}
											</span>
											{article.premium && (
												<span className={styles.np_premiumLabel}>
													<span className={styles.np_premiumIcon}>
														{getIcon("crown")}
													</span>
													Premium
												</span>
											)}
										</div>
									</div>

									<div className={styles.np_featuredContent}>
										<h3 className={styles.np_featuredTitle}>{article.title}</h3>
										<p className={styles.np_featuredExcerpt}>
											{article.excerpt}
										</p>

										<div className={styles.np_featuredDetails}>
											<span className={styles.np_featuredAuthor}>
												{article.author}
											</span>
											<span className={styles.np_featuredDate}>
												{article.date}
											</span>
											<span className={styles.np_featuredReadTime}>
												<span className={styles.np_timeIcon}>
													{getIcon("time")}
												</span>
												{article.readTime}
											</span>
										</div>

										<div className={styles.np_featuredActions}>
											<button
												className={`${styles.np_actionButton} ${
													readLaterList.includes(article.id)
														? styles.np_active
														: ""
												}`}
												onClick={(e) => toggleReadLater(article.id, e)}
												aria-label={
													readLaterList.includes(article.id)
														? "Ukloni iz liste za čitanje"
														: "Sačuvaj za kasnije"
												}
											>
												{readLaterList.includes(article.id)
													? getIcon("bookmarkFilled")
													: getIcon("bookmark")}
											</button>
											<button
												className={`${styles.np_actionButton} ${
													likedArticles.includes(article.id)
														? styles.np_active
														: ""
												}`}
												onClick={(e) => toggleLike(article.id, e)}
												aria-label={
													likedArticles.includes(article.id)
														? "Ukloni oznaku 'Sviđa mi se'"
														: "Označi sa 'Sviđa mi se'"
												}
											>
												{likedArticles.includes(article.id)
													? getIcon("heartFilled")
													: getIcon("heart")}
											</button>
											<a
												href={`/news/${article.id}`}
												className={styles.np_featuredReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.np_coverReadMoreIcon}>
													{getIcon("chevron-right")}
												</span>
											</a>
										</div>
									</div>
								</article>
							))}
						</div>
					</section>

					{/* Main News Column */}
					<section className={styles.np_mainNews}>
						<div className={styles.np_sectionHeader}>
							<h2 className={styles.np_sectionTitle}>
								<span className={styles.np_titleText}>
									{activeCategory === "front"
										? "Najnovije vijesti"
										: data.categories.find((c) => c.id === activeCategory)
												?.name || "Najnovije"}
								</span>
								<span className={styles.np_titleLine}></span>
							</h2>

							{searchTerm && (
								<p className={styles.np_searchResults}>
									Rezultati pretrage za: <span>"{searchTerm}"</span>
								</p>
							)}
						</div>

						<div className={styles.np_newsArticlesGrid}>
							{getFilteredNews().map((article) => (
								<article
									key={article.id}
									className={styles.np_newsArticle}
									onMouseEnter={() => setFocusedArticle(article.id)}
									onMouseLeave={() => setFocusedArticle(null)}
								>
									<div className={styles.np_articleImageWrapper}>
										<img
											src={article.image}
											alt={article.title}
											className={styles.np_articleImage}
										/>
										<span
											className={`${
												styles.np_articleCategory
											} ${getCategoryColor(article.category)}`}
										>
											{article.category}
										</span>
									</div>

									<div className={styles.np_articleContent}>
										<h3 className={styles.np_articleTitle}>{article.title}</h3>
										<p className={styles.np_articleExcerpt}>
											{article.excerpt}
										</p>

										<div className={styles.np_articleMeta}>
											<span className={styles.np_articleAuthor}>
												{article.author}
											</span>
											<span className={styles.np_articleDate}>
												{article.date}
											</span>
											<span className={styles.np_articleReadTime}>
												<span className={styles.np_timeIcon}>
													{getIcon("time")}
												</span>
												{article.readTime}
											</span>
										</div>

										<div
											className={`${styles.np_articleActions} ${
												focusedArticle === article.id ? styles.np_visible : ""
											}`}
										>
											<button
												className={`${styles.np_actionButton} ${
													readLaterList.includes(article.id)
														? styles.np_active
														: ""
												}`}
												onClick={(e) => toggleReadLater(article.id, e)}
												aria-label={
													readLaterList.includes(article.id)
														? "Ukloni iz liste za čitanje"
														: "Sačuvaj za kasnije"
												}
											>
												{readLaterList.includes(article.id)
													? getIcon("bookmarkFilled")
													: getIcon("bookmark")}
											</button>
											<button
												className={`${styles.np_actionButton} ${
													likedArticles.includes(article.id)
														? styles.np_active
														: ""
												}`}
												onClick={(e) => toggleLike(article.id, e)}
												aria-label={
													likedArticles.includes(article.id)
														? "Ukloni oznaku 'Sviđa mi se'"
														: "Označi sa 'Sviđa mi se'"
												}
											>
												{likedArticles.includes(article.id)
													? getIcon("heartFilled")
													: getIcon("heart")}
											</button>
											<a
												href={`/news/${article.id}`}
												className={styles.np_articleReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.np_coverReadMoreIcon}>
													{getIcon("chevron-right")}
												</span>
											</a>
										</div>
									</div>
								</article>
							))}
						</div>
					</section>

					{/* Sidebar News Column */}
					<aside className={styles.np_sidebar}>
						{/* Editor's Picks */}
						<section className={styles.np_editorsPicksSection}>
							<div className={styles.np_sectionHeader}>
								<h2 className={styles.np_sectionTitle}>
									<span className={styles.np_titleText}>Izbor Urednika</span>
									<span className={styles.np_titleLine}></span>
								</h2>
							</div>

							<div className={styles.np_editorsPicks}>
								{data.editorsPicks.map((article) => (
									<article
										key={article.id}
										className={styles.np_editorsPickItem}
									>
										<div className={styles.np_editorsPickImageWrapper}>
											<img
												src={article.image}
												alt={article.title}
												className={styles.np_editorsPickImage}
											/>
										</div>

										<div className={styles.np_editorsPickContent}>
											<h3 className={styles.np_editorsPickTitle}>
												{article.title}
											</h3>
											<div className={styles.np_editorsPickMeta}>
												<span
													className={`${
														styles.np_editorsPickCategory
													} ${getCategoryColor(article.category)}`}
												>
													{article.category}
												</span>
												<span className={styles.np_editorsPickDate}>
													{article.date}
												</span>
												{article.trending && (
													<span className={styles.np_trendingLabel}>
														<span className={styles.np_trendingIcon}>
															{getIcon("trending")}
														</span>
														Trending
													</span>
												)}
											</div>
										</div>
									</article>
								))}
							</div>
						</section>

						{/* Trending Now */}
						<section className={styles.np_trendingSection}>
							<div className={styles.np_sectionHeader}>
								<h2 className={styles.np_sectionTitle}>
									<span className={styles.np_titleText}>Trending</span>
									<span className={styles.np_titleLine}></span>
								</h2>
							</div>

							<div className={styles.np_trendingList}>
								{data.trendingNews.map((article, index) => (
									<article key={article.id} className={styles.np_trendingItem}>
										<span className={styles.np_trendingNumber}>
											{index + 1}
										</span>
										<div className={styles.np_trendingContent}>
											<h3 className={styles.np_trendingTitle}>
												{article.title}
											</h3>
											<div className={styles.np_trendingMeta}>
												<span
													className={`${
														styles.np_trendingCategory
													} ${getCategoryColor(article.category)}`}
												>
													{article.category}
												</span>
												<span className={styles.np_trendingEngagement}>
													<span className={styles.np_trendingShares}>
														<span className={styles.np_shareIcon}>
															{getIcon("share")}
														</span>
														{article.shares}
													</span>
													<span className={styles.np_trendingComments}>
														<span className={styles.np_commentIcon}>
															{getIcon("comment")}
														</span>
														{article.comments}
													</span>
												</span>
											</div>
										</div>
									</article>
								))}
							</div>
						</section>

						{/* Newsletter Subscription */}
						<section className={styles.np_newsletterSection}>
							<div className={styles.np_newsletterContent}>
								<h3 className={styles.np_newsletterTitle}>
									Ostanite Informisani
								</h3>
								<p className={styles.np_newsletterText}>
									Pretplatite se na naš dnevni newsletter i budite prvi koji
									saznaje najnovije vijesti
								</p>
								<form className={styles.np_newsletterForm}>
									<input
										type="email"
										placeholder="Vaša email adresa"
										className={styles.np_newsletterInput}
										required
									/>
									<button type="submit" className={styles.np_newsletterButton}>
										Pretplati se
									</button>
								</form>
								<p className={styles.np_newsletterDisclaimer}>
									Prijavom prihvatate naše uslove korištenja i politiku
									privatnosti.
								</p>
							</div>
						</section>
					</aside>
				</div>
			</main>

			{/* Footer */}
			<footer className={styles.np_newsFooter}>
				<div className={styles.np_footerTop}>
					<div className={styles.np_footerLogo}>
						<span className={styles.np_logoText}>Glasnik</span>
						<span className={styles.np_logoDot}></span>
						<p className={styles.np_footerTagline}>Vijesti iz budućnosti</p>
					</div>

					<div className={styles.np_footerNav}>
						<div className={styles.np_footerNavColumn}>
							<h3 className={styles.np_footerNavTitle}>Sekcije</h3>
							<ul className={styles.np_footerNavList}>
								{data.categories.map((category) => (
									<li key={category.id}>
										<a href={`#${category.id}`}>
											<span className={styles.np_footerNavIcon}>
												{getIcon(category.icon)}
											</span>
											{category.name}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className={styles.np_footerNavColumn}>
							<h3 className={styles.np_footerNavTitle}>Glasnik</h3>
							<ul className={styles.np_footerNavList}>
								<li>
									<a href="#about">O nama</a>
								</li>
								<li>
									<a href="#team">Redakcija</a>
								</li>
								<li>
									<a href="#ethics">Etički kodeks</a>
								</li>
								<li>
									<a href="#careers">Karijere</a>
								</li>
								<li>
									<a href="#contact">Kontakt</a>
								</li>
							</ul>
						</div>

						<div className={styles.np_footerNavColumn}>
							<h3 className={styles.np_footerNavTitle}>Pratite nas</h3>
							<div className={styles.np_footerSocials}>
								<a href="#facebook" className={styles.np_footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.np_footerSocialIcon}
									>
										<path
											d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
								</a>
								<a href="#twitter" className={styles.np_footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.np_footerSocialIcon}
									>
										<path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
								</a>
								<a href="#instagram" className={styles.np_footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.np_footerSocialIcon}
									>
										<rect
											width="20"
											height="20"
											x="2"
											y="2"
											rx="5"
											ry="5"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
										<path
											d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
										<path
											d="M17.5 6.5h.01"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
								</a>
								<a href="#youtube" className={styles.np_footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.np_footerSocialIcon}
									>
										<path
											d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
										<path
											d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
								</a>
							</div>

							<h3 className={styles.np_footerNavTitle}>Preuzmi aplikaciju</h3>
							<div className={styles.np_appButtons}>
								<a href="#appstore" className={styles.np_appButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.np_appButtonIcon}
									>
										<path
											d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
											fill="currentColor"
										/>
									</svg>
									App Store
								</a>
								<a href="#playstore" className={styles.np_appButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.np_appButtonIcon}
									>
										<path
											d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
											fill="currentColor"
										/>
									</svg>
									Play Store
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.np_footerBottom}>
					<p className={styles.np_copyright}>
						&copy; {new Date().getFullYear()} Glasnik. Sva prava pridržana.
					</p>
					<div className={styles.np_footerBottomLinks}>
						<a href="#terms">Uslovi korištenja</a>
						<a href="#privacy">Privatnost</a>
						<a href="#cookies">Kolačići</a>
						<a href="#ad-choices">Oglašavanje</a>
						<a href="#sitemap">Mapa sajta</a>
					</div>
				</div>
			</footer>

			{/* Reading List Sidebar */}
			<div
				className={`${styles.np_readingListSidebar} ${
					showReadingList ? styles.np_showReadingList : ""
				}`}
			>
				<div className={styles.np_readingListHeader}>
					<h3>Lista za čitanje</h3>
					<button
						className={styles.np_closeReadingList}
						onClick={() => setShowReadingList(false)}
					>
						{getIcon("close")}
					</button>
				</div>

				<div className={styles.np_readingListContent}>
					{readLaterList.length > 0 ? (
						<div className={styles.np_readingListArticles}>
							{[...data.coverStories, ...data.featuredNews, ...data.latestNews]
								.filter((article) => readLaterList.includes(article.id))
								.map((article) => (
									<article
										key={article.id}
										className={styles.np_readingListItem}
									>
										<div className={styles.np_readingListImageWrapper}>
											<img
												src={article.image}
												alt={article.title}
												className={styles.np_readingListImage}
											/>
										</div>

										<div className={styles.np_readingListItemContent}>
											<span
												className={`${
													styles.np_readingListCategory
												} ${getCategoryColor(article.category)}`}
											>
												{article.category}
											</span>
											<h4 className={styles.np_readingListTitle}>
												{article.title}
											</h4>
											<div className={styles.np_readingListMeta}>
												<span className={styles.np_readingListDate}>
													{article.date}
												</span>
												<span className={styles.np_readingListReadTime}>
													<span className={styles.np_timeIcon}>
														{getIcon("time")}
													</span>
													{article.readTime}
												</span>
											</div>
										</div>

										<button
											className={styles.np_removeFromReadingList}
											onClick={(e) => toggleReadLater(article.id, e)}
											aria-label="Ukloni iz liste za čitanje"
										>
											{getIcon("close")}
										</button>
									</article>
								))}
						</div>
					) : (
						<div className={styles.np_emptyReadingList}>
							<div className={styles.np_emptyReadingListIcon}>
								{getIcon("bookmark")}
							</div>
							<h4>Vaša lista za čitanje je prazna</h4>
							<p>
								Sačuvajte članke za kasnije klikom na ikonu oznake pored članka
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewsPage;
