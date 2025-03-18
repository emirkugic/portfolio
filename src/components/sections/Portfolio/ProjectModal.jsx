import React from "react";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Portfolio.module.css";

const ProjectModal = ({ project, isOpen, onClose }) => {
	const { strings, language } = useLanguage();

	if (!project) return null;

	const description =
		project.descriptions?.[language] || project.descriptions?.en || "";

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={project.title} size="large">
			<div className={styles.projectModalContent}>
				<div className={styles.projectModalImage}>
					<img src={project.image} alt={project.title} />
				</div>

				<div className={styles.projectModalInfo}>
					<div className={styles.projectModalSection}>
						<h4 className={styles.projectModalSectionTitle}>
							{strings.portfolio.projectDetails.description}
						</h4>
						<p className={styles.projectModalDescription}>{description}</p>
					</div>

					<div className={styles.projectModalSection}>
						<h4 className={styles.projectModalSectionTitle}>
							{strings.portfolio.projectDetails.technologies}
						</h4>
						<div className={styles.projectModalTechnologies}>
							{project.technologies.map((tech, index) => (
								<span key={index} className={styles.projectModalTechnology}>
									{tech}
								</span>
							))}
						</div>
					</div>

					<div className={styles.projectModalActions}>
						<Button
							href={project.link}
							variant="primary"
							target="_blank"
							rel="noopener noreferrer"
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
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
									<polyline points="15 3 21 3 21 9"></polyline>
									<line x1="10" y1="14" x2="21" y2="3"></line>
								</svg>
							}
						>
							{strings.portfolio.projectDetails.liveDemo}
						</Button>

						<Button
							href={project.github}
							variant="secondary"
							target="_blank"
							rel="noopener noreferrer"
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
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
								</svg>
							}
						>
							{strings.portfolio.projectDetails.viewCode}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProjectModal;
