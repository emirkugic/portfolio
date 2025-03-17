import React, { useState, useEffect } from "react";
import Logo from "../../common/Logo/Logo";
import { useTheme } from "../../../context/ThemeContext";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import styles from "./Header.module.css";

const Header = ({ isScrolled }) => {
	const { theme, toggleTheme } = useTheme();
	const { strings } = useLanguage();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isMenuOpen && !event.target.closest(`.${styles.navWrapper}`)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isMenuOpen]);

	// Disable body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
			<div className={`container ${styles.headerContainer}`}>
				<Logo />

				<div className={styles.navWrapper}>
					<button
						className={`${styles.mobileToggle} ${
							isMenuOpen ? styles.active : ""
						}`}
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>

					<nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
						<ul className={styles.navList}>
							<li className={styles.navItem}>
								<a href="#home" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.home}
								</a>
							</li>
							<li className={styles.navItem}>
								<a href="#about" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.about}
								</a>
							</li>
							<li className={styles.navItem}>
								<a href="#skills" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.skills}
								</a>
							</li>
							<li className={styles.navItem}>
								<a href="#portfolio" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.portfolio}
								</a>
							</li>
							<li className={styles.navItem}>
								<a href="#services" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.services}
								</a>
							</li>
							<li className={styles.navItem}>
								<a href="#contact" onClick={() => setIsMenuOpen(false)}>
									{strings.nav.contact}
								</a>
							</li>
						</ul>

						<div className={styles.navActions}>
							<LanguageSwitcher />

							<button
								className={styles.themeToggle}
								onClick={toggleTheme}
								aria-label={`Switch to ${
									theme === "light" ? "dark" : "light"
								} mode`}
							>
								{theme === "light" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="5"></circle>
										<line x1="12" y1="1" x2="12" y2="3"></line>
										<line x1="12" y1="21" x2="12" y2="23"></line>
										<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
										<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
										<line x1="1" y1="12" x2="3" y2="12"></line>
										<line x1="21" y1="12" x2="23" y2="12"></line>
										<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
										<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
									</svg>
								)}
							</button>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
