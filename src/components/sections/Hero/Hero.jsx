import React, { useState, useEffect, useRef } from "react";
import Button from "../../common/Button/Button";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Hero.module.css";

const Hero = () => {
	const { strings } = useLanguage();
	const textRef = useRef(null);

	// Simple typing effect that's resilient to re-renders
	useEffect(() => {
		if (!textRef.current) return;

		const texts = strings.hero.roles;
		let currentIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
		let typingTimer = null;

		const type = () => {
			const currentText = texts[currentIndex];

			if (textRef.current) {
				// Protection in case component unmounts
				if (isDeleting) {
					textRef.current.textContent = currentText.substring(0, charIndex - 1);
					charIndex--;
				} else {
					textRef.current.textContent = currentText.substring(0, charIndex + 1);
					charIndex++;
				}

				let typingSpeed = isDeleting ? 50 : 100;

				if (!isDeleting && charIndex === currentText.length) {
					isDeleting = true;
					typingSpeed = 1000; // Pause at end
				} else if (isDeleting && charIndex === 0) {
					isDeleting = false;
					currentIndex = (currentIndex + 1) % texts.length;
					typingSpeed = 500; // Pause before typing next
				}

				typingTimer = setTimeout(type, typingSpeed);
			}
		};

		// Reset and start animation
		if (textRef.current) {
			textRef.current.textContent = "";
			charIndex = 0;
			isDeleting = false;
			currentIndex = 0;

			// Small delay before starting
			typingTimer = setTimeout(type, 200);
		}

		// Clean up
		return () => {
			clearTimeout(typingTimer);
		};
	}, [strings.hero.roles]); // Restart animation when language changes

	return (
		<section id="home" className={styles.hero}>
			<div className={styles.heroBackground}>
				<div className={styles.animatedGrid}></div>
				<div className={styles.codeLines}>
					<div className={styles.codeLine}>
						&lt;<span>html</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&lt;<span>body</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span>header</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span>h1</span>
						&gt;Welcome&lt;/<span>h1</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span>header</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span>main</span>&gt;
					</div>
					<div className={styles.codeLine}>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span>section</span>{" "}
						<span>class</span>=
						<span className={styles.string}>"portfolio"</span>&gt;
					</div>
				</div>
			</div>

			<div id="floatingBackground" className={styles.floatingBackground}></div>

			<div className={`container ${styles.heroContainer}`}>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>
						<span className={`${styles.greeting} fadeInDown`}>
							{strings.hero.greeting}
						</span>
						<span className={`${styles.name} fadeInUp delay-1`}>
							Emir Kugić
						</span>
						<span className={`${styles.profession} fadeInUp delay-2`}>
							<span>{strings.hero.profession} </span>
							<span ref={textRef} className={styles.typingText}></span>
						</span>
					</h1>

					<p className={`${styles.heroDescription} fadeInUp delay-3`}>
						{strings.hero.description}
					</p>

					<div className={`${styles.heroButtons} fadeInUp delay-4`}>
						<Button
							href="#portfolio"
							variant="primary"
							size="large"
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
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							}
						>
							{strings.hero.viewWork}
						</Button>

						<Button
							href="#contact"
							variant="secondary"
							size="large"
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
									<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
									<path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
								</svg>
							}
						>
							{strings.hero.contactMe}
						</Button>
					</div>
				</div>

				<div className={styles.heroDecoration}>
					<div className={styles.codeBlock}>
						<div className={styles.codeEditor}>
							<div className={styles.codeEditorHeader}>
								<span className={styles.codeEditorDot}></span>
								<span className={styles.codeEditorDot}></span>
								<span className={styles.codeEditorDot}></span>
								<span className={styles.codeEditorTitle}>developer.js</span>
							</div>
							<div className={styles.codeEditorContent}>
								<div className={styles.codeEditorLine}>
									<span className={styles.codeComment}>
										// Welcome to my portfolio
									</span>
								</div>
								<div className={styles.codeEditorLine}>
									<span className={styles.codeKeyword}>const</span>{" "}
									<span className={styles.codeVariable}>developer</span> = {"{"}
								</div>
								<div className={styles.codeEditorLine}>
									&nbsp;&nbsp;<span className={styles.codeProperty}>name</span>:{" "}
									<span className={styles.codeString}>'Emir Kugić'</span>,
								</div>
								<div className={styles.codeEditorLine}>
									&nbsp;&nbsp;<span className={styles.codeProperty}>title</span>
									:{" "}
									<span className={styles.codeString}>
										'Full-Stack Developer'
									</span>
									,
								</div>
								<div className={styles.codeEditorLine}>
									&nbsp;&nbsp;
									<span className={styles.codeProperty}>skills</span>: [
									<span className={styles.codeString}>'Web'</span>,{" "}
									<span className={styles.codeString}>'Mobile'</span>,{" "}
									<span className={styles.codeString}>'UI/UX'</span>],
								</div>
								<div className={styles.codeEditorLine}>
									&nbsp;&nbsp;
									<span className={styles.codeMethod}>createAmazingThings</span>
									() {"{"}
								</div>
								<div className={styles.codeEditorLine}>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<span className={styles.codeKeyword}>return</span>{" "}
									<span className={styles.codeString}>
										'Beautiful digital experiences'
									</span>
									;
								</div>
								<div className={styles.codeEditorLine}>&nbsp;&nbsp;{"}"}</div>
								<div className={styles.codeEditorLine}>{"};"}</div>
							</div>
						</div>
					</div>
					<div className={styles.floatingElements}>
						<div
							className={`${styles.floatingElement} ${styles.floatingElementHtml}`}
						>
							ReactJS
						</div>
						<div
							className={`${styles.floatingElement} ${styles.floatingElementNet}`}
						>
							.NET
						</div>
						<div
							className={`${styles.floatingElement} ${styles.floatingElementSpring}`}
						>
							Spring
						</div>
						<div
							className={`${styles.floatingElement} ${styles.floatingElementLaravel}`}
						>
							Laravel
						</div>
						<div
							className={`${styles.floatingElement} ${styles.floatingElementFlutter}`}
						>
							Flutter
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
