import React from "react";
import Button from "../../common/Button/Button";
import { useLanguage } from "../../../context/LanguageContext";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./About.module.css";

const About = () => {
	const { strings } = useLanguage();
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	return (
		<section id="about" className={styles.about}>
			<div className="container">
				<h2 className="section-title">{strings.about.title}</h2>

				<div className={styles.aboutContent} ref={ref}>
					<div
						className={`${styles.aboutImage} ${isVisible ? "fadeInLeft" : ""}`}
					>
						<div className={styles.imageMain}>
							<img src="/pfp.jpg" alt="John Doe" />
						</div>
						<div className={styles.imageDecoration}></div>
						<div className={styles.experienceBadge}>
							<span className={styles.experienceYears}>3+</span>
							<span className={styles.experienceText}>
								{strings.about.stats.experience}
							</span>
						</div>
					</div>

					<div
						className={`${styles.aboutInfo} ${isVisible ? "fadeInRight" : ""}`}
					>
						<h3 className={styles.aboutHeading}>{strings.about.heading}</h3>

						<p className={styles.aboutBio}>{strings.about.bio1}</p>

						<p className={styles.aboutBio}>{strings.about.bio2}</p>

						<div className={styles.aboutStats}>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>10+</span>
								<span className={styles.statLabel}>
									{strings.about.stats.projects}
								</span>
							</div>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>10+</span>
								<span className={styles.statLabel}>
									{strings.about.stats.clients}
								</span>
							</div>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>3+</span>
								<span className={styles.statLabel}>
									{strings.about.stats.experience}
								</span>
							</div>
						</div>

						<div className={styles.aboutDetails}>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									{strings.about.details.name}
								</span>
								<span className={styles.detailValue}>Emir Kugić</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									{strings.about.details.email}
								</span>
								<span className={styles.detailValue}>emirkugic0@gmail.com</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									{strings.about.details.phone}
								</span>
								<span className={styles.detailValue}>+387 62 909 200</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									{strings.about.details.location}
								</span>
								<span className={styles.detailValue}>Sarajevo, Bosnia</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									{strings.about.details.availability}
								</span>
								<span className={styles.detailValue}>
									{strings.about.details.availabilityValue}
								</span>
							</div>
						</div>

						<div className={styles.aboutActions}>
							<Button
								href="/resume.pdf"
								variant="primary"
								icon={
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
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
										<polyline points="7 10 12 15 17 10"></polyline>
										<line x1="12" y1="15" x2="12" y2="3"></line>
									</svg>
								}
							>
								{strings.about.downloadCV}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
