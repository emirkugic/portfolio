import React from "react";
import Logo from "../../common/Logo/Logo";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Footer.module.css";

const Footer = () => {
	const { strings } = useLanguage();
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.footerTop}>
					<div className={styles.footerInfo}>
						<Logo />
						<p className={styles.footerDesc}>{strings.footer.description}</p>
						<div className={styles.socialLinks}>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
							>
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
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
								</svg>
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
							>
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
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Twitter"
							>
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
									<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
								</svg>
							</a>
						</div>
					</div>

					<div className={styles.footerLinks}>
						<div className={styles.linkColumn}>
							<h3 className={styles.columnTitle}>
								{strings.footer.links.siteLinks}
							</h3>
							<ul className={styles.linkList}>
								<li>
									<a href="#home">{strings.nav.home}</a>
								</li>
								<li>
									<a href="#about">{strings.nav.about}</a>
								</li>
								<li>
									<a href="#skills">{strings.nav.skills}</a>
								</li>
								<li>
									<a href="#portfolio">{strings.nav.portfolio}</a>
								</li>
								<li>
									<a href="#services">{strings.nav.services}</a>
								</li>
								<li>
									<a href="#contact">{strings.nav.contact}</a>
								</li>
							</ul>
						</div>

						<div className={styles.linkColumn}>
							<h3 className={styles.columnTitle}>
								{strings.footer.links.services}
							</h3>
							<ul className={styles.linkList}>
								<li>
									<a href="#services">{strings.footer.servicesLinks.webDev}</a>
								</li>
								<li>
									<a href="#services">
										{strings.footer.servicesLinks.mobileApps}
									</a>
								</li>
								<li>
									<a href="#services">{strings.footer.servicesLinks.uiux}</a>
								</li>
								<li>
									<a href="#services">
										{strings.footer.servicesLinks.ecommerce}
									</a>
								</li>
								<li>
									<a href="#services">
										{strings.footer.servicesLinks.consulting}
									</a>
								</li>
							</ul>
						</div>

						<div className={styles.linkColumn}>
							<h3 className={styles.columnTitle}>
								{strings.footer.links.contact}
							</h3>
							<ul className={styles.contactList}>
								<li>
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
									>
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
										<polyline points="22,6 12,13 2,6"></polyline>
									</svg>
									<a href="mailto:hello@example.com">emirkugic0@gmail.com</a>
								</li>
								<li>
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
									>
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
									</svg>
									<a href="tel:+1234567890">+387 62 909 200</a>
								</li>
								<li>
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
									>
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
										<circle cx="12" cy="10" r="3"></circle>
									</svg>
									<span>Sarajevo, Bosnia</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<p className={styles.copyright}>
						&copy; {currentYear} Emir Kugić. {strings.footer.copyright}
					</p>
					<div className={styles.footerNav}>
						<a href="#terms">Terms of Service</a>
						<a href="#privacy">Privacy Policy</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
