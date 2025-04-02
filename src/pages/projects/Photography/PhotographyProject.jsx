// src/pages/projects/Photography/PhotographyProject.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../components/common/BackButton/BackButton";
import styles from "./PhotographyProject.module.css";

const PhotographyProject = () => {
	// State for nav menu
	const [menuOpen, setMenuOpen] = useState(false);

	// State for selected image
	const [activeImage, setActiveImage] = useState(null);

	// State for scroll position
	const [scrolled, setScrolled] = useState(false);

	// Categories
	const categories = ["All", "Priroda", "Portret", "Urbano", "Apstraktno"];
	const [activeCategory, setActiveCategory] = useState("All");

	// Gallery data
	const gallery = [
		{
			id: 1,
			category: "Priroda",
			title: "Planinsko jezero",
			description: "Mirno planinsko jezero u zoru",
			image:
				"https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000",
			size: "large",
		},
		{
			id: 2,
			category: "Portret",
			title: "Žena u sjeni",
			description: "Portret sa dramatičnom igrom sjenki",
			image:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
			size: "medium",
		},
		{
			id: 3,
			category: "Urbano",
			title: "Gradska svjetla",
			description: "Urbani noćni pejzaž sa živopisnim svjetlima",
			image:
				"https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000",
			size: "medium",
		},
		{
			id: 4,
			category: "Apstraktno",
			title: "Forme svjetlosti",
			description: "Apstraktna kompozicija svjetla i boje",
			image:
				"https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000",
			size: "small",
		},
		{
			id: 5,
			category: "Priroda",
			title: "Pustinjski pijesak",
			description: "Valovite dine u zlatnom svjetlu",
			image:
				"https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000",
			size: "small",
		},
		{
			id: 6,
			category: "Portret",
			title: "Profilna studija",
			description: "Minimalistički portret profila u studiju",
			image:
				"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000",
			size: "medium",
		},
		{
			id: 7,
			category: "Urbano",
			title: "Betonske forme",
			description: "Geometrijska urbana arhitektura",
			image:
				"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
			size: "large",
		},
		{
			id: 8,
			category: "Apstraktno",
			title: "Studija boja",
			description: "Eksperimentalna kompozicija boja",
			image:
				"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
			size: "medium",
		},
		{
			id: 9,
			category: "Priroda",
			title: "Šumsko svjetlo",
			description: "Sunčevi zraci koji filtriraju kroz drevnu šumu",
			image:
				"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000",
			size: "small",
		},
	];

	// Filter gallery by category
	const filteredGallery =
		activeCategory === "All"
			? gallery
			: gallery.filter((item) => item.category === activeCategory);

	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	// Lock body scroll when image is active
	useEffect(() => {
		if (activeImage) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [activeImage]);

	return (
		<div className={styles.photoContainer}>
			{/* Reusable Back to Portfolio Button Component */}
			{/* <BackButton /> */}

			{/* Photography Site Header (standalone) */}
			<header
				className={`${styles.photoHeader} ${
					scrolled ? styles.photoHeaderScrolled : ""
				}`}
			>
				<div className={styles.photoHeaderInner}>
					<a href="#top" className={styles.photoLogo}>
						Amra Hotić
					</a>

					<button
						className={`${styles.photoMenuToggle} ${
							menuOpen ? styles.photoMenuActive : ""
						}`}
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
					>
						<span></span>
						<span></span>
					</button>

					<nav
						className={`${styles.photoNav} ${
							menuOpen ? styles.photoNavOpen : ""
						}`}
					>
						<div
							className={styles.photoNavClose}
							onClick={() => setMenuOpen(false)}
						></div>
						<ul className={styles.photoNavList}>
							<li>
								<a href="#gallery" onClick={() => setMenuOpen(false)}>
									Portfolio
								</a>
							</li>
							<li>
								<a href="#about" onClick={() => setMenuOpen(false)}>
									O meni
								</a>
							</li>
							<li>
								<a href="#exhibitions" onClick={() => setMenuOpen(false)}>
									Izložbe
								</a>
							</li>
							<li>
								<a href="#contact" onClick={() => setMenuOpen(false)}>
									Kontakt
								</a>
							</li>
							<li>
								<Link
									to="/"
									onClick={() => setMenuOpen(false)}
									className={styles.photoPortfolioLink}
								>
									Povratak na glavni portfolio
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section id="top" className={styles.photoHero}>
				<div className={styles.photoHeroImage}>
					{/* Floating particles for visual interest */}
					<div className={styles.photoHeroParticles}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<div className={styles.photoHeroContent}>
						<h1 className={styles.photoHeroTitle}>
							Fotografija je umjetnost bilježenja trenutaka koji traju zauvijek
						</h1>
						<p>Umjetnička fotografija & vizualno pripovijedanje</p>
						<a href="#gallery" className={styles.photoHeroButton}>
							Istražite galeriju
							<span className={styles.photoArrow}></span>
						</a>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className={styles.photoGallery}>
				<header className={styles.photoSectionHeader}>
					<h2>Portfolio</h2>
					<div className={styles.photoCategories}>
						{categories.map((category) => (
							<button
								key={category}
								className={`${styles.photoCategory} ${
									activeCategory === category ? styles.photoActive : ""
								}`}
								onClick={() => setActiveCategory(category)}
							>
								{category}
							</button>
						))}
					</div>
				</header>

				<div className={styles.photoGrid}>
					{filteredGallery.map((item) => (
						<div
							key={item.id}
							className={`${styles.photoItem} ${styles[`photo${item.size}`]}`}
							onClick={() => setActiveImage(item)}
						>
							<div className={styles.photoItemInner}>
								<img src={item.image} alt={item.title} />
								<div className={styles.photoItemDetails}>
									<h3>{item.title}</h3>
									<p>{item.category}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* About Section */}
			<section id="about" className={styles.photoAbout}>
				<div className={styles.photoAboutLeft}>
					<img
						src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Amra Hotić"
					/>
				</div>
				<div className={styles.photoAboutRight}>
					<header className={styles.photoSectionHeader}>
						<h2>O meni</h2>
					</header>
					<div className={styles.photoAboutContent}>
						<p className={styles.photoLead}>
							Bilježim trenutke koji bi inače mogli proći nezapaženo,
							pronalazeći ljepotu u običnom i izvanrednom.
						</p>
						<p>
							S više od 15 godina iskustva u umjetničkoj fotografiji, moj rad je
							bio izložen u galerijama širom Bosne i Hercegovine i Europe.
							Specijalizirana sam za stvaranje upečatljivih vizualnih priča koje
							izazivaju percepcije i pobuđuju emocije.
						</p>
						<p>
							Moj pristup kombinira tehničku preciznost s intuitivnom
							kompozicijom, omogućavajući svakoj slici da ispriča svoju
							jedinstvenu priču. Bilo da dokumentiram urbane pejzaže, intimne
							portrete ili apstraktne forme, nastojim otkriti skrivene veze
							između subjekta i promatrača.
						</p>
						<div className={styles.photoStats}>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>15+</span>
								<span className={styles.photoStatLabel}>Godina iskustva</span>
							</div>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>26</span>
								<span className={styles.photoStatLabel}>Izložbi</span>
							</div>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>9</span>
								<span className={styles.photoStatLabel}>Publikacija</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Exhibitions Section */}
			<section id="exhibitions" className={styles.photoExhibitions}>
				<header className={styles.photoSectionHeader}>
					<h2>Izložbe i nagrade</h2>
				</header>

				<div className={styles.photoTimeline}>
					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2024</div>
						<div className={styles.photoTimelineContent}>
							<h3>"Perspektive" Samostalna izložba</h3>
							<p>Muzej savremene umjetnosti, Sarajevo</p>
							<p className={styles.photoTimelineDesc}>
								Sveobuhvatni prikaz fotografije urbanog pejzaža koja istražuje
								odnos između arhitekture i ljudskog iskustva.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2023</div>
						<div className={styles.photoTimelineContent}>
							<h3>Međunarodna fotografska nagrada</h3>
							<p>Pobjednik u kategoriji likovne umjetnosti</p>
							<p className={styles.photoTimelineDesc}>
								Priznanje za seriju "Studije svjetla" koja istražuje interakciju
								prirodnog svjetla s arhitektonskim prostorima.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2022</div>
						<div className={styles.photoTimelineContent}>
							<h3>"Elementi" Grupna izložba</h3>
							<p>Galerija suvremene umjetnosti, Mostar</p>
							<p className={styles.photoTimelineDesc}>
								Istaknuti rad koji istražuje prirodne elemente kao metafore za
								ljudske emocije i iskustva.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2021</div>
						<div className={styles.photoTimelineContent}>
							<h3>Publikacija fotografske knjige</h3>
							<p>"Nevidljive geometrije"</p>
							<p className={styles.photoTimelineDesc}>
								Monografija koja sadrži 120 fotografija koje istražuju skrivene
								obrasce i strukture u prirodnim i izgrađenim okruženjima.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className={styles.photoContact}>
				<header className={styles.photoSectionHeader}>
					<h2>Kontaktirajte me</h2>
				</header>

				<div className={styles.photoContactContent}>
					<div className={styles.photoContactLeft}>
						<p className={styles.photoLead}>
							Zainteresirani ste za suradnju ili kupnju printova? Pošaljite mi
							poruku i uskoro ću vam odgovoriti.
						</p>
						<div className={styles.photoContactInfo}>
							<div className={styles.photoContactItem}>
								<h4>Email</h4>
								<p>hello@amrahotic.ba</p>
							</div>
							<div className={styles.photoContactItem}>
								<h4>Studio</h4>
								<p>
									Galerija Bijeli Prostor 23
									<br />
									Sarajevo, 71000
								</p>
							</div>
							<div className={styles.photoContactItem}>
								<h4>Pratite me</h4>
								<div className={styles.photoSocial}>
									<a href="https://www.instagram.com/" aria-label="Instagram">
										Instagram
									</a>
									<a href="https://www.twitter.com" aria-label="Twitter">
										Twitter
									</a>
									<a href="https://www.behance.net/" aria-label="Behance">
										Behance
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.photoContactRight}>
						<form className={styles.photoForm}>
							<div className={styles.photoFormGroup}>
								<label htmlFor="name">Ime</label>
								<input type="text" id="name" />
							</div>

							<div className={styles.photoFormGroup}>
								<label htmlFor="email">Email</label>
								<input type="email" id="email" />
							</div>

							<div className={styles.photoFormGroup}>
								<label htmlFor="message">Poruka</label>
								<textarea id="message" rows="5"></textarea>
							</div>

							<button type="submit" className={styles.photoSubmit}>
								Pošalji poruku
								<span className={styles.photoArrow}></span>
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className={styles.photoFooter}>
				<div className={styles.photoFooterInner}>
					<a href="#top" className={styles.photoFooterLogo}>
						Amra Hotić
					</a>

					<div className={styles.photoFooterLinks}>
						<a href="#gallery">Portfolio</a>
						<a href="#about">O meni</a>
						<a href="#exhibitions">Izložbe</a>
						<a href="#contact">Kontakt</a>
						<Link to="/" className={styles.photoBackToMainLink}>
							Povratak na glavni portfolio
						</Link>
					</div>

					<p className={styles.photoCopyright}>
						&copy; {new Date().getFullYear()} Amra Hotić. Sva prava pridržana.
					</p>
				</div>
			</footer>

			{/* Image Viewer */}
			{activeImage && (
				<div
					className={styles.photoViewer}
					onClick={() => setActiveImage(null)}
				>
					<div
						className={styles.photoViewerContent}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className={styles.photoViewerClose}
							onClick={() => setActiveImage(null)}
							aria-label="Close"
						>
							<span></span>
							<span></span>
						</button>

						<div className={styles.photoViewerImage}>
							<img src={activeImage.image} alt={activeImage.title} />
						</div>

						<div className={styles.photoViewerDetails}>
							<h3>{activeImage.title}</h3>
							<p>{activeImage.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PhotographyProject;
