import React from "react";
import Card from "../../common/Card/Card";
import SkillItem from "./SkillItem";
import { useLanguage } from "../../../context/LanguageContext";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./Skills.module.css";

const Skills = () => {
	const { strings } = useLanguage();
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const frontendSkills = [
		{ name: "HTML5", percentage: 95 },
		{ name: "CSS3", percentage: 90 },
		{ name: "JavaScript", percentage: 92 },
		{ name: "React", percentage: 88 },
		{ name: "Vue.js", percentage: 85 },
		{ name: "Tailwind CSS", percentage: 90 },
	];

	const backendSkills = [
		{ name: "Node.js", percentage: 85 },
		{ name: "Express", percentage: 88 },
		{ name: "MongoDB", percentage: 82 },
		{ name: "PostgreSQL", percentage: 80 },
		{ name: "Firebase", percentage: 85 },
		{ name: "GraphQL", percentage: 78 },
	];

	const otherSkills = [
		{ name: "Git & GitHub", percentage: 90 },
		{ name: "Docker", percentage: 75 },
		{ name: "AWS", percentage: 70 },
		{ name: "UI/UX Design", percentage: 85 },
		{ name: "Figma", percentage: 88 },
		{ name: "Responsive Design", percentage: 92 },
	];

	return (
		<section id="skills" className={styles.skills}>
			<div className="container">
				<h2 className="section-title">{strings.skills.title}</h2>
				<p className="section-subtitle">{strings.skills.subtitle}</p>

				<div className={styles.skillsContainer} ref={ref}>
					<div className={`${styles.skillsGrid} ${isVisible ? "fadeIn" : ""}`}>
						<Card
							className={`${styles.skillCard} ${
								isVisible ? "fadeInUp delay-1" : ""
							}`}
						>
							<div className={styles.skillCardHeader}>
								<div className={styles.skillCardIcon}>
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
										<path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path>
										<polyline points="10 17 15 12 10 7"></polyline>
									</svg>
								</div>
								<h3 className={styles.skillCardTitle}>
									{strings.skills.frontend}
								</h3>
							</div>
							<div className={styles.skillsList}>
								{frontendSkills.map((skill, index) => (
									<SkillItem
										key={index}
										name={skill.name}
										percentage={skill.percentage}
										delay={index * 0.1}
										isVisible={isVisible}
									/>
								))}
							</div>
						</Card>

						<Card
							className={`${styles.skillCard} ${
								isVisible ? "fadeInUp delay-2" : ""
							}`}
						>
							<div className={styles.skillCardHeader}>
								<div className={styles.skillCardIcon}>
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
										<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
										<line x1="8" y1="16" x2="8.01" y2="16"></line>
										<line x1="8" y1="20" x2="8.01" y2="20"></line>
										<line x1="12" y1="18" x2="12.01" y2="18"></line>
										<line x1="12" y1="22" x2="12.01" y2="22"></line>
										<line x1="16" y1="16" x2="16.01" y2="16"></line>
										<line x1="16" y1="20" x2="16.01" y2="20"></line>
									</svg>
								</div>
								<h3 className={styles.skillCardTitle}>
									{strings.skills.backend}
								</h3>
							</div>
							<div className={styles.skillsList}>
								{backendSkills.map((skill, index) => (
									<SkillItem
										key={index}
										name={skill.name}
										percentage={skill.percentage}
										delay={index * 0.1}
										isVisible={isVisible}
									/>
								))}
							</div>
						</Card>

						<Card
							className={`${styles.skillCard} ${
								isVisible ? "fadeInUp delay-3" : ""
							}`}
						>
							<div className={styles.skillCardHeader}>
								<div className={styles.skillCardIcon}>
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
										<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
									</svg>
								</div>
								<h3 className={styles.skillCardTitle}>
									{strings.skills.otherSkills}
								</h3>
							</div>
							<div className={styles.skillsList}>
								{otherSkills.map((skill, index) => (
									<SkillItem
										key={index}
										name={skill.name}
										percentage={skill.percentage}
										delay={index * 0.1}
										isVisible={isVisible}
									/>
								))}
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
