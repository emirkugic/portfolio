import React, { createContext, useState, useEffect, useContext } from "react";
import { translations } from "../utils/translations.js";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
	// Initialize with a default language (will be updated based on browser settings)
	const [language, setLanguage] = useState("en");
	const [strings, setStrings] = useState(translations.en);

	useEffect(() => {
		// Detect browser language on initial load
		const detectBrowserLanguage = () => {
			const savedLanguage = localStorage.getItem("language");

			if (savedLanguage) {
				return savedLanguage;
			}

			// Get browser language
			const browserLang = navigator.language || navigator.userLanguage;

			// Check if the browser language is Bosnian (bs) or related (hr, sr)
			// as Bosnian might be represented by different codes
			if (
				browserLang.startsWith("bs") ||
				browserLang.startsWith("hr") ||
				browserLang.startsWith("sr")
			) {
				return "bs";
			}

			return "en"; // Default to English
		};

		const detectedLanguage = detectBrowserLanguage();
		setLanguage(detectedLanguage);
		setStrings(translations[detectedLanguage]);
	}, []);

	// Update strings whenever language changes
	useEffect(() => {
		setStrings(translations[language]);
		localStorage.setItem("language", language);
	}, [language]);

	const changeLanguage = (lang) => {
		if (translations[lang]) {
			setLanguage(lang);
		}
	};

	return (
		<LanguageContext.Provider value={{ language, strings, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageContext;
