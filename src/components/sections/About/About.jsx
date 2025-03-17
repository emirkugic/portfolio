import React from "react";
import Button from "../../common/Button/Button";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./About.module.css";

const About = () => {
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	return (
		<section id="about" className={styles.about}>
			<div className="container">
				<h2 className="section-title">About Me</h2>

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
							<span className={styles.experienceText}>Years of Experience</span>
						</div>
					</div>

					<div
						className={`${styles.aboutInfo} ${isVisible ? "fadeInRight" : ""}`}
					>
						<h3 className={styles.aboutHeading}>Full-Stack Developer</h3>

						<p className={styles.aboutBio}>
							I'm a passionate Full-Stack Developer with 3 years of experience
							in creating modern web applications and websites. I specialize in
							building responsive, user-friendly interfaces that deliver
							exceptional experiences across all devices.
						</p>

						<p className={styles.aboutBio}>
							I love turning complex problems into simple, beautiful, and
							intuitive designs. My goal is to create software that not only
							functions flawlessly but also provides an enjoyable user
							experience.
						</p>

						<div className={styles.aboutStats}>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>10+</span>
								<span className={styles.statLabel}>Projects Completed</span>
							</div>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>10+</span>
								<span className={styles.statLabel}>Happy Clients</span>
							</div>
							<div className={styles.statItem}>
								<span className={styles.statNumber}>3+</span>
								<span className={styles.statLabel}>Years Experience</span>
							</div>
						</div>

						<div className={styles.aboutDetails}>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>Name:</span>
								<span className={styles.detailValue}>Emir Kugić</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>Email:</span>
								<span className={styles.detailValue}>emirkugic0@gmail.com</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>Phone:</span>
								<span className={styles.detailValue}>+387 62 909 200</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>Location:</span>
								<span className={styles.detailValue}>Sarajevo, Bosnia</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>Availability:</span>
								<span className={styles.detailValue}>
									Freelance & Full-time
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
								Download CV
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
