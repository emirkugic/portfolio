import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Portfolio.module.css";

const ProjectCard = ({ project, onClick, isVisible, delay = 0 }) => {
	const { strings, language } = useLanguage();
	const cardRef = useRef(null);

	useEffect(() => {
		if (isVisible && cardRef.current) {
			setTimeout(() => {
				cardRef.current.classList.add("fadeInUp", "active");
			}, delay * 1000);
		}
	}, [isVisible, delay]);

	const description =
		project.descriptions?.[language] || project.descriptions?.en || "";

	// If the project has an internal route, render a Link instead of using onClick
	if (project.internalRoute) {
		return (
			<div className={`${styles.projectCardWrapper} reveal`} ref={cardRef}>
				<Link to={project.internalRoute} style={{ textDecoration: "none" }}>
					<Card
						variant="image"
						hoverable
						clickable
						className={styles.projectCard}
					>
						<div className={styles.projectImage}>
							<img src={project.image} alt={project.title} />
						</div>
						<div className={styles.projectOverlay}>
							<div className={styles.projectContent}>
								<h3 className={styles.projectTitle}>{project.title}</h3>
								<div className={styles.projectTechnologies}>
									{project.technologies.map((tech, index) => (
										<span key={index} className={styles.projectTechnology}>
											{tech}
										</span>
									))}
								</div>
								<div className={styles.projectViewDetails}>
									<span>{strings.portfolio.viewDetails}</span>
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
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
										<polyline points="15 3 21 3 21 9"></polyline>
										<line x1="10" y1="14" x2="21" y2="3"></line>
									</svg>
								</div>
							</div>
						</div>
					</Card>
				</Link>
			</div>
		);
	}

	// Default behavior for external projects
	return (
		<div className={`${styles.projectCardWrapper} reveal`} ref={cardRef}>
			<Card
				variant="image"
				hoverable
				clickable
				onClick={onClick}
				className={styles.projectCard}
			>
				<div className={styles.projectImage}>
					<img src={project.image} alt={project.title} />
				</div>
				<div className={styles.projectOverlay}>
					<div className={styles.projectContent}>
						<h3 className={styles.projectTitle}>{project.title}</h3>
						<div className={styles.projectTechnologies}>
							{project.technologies.map((tech, index) => (
								<span key={index} className={styles.projectTechnology}>
									{tech}
								</span>
							))}
						</div>
						<div className={styles.projectViewDetails}>
							<span>{strings.portfolio.viewDetails}</span>
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
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								<polyline points="15 3 21 3 21 9"></polyline>
								<line x1="10" y1="14" x2="21" y2="3"></line>
							</svg>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProjectCard;
