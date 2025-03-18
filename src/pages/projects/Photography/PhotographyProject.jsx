// src/pages/projects/Photography/PhotographyProject.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PhotographyProject.module.css";

const PhotographyProject = () => {
	// State for nav menu
	const [menuOpen, setMenuOpen] = useState(false);

	// State for selected image
	const [activeImage, setActiveImage] = useState(null);

	// State for scroll position
	const [scrolled, setScrolled] = useState(false);

	// Categories
	const categories = ["All", "Nature", "Portrait", "Urban", "Abstract"];
	const [activeCategory, setActiveCategory] = useState("All");

	// Gallery data
	const gallery = [
		{
			id: 1,
			category: "Nature",
			title: "Mountain Lake",
			description: "Serene mountain lake at dawn",
			image:
				"https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000",
			size: "large",
		},
		{
			id: 2,
			category: "Portrait",
			title: "Woman in Shadow",
			description: "Portrait with dramatic shadow play",
			image:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
			size: "medium",
		},
		{
			id: 3,
			category: "Urban",
			title: "City Lights",
			description: "Urban nightscape with vibrant lights",
			image:
				"https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000",
			size: "medium",
		},
		{
			id: 4,
			category: "Abstract",
			title: "Light Forms",
			description: "Abstract composition of light and color",
			image:
				"https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000",
			size: "small",
		},
		{
			id: 5,
			category: "Nature",
			title: "Desert Sands",
			description: "Undulating dunes in golden light",
			image:
				"https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000",
			size: "small",
		},
		{
			id: 6,
			category: "Portrait",
			title: "Profile Study",
			description: "Minimalist profile portrait in studio",
			image:
				"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000",
			size: "medium",
		},
		{
			id: 7,
			category: "Urban",
			title: "Concrete Forms",
			description: "Geometric urban architecture",
			image:
				"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
			size: "large",
		},
		{
			id: 8,
			category: "Abstract",
			title: "Color Study",
			description: "Experimental color composition",
			image:
				"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
			size: "medium",
		},
		{
			id: 9,
			category: "Nature",
			title: "Forest Light",
			description: "Sunbeams filtering through ancient forest",
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
			{/* Navigation */}
			<header
				className={`${styles.photoHeader} ${
					scrolled ? styles.photoHeaderScrolled : ""
				}`}
			>
				<div className={styles.photoHeaderInner}>
					<Link to="/" className={styles.photoLogo}>
						JANE DOE
					</Link>

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
									About
								</a>
							</li>
							<li>
								<a href="#exhibitions" onClick={() => setMenuOpen(false)}>
									Exhibitions
								</a>
							</li>
							<li>
								<a href="#contact" onClick={() => setMenuOpen(false)}>
									Contact
								</a>
							</li>
							<li>
								<Link to="/" onClick={() => setMenuOpen(false)}>
									Main Portfolio
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			{/* Hero Section */}
			<section className={styles.photoHero}>
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
							Photography is the art of capturing moments that last forever
						</h1>
						<p>Fine art photography & visual storytelling</p>
						<a href="#gallery" className={styles.photoHeroButton}>
							Explore Gallery
							<span className={styles.photoArrow}></span>
						</a>
					</div>

					{/* Animated scroll indicator */}
					<div className={styles.photoScrollIndicator}>
						<div className={styles.photoScrollCircle}>
							<div className={styles.photoScrollDot}></div>
						</div>
						<span className={styles.photoScrollText}>Scroll down</span>
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
						alt="JANE DOE"
					/>
				</div>
				<div className={styles.photoAboutRight}>
					<header className={styles.photoSectionHeader}>
						<h2>About Me</h2>
					</header>
					<div className={styles.photoAboutContent}>
						<p className={styles.photoLead}>
							I capture moments that might otherwise go unnoticed, finding
							beauty in the ordinary and the extraordinary.
						</p>
						<p>
							With over 15 years of experience in fine art photography, my work
							has been featured in galleries across Europe and North America. I
							specialize in creating compelling visual narratives that challenge
							perceptions and evoke emotion.
						</p>
						<p>
							My approach combines technical precision with intuitive
							composition, allowing each image to tell its own unique story.
							Whether I'm documenting urban landscapes, intimate portraits, or
							abstract forms, I seek to reveal the hidden connections between
							subject and viewer.
						</p>
						<div className={styles.photoStats}>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>15+</span>
								<span className={styles.photoStatLabel}>Years Experience</span>
							</div>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>26</span>
								<span className={styles.photoStatLabel}>Exhibitions</span>
							</div>
							<div className={styles.photoStat}>
								<span className={styles.photoStatNumber}>9</span>
								<span className={styles.photoStatLabel}>Publications</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Exhibitions Section */}
			<section id="exhibitions" className={styles.photoExhibitions}>
				<header className={styles.photoSectionHeader}>
					<h2>Exhibitions & Awards</h2>
				</header>

				<div className={styles.photoTimeline}>
					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2024</div>
						<div className={styles.photoTimelineContent}>
							<h3>"Perspectives" Solo Exhibition</h3>
							<p>Museum of Modern Photography, New York</p>
							<p className={styles.photoTimelineDesc}>
								A comprehensive showcase of urban landscape photography
								exploring the relationship between architecture and human
								experience.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2023</div>
						<div className={styles.photoTimelineContent}>
							<h3>International Photography Award</h3>
							<p>Fine Art Category Winner</p>
							<p className={styles.photoTimelineDesc}>
								Recognized for the "Light Studies" series examining the
								interaction of natural light with architectural spaces.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2022</div>
						<div className={styles.photoTimelineContent}>
							<h3>"Elements" Group Exhibition</h3>
							<p>Berlin Gallery of Contemporary Art</p>
							<p className={styles.photoTimelineDesc}>
								Featured work exploring natural elements as metaphors for human
								emotion and experience.
							</p>
						</div>
					</div>

					<div className={styles.photoTimelineItem}>
						<div className={styles.photoTimelineDate}>2021</div>
						<div className={styles.photoTimelineContent}>
							<h3>Photography Book Publication</h3>
							<p>"Invisible Geometries"</p>
							<p className={styles.photoTimelineDesc}>
								A monograph featuring 120 photographs exploring hidden patterns
								and structures in both natural and built environments.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* Contact Section */}
			<section id="contact" className={styles.photoContact}>
				<header className={styles.photoSectionHeader}>
					<h2>Get in Touch</h2>
				</header>

				<div className={styles.photoContactContent}>
					<div className={styles.photoContactLeft}>
						<p className={styles.photoLead}>
							Interested in working together or purchasing prints? Send me a
							message and I'll get back to you soon.
						</p>
						<div className={styles.photoContactInfo}>
							<div className={styles.photoContactItem}>
								<h4>Email</h4>
								<p>hello@janedoe.com</p>
							</div>
							<div className={styles.photoContactItem}>
								<h4>Studio</h4>
								<p>
									Sarajevo 123
									<br />
									Sarajevo, BiH 71000
								</p>
							</div>
							<div className={styles.photoContactItem}>
								<h4>Follow</h4>
								<div className={styles.photoSocial}>
									<a href="#" aria-label="Instagram">
										Instagram
									</a>
									<a href="#" aria-label="Twitter">
										Twitter
									</a>
									<a href="#" aria-label="Behance">
										Behance
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.photoContactRight}>
						<form className={styles.photoForm}>
							<div className={styles.photoFormGroup}>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" />
							</div>

							<div className={styles.photoFormGroup}>
								<label htmlFor="email">Email</label>
								<input type="email" id="email" />
							</div>

							<div className={styles.photoFormGroup}>
								<label htmlFor="message">Message</label>
								<textarea id="message" rows="5"></textarea>
							</div>

							<button type="submit" className={styles.photoSubmit}>
								Send Message
								<span className={styles.photoArrow}></span>
							</button>
						</form>
					</div>
				</div>
			</section>
			{/* Footer */}
			<footer className={styles.photoFooter}>
				<div className={styles.photoFooterInner}>
					<Link to="/" className={styles.photoFooterLogo}>
						JANE DOE
					</Link>

					<div className={styles.photoFooterLinks}>
						<a href="#gallery">Portfolio</a>
						<a href="#about">About</a>
						<a href="#exhibitions">Exhibitions</a>
						<a href="#contact">Contact</a>
						<Link to="/">Main Portfolio</Link>
					</div>

					<p className={styles.photoCopyright}>
						&copy; {new Date().getFullYear()} Jane Doe. All rights reserved.
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
