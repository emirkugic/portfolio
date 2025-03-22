import React, { useState, useEffect } from "react";
import styles from "./CoffeeBar.module.css";

const CoffeeBar = () => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [menuActive, setMenuActive] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={styles.container}>
			{/* Header */}
			<header
				className={`${styles.header} ${
					scrollPosition > 50 ? styles.scrolled : styles.headerInitial
				}`}
			>
				<div className={styles.headerContainer}>
					<div className={styles.logo}>
						<div className={styles.logoIcon}>
							<svg width="36" height="36" viewBox="0 0 36 36">
								<path
									d="M18,0 C8.05884,0 0,8.05884 0,18 C0,27.94116 8.05884,36 18,36 C27.94116,36 36,27.94116 36,18 C36,8.05884 27.94116,0 18,0 Z M18,7 C20.76142,7 23,9.23858 23,12 C23,13.1 22.7,14.1 22.1,14.9 C25.3,15.5 27.8,18.3 27.8,21.7 C27.8,25.6 24.6,28.8 20.7,28.8 L11.9,28.8 C8,28.8 4.8,25.6 4.8,21.7 C4.8,18.3 7.3,15.5 10.5,14.9 C9.9,14.1 9.6,13.1 9.6,12 C9.6,9.23858 11.83858,7 14.6,7 L18,7 Z"
									fill="#FF8934"
								/>
							</svg>
						</div>
						<h1>
							Brew<span>Haven</span>
						</h1>
					</div>

					<div
						className={`${styles.navToggle} ${menuActive ? styles.active : ""}`}
						onClick={() => setMenuActive(!menuActive)}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<nav className={`${styles.nav} ${menuActive ? styles.active : ""}`}>
						<ul>
							<li>
								<a href="#home" onClick={() => setMenuActive(false)}>
									Home
								</a>
							</li>
							<li>
								<a href="#menu" onClick={() => setMenuActive(false)}>
									Menu
								</a>
							</li>
							<li>
								<a href="#story" onClick={() => setMenuActive(false)}>
									Our Story
								</a>
							</li>
							<li>
								<a href="#location" onClick={() => setMenuActive(false)}>
									Visit Us
								</a>
							</li>
							<li className={styles.orderBtn}>
								<a href="#order" onClick={() => setMenuActive(false)}>
									Order Now
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className={styles.hero} id="home">
				<div className={styles.heroBackground}></div>

				<div className={styles.heroOverlayGrid}>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Coffee close-up"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Latte art"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Coffee brewing"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1513267048331-5611cad62e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Coffee shop"
						/>
					</div>
				</div>

				<div className={styles.heroContentWrapper}>
					<div className={styles.heroHeadlineContainer}>
						<h2 className={styles.heroHeadline}>
							<span className={styles.heroHeadlineTop}>CRAFT</span>
							<div className={styles.heroHeadlineMiddle}>
								<span className={styles.heroHeadlineEmphasis}>COFFEE</span>
								<div className={styles.heroHeadlineDot}></div>
							</div>
							<span className={styles.heroHeadlineBottom}>CULTURE</span>
						</h2>
					</div>

					<div className={styles.heroTaglineContainer}>
						<p className={styles.heroTagline}>
							Elevating the ordinary into extraordinary
						</p>
						<div className={styles.heroButtons}>
							<button className={styles.heroButton}>
								<span>TASTE THE EXPERIENCE</span>
								<svg
									className={styles.heroButtonArrow}
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5 12H19M19 12L12 5M19 12L12 19"
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

				<div className={styles.heroStats}>
					<div className={styles.heroStat}>
						<span className={styles.heroStatNumber}>7+</span>
						<span className={styles.heroStatLabel}>YEARS</span>
					</div>
					<div className={styles.heroStatDivider}></div>
					<div className={styles.heroStat}>
						<span className={styles.heroStatNumber}>23</span>
						<span className={styles.heroStatLabel}>BLENDS</span>
					</div>
					<div className={styles.heroStatDivider}></div>
					<div className={styles.heroStat}>
						<span className={styles.heroStatNumber}>100%</span>
						<span className={styles.heroStatLabel}>PASSION</span>
					</div>
				</div>

				<div className={styles.scrollIndicator}>
					<span>SCROLL</span>
					<div className={styles.scrollLine}>
						<div className={styles.scrollDot}></div>
					</div>
				</div>
			</section>

			{/* Menu Section */}
			<section className={styles.menuSection} id="menu">
				<div className={styles.sectionIntro}>
					<h2>Our Selections</h2>
					<p>Crafted with love, precision, and the finest ingredients</p>
				</div>

				<div className={styles.menuTabs}>
					<button className={`${styles.menuTab} ${styles.active}`}>
						Coffee
					</button>
					<button className={styles.menuTab}>Food</button>
					<button className={styles.menuTab}>Desserts</button>
					<button className={styles.menuTab}>Specials</button>
					<div className={styles.menuTabIndicator}></div>
				</div>

				<div className={styles.menuCategory}>
					<div className={styles.menuGrid}>
						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Espresso"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Classic Espresso</h3>
									<span className={styles.price}>$3.50</span>
								</div>
								<p>
									Our signature blend with notes of chocolate, caramel, and a
									smooth finish.
								</p>
								<div className={styles.menuItemTags}>
									<span>House Specialty</span>
									<span>Rich</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1585437471859-9f656e63a9fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Cappuccino"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Artisan Cappuccino</h3>
									<span className={styles.price}>$4.75</span>
								</div>
								<p>
									Equal parts espresso, steamed milk, and silky microfoam,
									perfectly balanced.
								</p>
								<div className={styles.menuItemTags}>
									<span>Creamy</span>
									<span>Balanced</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1592318723821-0d29cbce3f54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Pour Over"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Single-Origin Pour Over</h3>
									<span className={styles.price}>$5.25</span>
								</div>
								<p>
									Ethiopian Yirgacheffe, hand-poured for bright citrus notes and
									a floral aroma.
								</p>
								<div className={styles.menuItemTags}>
									<span>Bright</span>
									<span>Complex</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Cold Brew"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>24-Hour Cold Brew</h3>
									<span className={styles.price}>$4.95</span>
								</div>
								<p>
									Steeped for 24 hours, creating a naturally sweet,
									ultra-smooth, low-acid coffee.
								</p>
								<div className={styles.menuItemTags}>
									<span>Refreshing</span>
									<span>Bold</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Cortado"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Cortado</h3>
									<span className={styles.price}>$4.25</span>
								</div>
								<p>
									Equal parts espresso and warm milk, creating a perfect balance
									of intensity and smoothness.
								</p>
								<div className={styles.menuItemTags}>
									<span>Strong</span>
									<span>Velvety</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1606791405792-1004f1718d0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Vanilla Latte"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Vanilla Bean Latte</h3>
									<span className={styles.price}>$5.50</span>
								</div>
								<p>
									House-made vanilla syrup, espresso, and steamed milk topped
									with a delicate latte art.
								</p>
								<div className={styles.menuItemTags}>
									<span>Sweet</span>
									<span>Aromatic</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.menuFooter}>
					<p>Ask our baristas about our rotating seasonal specials</p>
					<button className={styles.viewFullMenu}>View Full Menu</button>
				</div>
			</section>

			{/* Food Menu Highlight Section */}
			<section className={styles.foodSection}>
				<div className={styles.foodContent}>
					<h2>Pair Your Coffee</h2>
					<p>
						Locally sourced, freshly made delights to complement your perfect
						brew
					</p>

					<div className={styles.foodHighlights}>
						<div className={styles.foodItem}>
							<h3>Avocado Toast</h3>
							<p>
								Sourdough, smashed avocado, cherry tomatoes, microgreens, sea
								salt
							</p>
							<span className={styles.price}>$8.95</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Breakfast Sandwich</h3>
							<p>
								Free-range egg, cheddar, bacon, arugula, housemade aioli on
								brioche
							</p>
							<span className={styles.price}>$9.50</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Overnight Oats</h3>
							<p>
								Steel-cut oats, almond milk, chia seeds, seasonal fruits, maple
								syrup
							</p>
							<span className={styles.price}>$7.25</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Chocolate Croissant</h3>
							<p>Buttery, flaky pastry filled with premium dark chocolate</p>
							<span className={styles.price}>$4.75</span>
						</div>
					</div>

					<button className={styles.secondaryBtn}>Explore Food Menu</button>
				</div>
				<div className={styles.foodImageGrid}>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="Avocado Toast"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="Pastries"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1584147833683-250ad2c5fc5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="Breakfast Sandwich"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="Overnight Oats"
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className={styles.footer}>
				<div className={styles.footerContent}>
					<div className={styles.footerBrand}>
						<div className={styles.footerLogo}>
							<div className={styles.logoIcon}>
								<svg width="36" height="36" viewBox="0 0 36 36">
									<path
										d="M18,0 C8.05884,0 0,8.05884 0,18 C0,27.94116 8.05884,36 18,36 C27.94116,36 36,27.94116 36,18 C36,8.05884 27.94116,0 18,0 Z M18,7 C20.76142,7 23,9.23858 23,12 C23,13.1 22.7,14.1 22.1,14.9 C25.3,15.5 27.8,18.3 27.8,21.7 C27.8,25.6 24.6,28.8 20.7,28.8 L11.9,28.8 C8,28.8 4.8,25.6 4.8,21.7 C4.8,18.3 7.3,15.5 10.5,14.9 C9.9,14.1 9.6,13.1 9.6,12 C9.6,9.23858 11.83858,7 14.6,7 L18,7 Z"
										fill="#FF8934"
									/>
								</svg>
							</div>
							<h3>BrewHaven</h3>
						</div>
						<p className={styles.tagline}>
							Creating moments, one cup at a time
						</p>
						<div className={styles.socialLinks}>
							<a href="#" aria-label="Instagram">
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
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
									<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
								</svg>
							</a>
							<a href="#" aria-label="Twitter">
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
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
								</svg>
							</a>
							<a href="#" aria-label="Facebook">
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
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
								</svg>
							</a>
						</div>
					</div>
					<div className={styles.footerInfo}>
						<div className={styles.footerSection}>
							<h4>Visit Us</h4>
							<p>123 Coffee Lane</p>
							<p>Brewville, CA 98765</p>
							<p>Mon-Fri: 6am - 8pm</p>
							<p>Sat-Sun: 7am - 9pm</p>
						</div>
						<div className={styles.footerSection}>
							<h4>Contact</h4>
							<p>hello@brewhaven.com</p>
							<p>(555) 123-4567</p>
							<button className={styles.contactBtn}>Contact Us</button>
						</div>
						<div className={styles.footerSection}>
							<h4>Links</h4>
							<ul>
								<li>
									<a href="#">About Us</a>
								</li>
								<li>
									<a href="#">Careers</a>
								</li>
								<li>
									<a href="#">Events</a>
								</li>
								<li>
									<a href="#">Blog</a>
								</li>
								<li>
									<a href="#">Privacy Policy</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>&copy; 2025 BrewHaven Coffee. All rights reserved.</p>
					<p>Crafted with ♥ and lots of caffeine</p>
				</div>
				<div className={styles.backToTop}>
					<a href="#home">
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
							<line x1="12" y1="19" x2="12" y2="5"></line>
							<polyline points="5 12 12 5 19 12"></polyline>
						</svg>
					</a>
				</div>
			</footer>
		</div>
	);
};

export default CoffeeBar;
