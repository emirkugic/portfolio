import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
	const { language, changeLanguage } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleLanguageChange = (lang) => {
		changeLanguage(lang);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.languageSwitcher} ref={dropdownRef}>
			<button
				className={styles.langButton}
				onClick={toggleDropdown}
				aria-label="Change language"
			>
				<span className={styles.langCode}>{language.toUpperCase()}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`${styles.langIcon} ${isOpen ? styles.rotate : ""}`}
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>

			{isOpen && (
				<div className={styles.langDropdown}>
					<button
						className={`${styles.langOption} ${
							language === "en" ? styles.active : ""
						}`}
						onClick={() => handleLanguageChange("en")}
					>
						<span className={styles.langFlag}>🇺🇸</span>
						<span>English</span>
					</button>
					<button
						className={`${styles.langOption} ${
							language === "bs" ? styles.active : ""
						}`}
						onClick={() => handleLanguageChange("bs")}
					>
						<span className={styles.langFlag}>🇧🇦</span>
						<span>Bosanski</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
