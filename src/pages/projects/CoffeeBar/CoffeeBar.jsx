import React, { useState, useEffect } from "react";
import styles from "./CoffeeBar.module.css";
import BackButton from "../../../components/common/BackButton/BackButton";

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
			<BackButton />
			{/* Header */}
			<header
				className={`${styles.header} ${
					scrollPosition > 50 ? styles.scrolled : styles.headerInitial
				}`}
			>
				<div className={styles.headerContainer}>
					<div className={styles.logo}>
						<div className={styles.logoIcon}>
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2 8.5H4.5V16.5C4.5 18.43 6.07 20 8 20H16C17.93 20 19.5 18.43 19.5 16.5V8.5H22"
									stroke="#FF8934"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 4V15"
									stroke="#FF8934"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 11L12 15L16 11"
									stroke="#FF8934"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M19.5 8.5H4.5C4.09 7.4 4.91 4 8 4H16C19.09 4 19.91 7.4 19.5 8.5Z"
									stroke="#FF8934"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h1>
							Kafa<span>Kutak</span>
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
									Početna
								</a>
							</li>
							<li>
								<a href="#menu" onClick={() => setMenuActive(false)}>
									Meni
								</a>
							</li>
							<li>
								<a href="#story" onClick={() => setMenuActive(false)}>
									O Nama
								</a>
							</li>
							<li>
								<a href="#location" onClick={() => setMenuActive(false)}>
									Lokacija
								</a>
							</li>
							<li className={styles.orderBtn}>
								<a href="#order" onClick={() => setMenuActive(false)}>
									Naruči Odmah
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className={styles.hero} id="home">
				<div className={styles.heroBackground}></div>
				<div className={styles.heroGradientOverlay}></div>

				<div className={styles.heroOverlayGrid}>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Kafa izbliza"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://i.ytimg.com/vi/nlTn2blovRs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDdWbr-KHJraoWnQI4z7xFeH52yRA"
							alt="Bosanska kafa"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Priprema kafe"
						/>
					</div>
					<div className={styles.heroGridItem}>
						<img
							src="https://images.unsplash.com/photo-1513267048331-5611cad62e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
							alt="Kafić"
						/>
					</div>
				</div>

				<div className={styles.heroContentWrapper}>
					<div className={styles.heroHeadlineContainer}>
						<h2 className={styles.heroHeadline}>
							<span className={styles.heroHeadlineTop}>BOSANSKA</span>
							<div className={styles.heroHeadlineMiddle}>
								<span className={styles.heroHeadlineEmphasis}>KAFA</span>
								<div className={styles.heroHeadlineDot}></div>
							</div>
							<span className={styles.heroHeadlineBottom}>TRADICIJA</span>
						</h2>
					</div>

					<div className={styles.heroTaglineContainer}>
						<p className={styles.heroTagline}>
							Uživajte u tradicionalnom ukusu sa modernim dodirom
						</p>
						<div className={styles.heroButtons}>
							<button className={styles.heroButton}>
								<span>DOŽIVITE UKUS</span>
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
						<span className={styles.heroStatNumber}>70+</span>
						<span className={styles.heroStatLabel}>GODINA</span>
					</div>
					<div className={styles.heroStatDivider}></div>
					<div className={styles.heroStat}>
						<span className={styles.heroStatNumber}>18</span>
						<span className={styles.heroStatLabel}>VRSTA</span>
					</div>
					<div className={styles.heroStatDivider}></div>
					<div className={styles.heroStat}>
						<span className={styles.heroStatNumber}>100%</span>
						<span className={styles.heroStatLabel}>STRAST</span>
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
					<h2>Naša Ponuda</h2>
					<p>Pripremljeno s ljubavlju, tradicijom i najfinijim sastojcima</p>
				</div>

				<div className={styles.menuTabs}>
					<button className={`${styles.menuTab} ${styles.active}`}>Kafa</button>
					<button className={styles.menuTab}>Hrana</button>
					<button className={styles.menuTab}>Kolači</button>
					<button className={styles.menuTab}>Specijaliteti</button>
					<div className={styles.menuTabIndicator}></div>
				</div>

				<div className={styles.menuCategory}>
					<div className={styles.menuGrid}>
						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://i.ytimg.com/vi/nlTn2blovRs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDdWbr-KHJraoWnQI4z7xFeH52yRA"
									alt="Bosanska kafa"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Bosanska Kafa</h3>
									<span className={styles.price}>3.50 KM</span>
								</div>
								<p>
									Tradicionalno kuhana na žaru u džezvi, servirana s
									rahatlokumom i u findzanu.
								</p>
								<div className={styles.menuItemTags}>
									<span>Tradicionalna</span>
									<span>Jaka</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg"
									alt="Cappuccino"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Cappuccino</h3>
									<span className={styles.price}>4.00 KM</span>
								</div>
								<p>
									Savršen spoj espresa, vrućeg mlijeka i kremaste pjene,
									uravnoteženog ukusa.
								</p>
								<div className={styles.menuItemTags}>
									<span>Kremasto</span>
									<span>Blago</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://www.tastingtable.com/img/gallery/what-is-white-coffee-and-how-is-it-made/intro-1682029648.jpg"
									alt="Bijela Kafa"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Bijela Kafa</h3>
									<span className={styles.price}>3.75 KM</span>
								</div>
								<p>
									Tradicionalna bosanska bijela kafa s mlijekom, kuhana na
									starinski način.
								</p>
								<div className={styles.menuItemTags}>
									<span>Domaće</span>
									<span>Klasik</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt="Ledena Kafa"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Ledena Kafa</h3>
									<span className={styles.price}>4.50 KM</span>
								</div>
								<p>
									Bosanska kafa ohlađena s ledom i servirana s domaćim
									sladoledom od vanilije.
								</p>
								<div className={styles.menuItemTags}>
									<span>Osvježavajuće</span>
									<span>Jedinstveno</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Makijato"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Makijato</h3>
									<span className={styles.price}>3.00 KM</span>
								</div>
								<p>
									Espreso s malom količinom mlijeka, savršen spoj intenziteta i
									blagosti.
								</p>
								<div className={styles.menuItemTags}>
									<span>Jako</span>
									<span>Brzo</span>
								</div>
							</div>
						</div>

						<div className={styles.menuItem}>
							<div className={styles.menuItemImage}>
								<img
									src="https://www.health.com/thmb/YXxmAuCsJHtTWvSWPorjVx1F7AQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-TypesOfCoffee-b8f6f7382a1443109f74edb1050f9808.jpg"
									alt="Kafa s Rahatlokumom"
								/>
								<div className={styles.menuItemOverlay}></div>
							</div>
							<div className={styles.menuItemContent}>
								<div className={styles.menuItemHeader}>
									<h3>Kafa s Rahatlokumom</h3>
									<span className={styles.price}>5.00 KM</span>
								</div>
								<p>Kafa s rahatlokumom, tradicionalnim turskim slatkišem.</p>
								<div className={styles.menuItemTags}>
									<span>Slatko</span>
									<span>Aromatično</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.menuFooter}>
					<p>Pitajte naše bariste o sezonskim specijalitetima</p>
					<button className={styles.viewFullMenu}>
						Pogledaj Kompletan Meni
					</button>
				</div>
			</section>

			{/* Food Menu Highlight Section */}
			<section className={styles.foodSection}>
				<div className={styles.foodContent}>
					<h2>Uz Našu Kafu</h2>
					<p>
						Lokalno nabavljeni, svježe pripremljeni delikatesi koji savršeno
						nadopunjuju vašu kafu
					</p>

					<div className={styles.foodHighlights}>
						<div className={styles.foodItem}>
							<h3>Avokado tost</h3>
							<p>Bezglutenski tost, avokado, jaje, zacini</p>
							<span className={styles.price}>6.50 KM</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Veganska salata</h3>
							<p>
								Svježa sezonska salata s organskim povrćem i prelivom od
								balsamika
							</p>
							<span className={styles.price}>8.50 KM</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Hurmašice</h3>
							<p>
								Tradicionalni bosanski kolačići u slatkom sirupu od meda i
								vanilije
							</p>
							<span className={styles.price}>4.00 KM</span>
						</div>

						<div className={styles.foodItem}>
							<h3>Baklava</h3>
							<p>
								Slojevito tijesto s orasima i medom, pripremljeno po porodičnom
								receptu
							</p>
							<span className={styles.price}>4.75 KM</span>
						</div>
					</div>

					<button className={styles.secondaryBtn}>Istražite Jelovnik</button>
				</div>
				<div className={styles.foodImageGrid}>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="toast"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							alt="salad"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://iftarskimeni.com/wp-content/uploads/2012/06/Hurma%C5%A1ice.png"
							alt="Hurmasice"
						/>
					</div>
					<div className={styles.foodImageWrap}>
						<img
							src="https://www.365daysofbakingandmore.com/wp-content/uploads/2011/08/Baklava-1-1.jpg"
							alt="Baklava"
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
								<svg
									width="36"
									height="36"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 8.5H4.5V16.5C4.5 18.43 6.07 20 8 20H16C17.93 20 19.5 18.43 19.5 16.5V8.5H22"
										stroke="#FF8934"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12 4V15"
										stroke="#FF8934"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M8 11L12 15L16 11"
										stroke="#FF8934"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M19.5 8.5H4.5C4.09 7.4 4.91 4 8 4H16C19.09 4 19.91 7.4 19.5 8.5Z"
										stroke="#FF8934"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3>KafaKutak</h3>
						</div>
						<p className={styles.tagline}>
							Stvaramo trenutke, jedna šalica kafe odjednom
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
							<h4>Posjetite Nas</h4>
							<p>Ulica Baščaršija 15</p>
							<p>Sarajevo, 71000</p>
							<p>Pon-Pet: 7:00 - 22:00</p>
							<p>Sub-Ned: 8:00 - 23:00</p>
						</div>
						<div className={styles.footerSection}>
							<h4>Kontakt</h4>
							<p>info@kafakutak.ba</p>
							<p>(033) 123-456</p>
							<button className={styles.contactBtn}>Kontaktirajte Nas</button>
						</div>
						<div className={styles.footerSection}>
							<h4>Linkovi</h4>
							<ul>
								<li>
									<a href="#">O Nama</a>
								</li>
								<li>
									<a href="#">Karijera</a>
								</li>
								<li>
									<a href="#">Događaji</a>
								</li>
								<li>
									<a href="#">Blog</a>
								</li>
								<li>
									<a href="#">Privatnost</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>&copy; 2025 KafaKutak. Sva prava zadržana.</p>
					<p>Napravljeno s ♥ i mnogo kafe</p>
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
