import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../../components/common/BackButton/BackButton";
import styles from "./NewsPage.module.css";

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
				headerRef.current.classList.add(styles.scrolled);
			} else {
				headerRef.current.classList.remove(styles.scrolled);
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
			setActiveStoryIndex((prev) => (prev + 1) % breakingNews.length);
		}, 7000);

		return () => clearInterval(interval);
	}, [showBreakingNews]);

	// Automated headline carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCoverStoryIndex((prev) => (prev + 1) % coverStories.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	// Current time display
	const [currentTime, setCurrentTime] = useState(getCurrentTime());
	const [coverStoryIndex, setCoverStoryIndex] = useState(0);

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

	// Weather data
	const weatherData = {
		temp: "19°C",
		condition: "Sunčano",
		city: "Sarajevo",
		forecast: [
			{ day: "PON", temp: "21°C", icon: "sunny" },
			{ day: "UTO", temp: "19°C", icon: "partly_cloudy" },
			{ day: "SRI", temp: "18°C", icon: "rainy" },
			{ day: "ČET", temp: "20°C", icon: "partly_cloudy" },
			{ day: "PET", temp: "22°C", icon: "sunny" },
		],
	};

	// News sections/categories
	const categories = [
		{ id: "front", name: "Naslovnica", icon: "home" },
		{ id: "politics", name: "Politika", icon: "politics" },
		{ id: "business", name: "Biznis", icon: "business" },
		{ id: "world", name: "Svijet", icon: "world" },
		{ id: "sports", name: "Sport", icon: "sports" },
		{ id: "culture", name: "Kultura", icon: "culture" },
		{ id: "tech", name: "Tehnologija", icon: "tech" },
		{ id: "lifestyle", name: "Lifestyle", icon: "lifestyle" },
	];

	// Breaking news
	const breakingNews = [
		{
			id: 1,
			title:
				"HITNO: Uspješno završeni pregovori o novom ekonomskom sporazumu sa EU",
			category: "politics",
			timestamp: "prije 35 minuta",
		},
		{
			id: 2,
			title:
				"Zemljotres jačine 4.5 stepeni pogodio centralnu Bosnu, nema izvještaja o povrijeđenima",
			category: "local",
			timestamp: "prije 53 minute",
		},
		{
			id: 3,
			title:
				"Reprezentacija BiH plasirala se u četvrtfinale Evropskog prvenstva",
			category: "sports",
			timestamp: "prije 1 sat",
		},
	];

	// Cover stories for main carousel
	const coverStories = [
		{
			id: 1,
			title:
				"Nova ekonomska era: BiH potpisala historijski sporazum sa Evropskom unijom",
			excerpt:
				"Bosna i Hercegovina danas je potpisala dugo očekivani ekonomski sporazum s Evropskom unijom koji će otvoriti vrata za značajne investicije i ubrzati proces evropskih integracija.",
			category: "politics",
			image:
				"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070",
			author: "Amina Hodžić",
			date: "4. mart 2025.",
			readTime: "5 min",
			premium: true,
			featured: true,
		},
		{
			id: 2,
			title:
				"Inovativna bosanska tehnološka kompanija privukla investiciju od 50 miliona eura",
			excerpt:
				"Sarajevska tehnološka firma, koja razvija AI rješenja za zdravstveni sektor, osigurala je rekordnu investiciju od međunarodnih investitora, što predstavlja najveće ulaganje u BH tech sektor do sada.",
			category: "business",
			image:
				"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006",
			author: "Tarik Mehić",
			date: "3. mart 2025.",
			readTime: "4 min",
			premium: false,
			featured: true,
		},
		{
			id: 3,
			title:
				"Revolucija u javnom prevozu: Sarajevo uvodi potpuno električnu flotu autobusa",
			excerpt:
				"Glavni grad BiH započeo je ambiciozni projekat zamjene svih vozila javnog prevoza električnim, što će značajno smanjiti zagađenje i postaviti Sarajevo kao lidera u zelenoj tranziciji na Balkanu.",
			category: "local",
			image:
				"https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071",
			author: "Amra Imamović",
			date: "2. mart 2025.",
			readTime: "6 min",
			premium: false,
			featured: true,
		},
	];

	// Featured articles
	const featuredNews = [
		{
			id: 4,
			title:
				"Bosanska dijaspora investira rekordnih 2 milijarde KM u domaću ekonomiju",
			excerpt:
				"Veliki povratak kapitala: kako bosanska dijaspora postaje ključni faktor ekonomskog razvoja matične zemlje kroz direktne investicije, transfer znanja i otvaranje novih radnih mjesta.",
			category: "business",
			image:
				"https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2069",
			author: "Emir Kozlić",
			date: "3. mart 2025.",
			readTime: "4 min",
			premium: true,
		},
		{
			id: 5,
			title:
				"BiH postaje regionalni lider u IT sektoru sa više od 500 novih kompanija",
			excerpt:
				"Zahvaljujući kvalitetnim stručnjacima i povoljnom poslovnom okruženju, Bosna i Hercegovina bilježi eksplozivan rast IT industrije koja postaje glavni izvozni sektor zemlje.",
			category: "tech",
			image:
				"https://images.unsplash.com/photo-1573164713712-03790a178651?q=80&w=2069",
			author: "Damir Kovačević",
			date: "2. mart 2025.",
			readTime: "3 min",
		},
	];

	// Editor's picks
	const editorsPicks = [
		{
			id: 6,
			title: "Pogled u budućnost: Kako će izgledati bh. gradovi 2050. godine",
			category: "lifestyle",
			image:
				"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070",
			date: "1. mart 2025.",
			trending: true,
		},
		{
			id: 7,
			title:
				"Nova era bh. filma: Domaći reditelj osvaja nagradu na festivalu u Kanu",
			category: "culture",
			image:
				"https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=2070",
			date: "28. februar 2025.",
		},
		{
			id: 8,
			title: "Gastro revolucija: Bosanska kuhinja osvaja svjetsku scenu",
			category: "lifestyle",
			image:
				"https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070",
			date: "27. februar 2025.",
			trending: true,
		},
	];

	// Latest news articles
	const latestNews = [
		{
			id: 9,
			title: "Novi zakon o digitalnom poslovanju donosi revoluciju u e-upravi",
			excerpt:
				"Parlamentarna skupština BiH usvojila je dugo očekivani Zakon o digitalnom poslovanju koji će omogućiti građanima pristup svim javnim uslugama online.",
			category: "politics",
			image:
				"https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073",
			author: "Jasmin Halilović",
			date: "4. mart 2025.",
			readTime: "3 min",
		},
		{
			id: 10,
			title:
				"Rekordna turistička sezona: BiH posjetilo više od 2 miliona turista",
			excerpt:
				"Turistička zajednica BiH objavila je da je zemlju u 2024. godini posjetio rekordan broj turista, što je značajno doprinijelo ekonomskom rastu.",
			category: "business",
			image:
				"https://www.tourismbih.com/wp-content/uploads/2019/02/Mostar-1-3.jpg",
			author: "Selma Begić",
			date: "3. mart 2025.",
			readTime: "4 min",
		},
		{
			id: 11,
			title:
				"Bosanski sportisti osvojili rekordnih 5 medalja na zimskim Olimpijskim igrama",
			excerpt:
				"Historijski uspjeh bosanskohercegovačkih sportista na Zimskim olimpijskim igrama 2026. gdje su osvojili ukupno pet medalja.",
			category: "sports",
			image:
				"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070",
			author: "Adnan Mehić",
			date: "2. mart 2025.",
			readTime: "5 min",
		},
		{
			id: 12,
			title: "Revolucija u zdravstvu: BiH uvodi inovativni sistem telemedicine",
			excerpt:
				"Ministarstvo zdravstva predstavilo je novi sistem telemedicine koji će omogućiti pacijentima iz ruralnih područja pristup specijalistima iz cijele zemlje.",
			category: "health",
			image:
				"https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
			author: "Mirela Hodžić",
			date: "1. mart 2025.",
			readTime: "4 min",
		},
		{
			id: 13,
			title:
				"Nova era obnovljive energije: BiH gradi najveći solarni park na Balkanu",
			excerpt:
				"Započela izgradnja najvećeg solarnog parka na Balkanu koji će značajno povećati udio obnovljivih izvora energije u energetskom miksu zemlje.",
			category: "tech",
			image:
				"https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072",
			author: "Nedim Hajrić",
			date: "28. februar 2025.",
			readTime: "4 min",
		},
		{
			id: 14,
			title: "Sarajevski univerzitet među top 500 svjetskih univerziteta",
			excerpt:
				"Po prvi put u historiji, Univerzitet u Sarajevu uvršten je među 500 najboljih svjetskih univerziteta prema prestižnoj Shanghai listi.",
			category: "education",
			image:
				"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071",
			author: "Haris Mujić",
			date: "27. februar 2025.",
			readTime: "3 min",
		},
	];

	// Trending news with social stats
	const trendingNews = [
		{
			id: 15,
			title: "Revolucionarno otkriće bosanskih naučnika u liječenju raka",
			category: "health",
			shares: 2453,
			comments: 187,
		},
		{
			id: 16,
			title: "Bosanski sportista oborio svjetski rekord u atletici",
			category: "sports",
			shares: 1845,
			comments: 321,
		},
		{
			id: 17,
			title: "Nova studija: BiH među top 20 zemalja za život i rad",
			category: "lifestyle",
			shares: 1622,
			comments: 245,
		},
		{
			id: 18,
			title: "Sarajevo dobija novi futuristički most preko Miljacke",
			category: "local",
			shares: 1247,
			comments: 193,
		},
	];

	// Filter news based on active category
	const getFilteredNews = () => {
		if (activeCategory === "front") return latestNews;
		return latestNews.filter(
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
			politics: styles.categoryPolitics,
			business: styles.categoryBusiness,
			world: styles.categoryWorld,
			sports: styles.categorySports,
			culture: styles.categoryCulture,
			tech: styles.categoryTech,
			lifestyle: styles.categoryLifestyle,
			health: styles.categoryHealth,
			education: styles.categoryEducation,
			local: styles.categoryLocal,
		};

		return categoryMap[category] || styles.categoryDefault;
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
			className={`${styles.newsContainer} ${pageLoaded ? styles.loaded : ""}`}
		>
			{/* Back button to portfolio */}
			<div className={styles.backButtonWrapper}>
				<BackButton />
			</div>

			{/* Breaking news ticker */}
			{showBreakingNews && (
				<div className={styles.breakingNewsContainer}>
					<div className={styles.breakingNewsContent}>
						<span className={styles.breakingLabel}>
							<div className={styles.pulsingDot}></div>
							NAJNOVIJE
						</span>
						<div className={styles.breakingTextWrapper}>
							{breakingNews.map((news, index) => (
								<div
									key={news.id}
									className={`${styles.breakingText} ${
										index === activeStoryIndex ? styles.activeBreakingNews : ""
									}`}
								>
									<a href={`#${news.id}`}>
										<span className={styles.breakingCategory}>
											{news.category}
										</span>
										{news.title}
										<span className={styles.breakingTime}>
											{news.timestamp}
										</span>
									</a>
								</div>
							))}
						</div>
						<div className={styles.breakingProgress}>
							<div
								className={styles.breakingProgressBar}
								style={{
									width: `${
										((activeStoryIndex + 1) / breakingNews.length) * 100
									}%`,
								}}
							></div>
						</div>
						<button
							className={styles.closeBreaking}
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
				className={styles.newsHeader}
				ref={headerRef}
				style={{
					top: showBreakingNews ? "44px" : "0",
				}}
			>
				<div className={styles.headerMain}>
					<div className={styles.logoContainer}>
						<h1 className={styles.newsLogo}>
							<span className={styles.logoText}>Glasnik</span>
							<span className={styles.logoDot}></span>
						</h1>
					</div>

					<div className={styles.headerControls}>
						<div className={styles.dateWeather}>
							<div className={styles.date}>
								<span className={styles.dateIcon}>{getIcon("date")}</span>
								{currentDate}
							</div>
							<div className={styles.weather}>
								<span className={styles.weatherIcon}>{getIcon("sunny")}</span>
								<span className={styles.weatherTemp}>{weatherData.temp}</span>
								<span className={styles.weatherCity}>{weatherData.city}</span>
								<div className={styles.weatherForecastWrapper}>
									<div className={styles.weatherForecast}>
										<div className={styles.forecastHeader}>
											<span>5-dnevna prognoza</span>
										</div>
										<div className={styles.forecastContent}>
											{weatherData.forecast.map((day) => (
												<div key={day.day} className={styles.forecastDay}>
													<span className={styles.forecastIcon}>
														{getIcon(day.icon)}
													</span>
													<span className={styles.forecastTemp}>
														{day.temp}
													</span>
													<span className={styles.forecastName}>{day.day}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.headerActions}>
							<div className={styles.searchContainer}>
								<span className={styles.searchIcon}>{getIcon("search")}</span>
								<input
									type="text"
									placeholder="Pretraži vijesti..."
									value={searchTerm}
									onChange={handleSearchChange}
									className={styles.searchInput}
								/>
							</div>

							<button
								className={styles.readingListButton}
								onClick={() => setShowReadingList(!showReadingList)}
								aria-label="Lista za čitanje"
							>
								<span className={styles.readingListIcon}>
									{getIcon("bookmark")}
									{readLaterList.length > 0 && (
										<span className={styles.notificationBadge}>
											{readLaterList.length}
										</span>
									)}
								</span>
							</button>

							<div className={styles.userMenu}>
								<button className={styles.userMenuButton}>
									<span className={styles.notificationsIcon}>
										{getIcon("notifications")}
										<span className={styles.notificationBadge}>3</span>
									</span>
								</button>
								<div className={styles.userAvatar}>
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
				<nav className={styles.categoriesNav}>
					<button
						className={styles.mobileMenuButton}
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
						className={`${styles.categoriesList} ${
							isMobileMenuOpen ? styles.mobileMenuOpen : ""
						}`}
					>
						{categories.map((category, index) => (
							<li key={category.id}>
								<button
									className={`${styles.categoryButton} ${
										activeCategory === category.id ? styles.activeCategory : ""
									}`}
									onClick={() => handleCategoryChange(category.id)}
									style={{ animationDelay: `${index * 0.05}s` }}
								>
									<span className={styles.categoryIcon}>
										{getIcon(category.icon)}
									</span>
									<span>{category.name}</span>
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* Subscription banner */}
				<div className={styles.premiumBanner}>
					<div className={styles.premiumContent}>
						<div className={styles.premiumIcon}>{getIcon("crown")}</div>
						<div className={styles.premiumText}>
							<h3>Glasnik Premium</h3>
							<p>
								Ekskluzivni sadržaj, analitika i pristup svim arhiviranim
								izdanjima
							</p>
						</div>
					</div>
					<button className={styles.premiumButton}>
						Aktiviraj 30 dana besplatno
					</button>
				</div>
			</header>

			{/* Main content */}
			<main className={styles.newsContent}>
				{/* Cover Story Hero Section */}
				<section className={styles.coverStorySection}>
					<div
						className={styles.coverStoriesTrack}
						style={{ transform: `translateX(-${coverStoryIndex * 100}%)` }}
					>
						{coverStories.map((story, index) => (
							<article
								key={story.id}
								className={`${styles.coverStory} ${
									index === coverStoryIndex ? styles.activeCoverStory : ""
								}`}
							>
								<div className={styles.coverImageWrapper}>
									<img
										src={story.image}
										alt={story.title}
										className={styles.coverImage}
									/>
									<div className={styles.coverOverlay}>
										<div className={styles.coverContent}>
											<div className={styles.coverMeta}>
												<span
													className={`${
														styles.coverCategory
													} ${getCategoryColor(story.category)}`}
												>
													{story.category}
												</span>
												{story.premium && (
													<span className={styles.premiumLabel}>
														<span className={styles.premiumIcon}>
															{getIcon("crown")}
														</span>
														Premium
													</span>
												)}
											</div>

											<h2 className={styles.coverTitle}>{story.title}</h2>
											<p className={styles.coverExcerpt}>{story.excerpt}</p>

											<div className={styles.coverDetails}>
												<div className={styles.coverAuthor}>
													<div className={styles.authorInitials}>
														{story.author
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</div>
													<span>{story.author}</span>
												</div>

												<div className={styles.coverMisc}>
													<span className={styles.coverDate}>
														<span className={styles.dateIcon}>
															{getIcon("date")}
														</span>
														{story.date}
													</span>
													<span className={styles.coverReadTime}>
														<span className={styles.timeIcon}>
															{getIcon("time")}
														</span>
														{story.readTime}
													</span>
												</div>

												<div className={styles.coverActions}>
													<button
														className={`${styles.actionButton} ${
															styles.bookmarkButton
														} ${
															readLaterList.includes(story.id)
																? styles.active
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
														className={`${styles.actionButton} ${
															styles.likeButton
														} ${
															likedArticles.includes(story.id)
																? styles.active
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
														className={`${styles.actionButton} ${styles.shareButton}`}
														aria-label="Dijeli"
													>
														{getIcon("share")}
													</button>
												</div>
											</div>

											<a
												href={`/news/${story.id}`}
												className={styles.coverReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.coverReadMoreIcon}>
													{getIcon("chevron-right")}
												</span>
											</a>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className={styles.coverStoryControls}>
						<div className={styles.coverStoryDots}>
							{coverStories.map((_, index) => (
								<button
									key={index}
									className={`${styles.coverStoryDot} ${
										index === coverStoryIndex ? styles.activeDot : ""
									}`}
									onClick={() => setCoverStoryIndex(index)}
									aria-label={`Prijeđi na vijest ${index + 1}`}
								></button>
							))}
						</div>
					</div>
				</section>

				{/* Main grid layout for news content */}
				<div className={styles.newsGrid}>
					{/* Featured News Column */}
					<section className={styles.featuredNews}>
						<div className={styles.sectionHeader}>
							<h2 className={styles.sectionTitle}>
								<span className={styles.titleText}>Izdvojeno</span>
								<span className={styles.titleLine}></span>
							</h2>
						</div>

						<div className={styles.featuredNewsGrid}>
							{featuredNews.map((article) => (
								<article key={article.id} className={styles.featuredArticle}>
									<div className={styles.featuredImageWrapper}>
										<img
											src={article.image}
											alt={article.title}
											className={styles.featuredImage}
										/>
										<div className={styles.featuredMeta}>
											<span
												className={`${
													styles.featuredCategory
												} ${getCategoryColor(article.category)}`}
											>
												{article.category}
											</span>
											{article.premium && (
												<span className={styles.premiumLabel}>
													<span className={styles.premiumIcon}>
														{getIcon("crown")}
													</span>
													Premium
												</span>
											)}
										</div>
									</div>

									<div className={styles.featuredContent}>
										<h3 className={styles.featuredTitle}>{article.title}</h3>
										<p className={styles.featuredExcerpt}>{article.excerpt}</p>

										<div className={styles.featuredDetails}>
											<span className={styles.featuredAuthor}>
												{article.author}
											</span>
											<span className={styles.featuredDate}>
												{article.date}
											</span>
											<span className={styles.featuredReadTime}>
												<span className={styles.timeIcon}>
													{getIcon("time")}
												</span>
												{article.readTime}
											</span>
										</div>

										<div className={styles.featuredActions}>
											<button
												className={`${styles.actionButton} ${
													styles.bookmarkButton
												} ${
													readLaterList.includes(article.id)
														? styles.active
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
												className={`${styles.actionButton} ${
													styles.likeButton
												} ${
													likedArticles.includes(article.id)
														? styles.active
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
												className={styles.featuredReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.coverReadMoreIcon}>
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
					<section className={styles.mainNews}>
						<div className={styles.sectionHeader}>
							<h2 className={styles.sectionTitle}>
								<span className={styles.titleText}>
									{activeCategory === "front"
										? "Najnovije vijesti"
										: categories.find((c) => c.id === activeCategory)?.name ||
										  "Najnovije"}
								</span>
								<span className={styles.titleLine}></span>
							</h2>

							{searchTerm && (
								<p className={styles.searchResults}>
									Rezultati pretrage za: <span>"{searchTerm}"</span>
								</p>
							)}
						</div>

						<div className={styles.newsArticlesGrid}>
							{getFilteredNews().map((article) => (
								<article
									key={article.id}
									className={styles.newsArticle}
									onMouseEnter={() => setFocusedArticle(article.id)}
									onMouseLeave={() => setFocusedArticle(null)}
								>
									<div className={styles.articleImageWrapper}>
										<img
											src={article.image}
											alt={article.title}
											className={styles.articleImage}
										/>
										<span
											className={`${styles.articleCategory} ${getCategoryColor(
												article.category
											)}`}
										>
											{article.category}
										</span>
									</div>

									<div className={styles.articleContent}>
										<h3 className={styles.articleTitle}>{article.title}</h3>
										<p className={styles.articleExcerpt}>{article.excerpt}</p>

										<div className={styles.articleMeta}>
											<span className={styles.articleAuthor}>
												{article.author}
											</span>
											<span className={styles.articleDate}>{article.date}</span>
											<span className={styles.articleReadTime}>
												<span className={styles.timeIcon}>
													{getIcon("time")}
												</span>
												{article.readTime}
											</span>
										</div>

										<div
											className={`${styles.articleActions} ${
												focusedArticle === article.id ? styles.visible : ""
											}`}
										>
											<button
												className={`${styles.actionButton} ${
													styles.bookmarkButton
												} ${
													readLaterList.includes(article.id)
														? styles.active
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
												className={`${styles.actionButton} ${
													styles.likeButton
												} ${
													likedArticles.includes(article.id)
														? styles.active
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
												className={styles.articleReadMore}
											>
												<span>Pročitaj više</span>
												<span className={styles.coverReadMoreIcon}>
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
					<aside className={styles.sidebar}>
						{/* Editor's Picks */}
						<section className={styles.editorsPicksSection}>
							<div className={styles.sectionHeader}>
								<h2 className={styles.sectionTitle}>
									<span className={styles.titleText}>Izbor Urednika</span>
									<span className={styles.titleLine}></span>
								</h2>
							</div>

							<div className={styles.editorsPicks}>
								{editorsPicks.map((article) => (
									<article key={article.id} className={styles.editorsPickItem}>
										<div className={styles.editorsPickImageWrapper}>
											<img
												src={article.image}
												alt={article.title}
												className={styles.editorsPickImage}
											/>
										</div>

										<div className={styles.editorsPickContent}>
											<h3 className={styles.editorsPickTitle}>
												{article.title}
											</h3>
											<div className={styles.editorsPickMeta}>
												<span
													className={`${
														styles.editorsPickCategory
													} ${getCategoryColor(article.category)}`}
												>
													{article.category}
												</span>
												<span className={styles.editorsPickDate}>
													{article.date}
												</span>
												{article.trending && (
													<span className={styles.trendingLabel}>
														<span className={styles.trendingIcon}>
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
						<section className={styles.trendingSection}>
							<div className={styles.sectionHeader}>
								<h2 className={styles.sectionTitle}>
									<span className={styles.titleText}>Trending</span>
									<span className={styles.titleLine}></span>
								</h2>
							</div>

							<div className={styles.trendingList}>
								{trendingNews.map((article, index) => (
									<article key={article.id} className={styles.trendingItem}>
										<span className={styles.trendingNumber}>{index + 1}</span>
										<div className={styles.trendingContent}>
											<h3 className={styles.trendingTitle}>{article.title}</h3>
											<div className={styles.trendingMeta}>
												<span
													className={`${
														styles.trendingCategory
													} ${getCategoryColor(article.category)}`}
												>
													{article.category}
												</span>
												<span className={styles.trendingEngagement}>
													<span className={styles.trendingShares}>
														<span className={styles.shareIcon}>
															{getIcon("share")}
														</span>
														{article.shares}
													</span>
													<span className={styles.trendingComments}>
														<span className={styles.commentIcon}>
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
						<section className={styles.newsletterSection}>
							<div className={styles.newsletterContent}>
								<h3 className={styles.newsletterTitle}>Ostanite Informisani</h3>
								<p className={styles.newsletterText}>
									Pretplatite se na naš dnevni newsletter i budite prvi koji
									saznaje najnovije vijesti
								</p>
								<form className={styles.newsletterForm}>
									<input
										type="email"
										placeholder="Vaša email adresa"
										className={styles.newsletterInput}
										required
									/>
									<button type="submit" className={styles.newsletterButton}>
										Pretplati se
									</button>
								</form>
								<p className={styles.newsletterDisclaimer}>
									Prijavom prihvatate naše uslove korištenja i politiku
									privatnosti.
								</p>
							</div>
						</section>
					</aside>
				</div>
			</main>

			{/* Footer */}
			<footer className={styles.newsFooter}>
				<div className={styles.footerTop}>
					<div className={styles.footerLogo}>
						<span className={styles.logoText}>Glasnik</span>
						<span className={styles.logoDot}></span>
						<p className={styles.footerTagline}>Vijesti iz budućnosti</p>
					</div>

					<div className={styles.footerNav}>
						<div className={styles.footerNavColumn}>
							<h3 className={styles.footerNavTitle}>Sekcije</h3>
							<ul className={styles.footerNavList}>
								{categories.map((category) => (
									<li key={category.id}>
										<a href={`#${category.id}`}>
											<span className={styles.footerNavIcon}>
												{getIcon(category.icon)}
											</span>
											{category.name}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className={styles.footerNavColumn}>
							<h3 className={styles.footerNavTitle}>Glasnik</h3>
							<ul className={styles.footerNavList}>
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

						<div className={styles.footerNavColumn}>
							<h3 className={styles.footerNavTitle}>Pratite nas</h3>
							<div className={styles.footerSocials}>
								<a href="#facebook" className={styles.footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.footerSocialIcon}
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
								<a href="#twitter" className={styles.footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.footerSocialIcon}
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
								<a href="#instagram" className={styles.footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.footerSocialIcon}
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
								<a href="#youtube" className={styles.footerSocialLink}>
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles.footerSocialIcon}
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

							<h3 className={styles.footerNavTitle}>Preuzmi aplikaciju</h3>
							<div className={styles.appButtons}>
								<a href="#appstore" className={styles.appButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.appButtonIcon}
									>
										<path
											d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
											fill="currentColor"
										/>
									</svg>
									App Store
								</a>
								<a href="#playstore" className={styles.appButton}>
									<svg
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className={styles.appButtonIcon}
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

				<div className={styles.footerBottom}>
					<p className={styles.copyright}>
						&copy; {new Date().getFullYear()} Glasnik. Sva prava pridržana.
					</p>
					<div className={styles.footerBottomLinks}>
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
				className={`${styles.readingListSidebar} ${
					showReadingList ? styles.showReadingList : ""
				}`}
			>
				<div className={styles.readingListHeader}>
					<h3>Lista za čitanje</h3>
					<button
						className={styles.closeReadingList}
						onClick={() => setShowReadingList(false)}
					>
						{getIcon("close")}
					</button>
				</div>

				<div className={styles.readingListContent}>
					{readLaterList.length > 0 ? (
						<div className={styles.readingListArticles}>
							{[...coverStories, ...featuredNews, ...latestNews]
								.filter((article) => readLaterList.includes(article.id))
								.map((article) => (
									<article key={article.id} className={styles.readingListItem}>
										<div className={styles.readingListImageWrapper}>
											<img
												src={article.image}
												alt={article.title}
												className={styles.readingListImage}
											/>
										</div>

										<div className={styles.readingListItemContent}>
											<span
												className={`${
													styles.readingListCategory
												} ${getCategoryColor(article.category)}`}
											>
												{article.category}
											</span>
											<h4 className={styles.readingListTitle}>
												{article.title}
											</h4>
											<div className={styles.readingListMeta}>
												<span className={styles.readingListDate}>
													{article.date}
												</span>
												<span className={styles.readingListReadTime}>
													<span className={styles.timeIcon}>
														{getIcon("time")}
													</span>
													{article.readTime}
												</span>
											</div>
										</div>

										<button
											className={styles.removeFromReadingList}
											onClick={(e) => toggleReadLater(article.id, e)}
											aria-label="Ukloni iz liste za čitanje"
										>
											{getIcon("close")}
										</button>
									</article>
								))}
						</div>
					) : (
						<div className={styles.emptyReadingList}>
							<div className={styles.emptyReadingListIcon}>
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
