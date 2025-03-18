// src/pages/projects/Photography/PhotographyProject.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PhotographyProject.module.css";

const PhotographyProject = () => {
	// State for mobile menu
	const [menuOpen, setMenuOpen] = useState(false);

	// State for image lightbox
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	// State for header visibility
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	// Handle scroll to hide/show header
	React.useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Show header when scrolling up, hide when scrolling down
			// Only after scrolling past 200px from the top to avoid quick changes at the top
			if (currentScrollY > 200) {
				setIsHeaderVisible(currentScrollY < lastScrollY);
			} else {
				setIsHeaderVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	// Gallery images
	const galleryImages = [
		{ id: 1, title: "Nature Landscape", category: "Landscape" },
		{ id: 2, title: "Wildlife Portrait", category: "Wildlife" },
		{ id: 3, title: "Mountain Sunrise", category: "Landscape" },
		{ id: 4, title: "Ocean Waves", category: "Seascape" },
		{ id: 5, title: "Forest Wildlife", category: "Wildlife" },
		{ id: 6, title: "Desert Sunset", category: "Landscape" },
		{ id: 7, title: "Macro Flora", category: "Macro" },
		{ id: 8, title: "Bird in Flight", category: "Wildlife" },
	];

	// Photography services
	const services = [
		{
			title: "Nature Photography",
			description:
				"Capturing the beauty of natural landscapes, wildlife, and plant life in their native environments.",
			icon: "🌲",
		},
		{
			title: "Wildlife Photography",
			description:
				"Specialized photography of animals in their natural habitat with a focus on natural behavior.",
			icon: "🦊",
		},
		{
			title: "Landscape Photography",
			description:
				"Capturing the vast beauty of natural scenery, from mountains to oceans and everything in between.",
			icon: "🏞️",
		},
		{
			title: "Macro Photography",
			description:
				"Extreme close-up photography, usually of small subjects, in which the size of the subject appears greater than life size.",
			icon: "🌱",
		},
	];

	// Testimonials
	const testimonials = [
		{
			id: 1,
			name: "Sarah Johnson",
			role: "Magazine Editor",
			text: "The photographs provided for our nature magazine were absolutely stunning. The attention to detail and ability to capture the perfect moment sets this work apart.",
		},
		{
			id: 2,
			name: "Michael Chen",
			role: "Conservation Director",
			text: "These powerful images have helped us raise awareness for our conservation efforts. The quality and emotion captured in each shot tells a story that words alone cannot.",
		},
		{
			id: 3,
			name: "Emma Rodriguez",
			role: "Art Curator",
			text: "I've featured these nature photographs in multiple exhibitions. The artistic vision and technical excellence consistently impress our gallery visitors.",
		},
	];

	// Toggle mobile menu
	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// Open lightbox
	const openLightbox = (index) => {
		setCurrentImage(index);
		setLightboxOpen(true);
		document.body.style.overflow = "hidden";
	};

	// Close lightbox
	const closeLightbox = () => {
		setLightboxOpen(false);
		document.body.style.overflow = "auto";
	};

	// Navigate through lightbox
	const navigateLightbox = (direction) => {
		const newIndex = currentImage + direction;
		if (newIndex >= 0 && newIndex < galleryImages.length) {
			setCurrentImage(newIndex);
		}
	};

	return (
		<div className={styles.photoProject}>
			{/* Project Header */}
			<header
				className={`${styles.photoHeader} ${
					!isHeaderVisible ? styles.photoHeaderHidden : ""
				}`}
			>
				<div className={styles.photoContainer}>
					<div className={styles.photoHeaderContent}>
						<div className={styles.photoLogo}>
							<h2>Natura</h2>
							<span>Photography</span>
						</div>

						<button
							className={`${styles.photoMobileMenuBtn} ${
								menuOpen ? styles.photoActive : ""
							}`}
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							<span></span>
							<span></span>
							<span></span>
						</button>

						<nav
							className={`${styles.photoNav} ${
								menuOpen ? styles.photoNavOpen : ""
							}`}
						>
							<ul className={styles.photoNavList}>
								<li>
									<a href="#photoHome" className={styles.photoNavLink}>
										Home
									</a>
								</li>
								<li>
									<a href="#photoAbout" className={styles.photoNavLink}>
										About
									</a>
								</li>
								<li>
									<a href="#photoGallery" className={styles.photoNavLink}>
										Gallery
									</a>
								</li>
								<li>
									<a href="#photoServices" className={styles.photoNavLink}>
										Services
									</a>
								</li>
								<li>
									<a href="#photoTestimonials" className={styles.photoNavLink}>
										Testimonials
									</a>
								</li>
								<li>
									<a href="#photoContact" className={styles.photoNavLink}>
										Contact
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section id="photoHome" className={styles.photoHero}>
				<div className={styles.photoHeroOverlay}>
					<div className={styles.photoContainer}>
						<div className={styles.photoHeroContent}>
							<h1 className={styles.photoHeroTitle}>
								Capturing Nature's Moments
							</h1>
							<p className={styles.photoHeroSubtitle}>
								Discover the beauty of our natural world through the lens
							</p>
							<div className={styles.photoHeroButtons}>
								<a href="#photoGallery" className={styles.photoButton}>
									View Gallery
								</a>
								<a href="#photoContact" className={styles.photoButtonOutline}>
									Get in Touch
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="photoAbout" className={styles.photoAbout}>
				<div className={styles.photoContainer}>
					<div className={styles.photoSectionHeader}>
						<h2 className={styles.photoSectionTitle}>About Me</h2>
						<div className={styles.photoSectionDivider}></div>
					</div>

					<div className={styles.photoAboutContent}>
						<div className={styles.photoAboutImage}>
							<img src="/image1.png" alt="Nature Photographer" />
							<div className={styles.photoAboutImageBox}>
								<span>10+ Years Experience</span>
							</div>
						</div>

						<div className={styles.photoAboutText}>
							<h3 className={styles.photoAboutHeading}>
								A Passion for Nature Photography
							</h3>
							<p>
								Welcome to my world of nature photography. For over a decade,
								I've been capturing the beauty of our natural world, from vast
								landscapes to intimate wildlife moments.
							</p>
							<p>
								My journey began with a simple love for the outdoors and a
								camera passed down from my grandfather. That combination ignited
								a passion that has taken me across continents in search of
								unique perspectives on nature's wonders.
							</p>
							<p>
								I believe that photography has the power to connect people with
								nature, fostering appreciation and conservation. Each image I
								create aims to tell a story about our natural world that
								inspires and educates.
							</p>
							<div className={styles.photoAboutStats}>
								<div className={styles.photoAboutStat}>
									<h4>200+</h4>
									<p>Projects Completed</p>
								</div>
								<div className={styles.photoAboutStat}>
									<h4>15</h4>
									<p>Awards Won</p>
								</div>
								<div className={styles.photoAboutStat}>
									<h4>50+</h4>
									<p>Happy Clients</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="photoGallery" className={styles.photoGallery}>
				<div className={styles.photoContainer}>
					<div className={styles.photoSectionHeader}>
						<h2 className={styles.photoSectionTitle}>Gallery</h2>
						<div className={styles.photoSectionDivider}></div>
						<p className={styles.photoSectionSubtitle}>
							A selection of my finest nature photography work from around the
							world
						</p>
					</div>

					<div className={styles.photoGalleryGrid}>
						{galleryImages.map((image, index) => (
							<div
								key={image.id}
								className={styles.photoGalleryItem}
								onClick={() => openLightbox(index)}
							>
								<img src="/image1.png" alt={image.title} />
								<div className={styles.photoGalleryItemOverlay}>
									<h3>{image.title}</h3>
									<p>{image.category}</p>
								</div>
							</div>
						))}
					</div>

					<div className={styles.photoGalleryButton}>
						<a href="#photoContact" className={styles.photoButton}>
							Request Custom Photoshoot
						</a>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section id="photoServices" className={styles.photoServices}>
				<div className={styles.photoContainer}>
					<div className={styles.photoSectionHeader}>
						<h2 className={styles.photoSectionTitle}>Services</h2>
						<div className={styles.photoSectionDivider}></div>
						<p className={styles.photoSectionSubtitle}>
							Professional photography services tailored to your specific needs
						</p>
					</div>

					<div className={styles.photoServicesGrid}>
						{services.map((service, index) => (
							<div key={index} className={styles.photoServicesCard}>
								<div className={styles.photoServicesIcon}>{service.icon}</div>
								<h3 className={styles.photoServicesTitle}>{service.title}</h3>
								<p className={styles.photoServicesDescription}>
									{service.description}
								</p>
								<a href="#photoContact" className={styles.photoServicesLink}>
									Learn More
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="photoTestimonials" className={styles.photoTestimonials}>
				<div className={styles.photoContainer}>
					<div className={styles.photoSectionHeader}>
						<h2 className={styles.photoSectionTitle}>Testimonials</h2>
						<div className={styles.photoSectionDivider}></div>
						<p className={styles.photoSectionSubtitle}>
							What my clients say about my photography work
						</p>
					</div>

					<div className={styles.photoTestimonialsGrid}>
						{testimonials.map((testimonial) => (
							<div key={testimonial.id} className={styles.photoTestimonialCard}>
								<div className={styles.photoTestimonialQuote}>"</div>
								<p className={styles.photoTestimonialText}>
									{testimonial.text}
								</p>
								<div className={styles.photoTestimonialAuthor}>
									<div className={styles.photoTestimonialAvatar}>
										<img src="/image1.png" alt={testimonial.name} />
									</div>
									<div className={styles.photoTestimonialInfo}>
										<h4>{testimonial.name}</h4>
										<p>{testimonial.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="photoContact" className={styles.photoContact}>
				<div className={styles.photoContainer}>
					<div className={styles.photoContactWrapper}>
						<div className={styles.photoContactInfo}>
							<div className={styles.photoSectionHeader}>
								<h2 className={styles.photoSectionTitle}>Get In Touch</h2>
								<div className={styles.photoSectionDivider}></div>
								<p className={styles.photoSectionSubtitle}>
									Interested in working together? Let's discuss your project.
								</p>
							</div>

							<div className={styles.photoContactDetails}>
								<div className={styles.photoContactItem}>
									<div className={styles.photoContactIcon}>📍</div>
									<div className={styles.photoContactText}>
										<h4>Location</h4>
										<p>123 Nature Street, Woodland, CA 95695</p>
									</div>
								</div>

								<div className={styles.photoContactItem}>
									<div className={styles.photoContactIcon}>✉️</div>
									<div className={styles.photoContactText}>
										<h4>Email</h4>
										<p>contact@naturaphotography.com</p>
									</div>
								</div>

								<div className={styles.photoContactItem}>
									<div className={styles.photoContactIcon}>📱</div>
									<div className={styles.photoContactText}>
										<h4>Phone</h4>
										<p>+1 (555) 123-4567</p>
									</div>
								</div>
							</div>

							<div className={styles.photoContactSocial}>
								<h4>Follow Me</h4>
								<div className={styles.photoContactSocialLinks}>
									<a href="#" className={styles.photoContactSocialLink}>
										📘
									</a>
									<a href="#" className={styles.photoContactSocialLink}>
										📸
									</a>
									<a href="#" className={styles.photoContactSocialLink}>
										🐦
									</a>
									<a href="#" className={styles.photoContactSocialLink}>
										👨‍💼
									</a>
								</div>
							</div>
						</div>

						<div className={styles.photoContactForm}>
							<form className={styles.photoForm}>
								<div className={styles.photoFormGroup}>
									<label htmlFor="name" className={styles.photoFormLabel}>
										Your Name
									</label>
									<input
										type="text"
										id="name"
										className={styles.photoFormControl}
										placeholder="John Doe"
									/>
								</div>

								<div className={styles.photoFormGroup}>
									<label htmlFor="email" className={styles.photoFormLabel}>
										Your Email
									</label>
									<input
										type="email"
										id="email"
										className={styles.photoFormControl}
										placeholder="john@example.com"
									/>
								</div>

								<div className={styles.photoFormGroup}>
									<label htmlFor="subject" className={styles.photoFormLabel}>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										className={styles.photoFormControl}
										placeholder="Photography Inquiry"
									/>
								</div>

								<div className={styles.photoFormGroup}>
									<label htmlFor="message" className={styles.photoFormLabel}>
										Message
									</label>
									<textarea
										id="message"
										className={styles.photoFormControl}
										rows="5"
										placeholder="Tell me about your project..."
									></textarea>
								</div>

								<button type="submit" className={styles.photoButton}>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className={styles.photoFooter}>
				<div className={styles.photoContainer}>
					<div className={styles.photoFooterContent}>
						<div className={styles.photoFooterLogo}>
							<h2>Natura</h2>
							<span>Photography</span>
						</div>

						<p className={styles.photoFooterText}>
							Capturing the beauty of nature, one frame at a time.
						</p>

						<div className={styles.photoFooterNav}>
							<a href="#photoHome" className={styles.photoFooterLink}>
								Home
							</a>
							<a href="#photoAbout" className={styles.photoFooterLink}>
								About
							</a>
							<a href="#photoGallery" className={styles.photoFooterLink}>
								Gallery
							</a>
							<a href="#photoServices" className={styles.photoFooterLink}>
								Services
							</a>
							<a href="#photoContact" className={styles.photoFooterLink}>
								Contact
							</a>
						</div>

						<div className={styles.photoFooterBottom}>
							<p>&copy; 2025 Natura Photography. All Rights Reserved.</p>
							<div className={styles.photoFooterLinks}>
								<Link to="/" className={styles.photoFooterPortfolioLink}>
									← Back to Main Portfolio
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Lightbox */}
			{lightboxOpen && (
				<div className={styles.photoLightbox} onClick={closeLightbox}>
					<div
						className={styles.photoLightboxContent}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className={styles.photoLightboxClose}
							onClick={closeLightbox}
						>
							×
						</button>

						<div className={styles.photoLightboxImage}>
							<img src="/image1.png" alt={galleryImages[currentImage].title} />
						</div>

						<div className={styles.photoLightboxCaption}>
							<h3>{galleryImages[currentImage].title}</h3>
							<p>{galleryImages[currentImage].category}</p>
						</div>

						<button
							className={`${styles.photoLightboxNav} ${styles.photoLightboxNavPrev}`}
							onClick={() => navigateLightbox(-1)}
							disabled={currentImage === 0}
						>
							←
						</button>

						<button
							className={`${styles.photoLightboxNav} ${styles.photoLightboxNavNext}`}
							onClick={() => navigateLightbox(1)}
							disabled={currentImage === galleryImages.length - 1}
						>
							→
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PhotographyProject;
