import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "../../../context/LanguageContext";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
	const { strings } = useLanguage();
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const [activeFilter, setActiveFilter] = useState("all");
	const [selectedProject, setSelectedProject] = useState(null);
	const [visibleProjects, setVisibleProjects] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const projects = [
		{
			id: 1,
			title: "mojDnevnik",
			category: "web",
			image: "/mojDnevnik.png",
			technologies: ["React", ".NET", "MongoDB"],
			description:
				"A fullstack School Management System with features like attendance tracking, grade management, and parent-teacher communication.",
			link: "https://mojdnevnik.com.alamelschools.ba/",
			github: "https://github.com/emirkugic/al-amel-ednevnik",
		},
		{
			id: 2,
			title: "Mobile Banking App",
			category: "web",
			image: "/image1.png",
			technologies: ["React Native", "Firebase", "Redux"],
			description:
				"A mobile banking application with secure transaction features, account management, and real-time notifications.",
			link: "#",
			github: "#",
		},
		{
			id: 3,
			title: "Portfolio Website",
			category: "web",
			image: "/image1.png",
			technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
			description:
				"A creative portfolio website with smooth animations and responsive design for a photography client.",
			link: "#",
			github: "#",
		},
		{
			id: 4,
			title: "Task Management System",
			category: "web",
			image: "/image1.png",
			technologies: ["Vue.js", "Vuex", "Node.js", "PostgreSQL"],
			description:
				"A comprehensive task management system with team collaboration features, deadline tracking, and performance analytics.",
			link: "#",
			github: "#",
		},
		{
			id: 5,
			title: "Fitness Tracking App",
			category: "mobile",
			image: "/image1.png",
			technologies: ["Flutter", "Firebase", "Google Fit API"],
			description:
				"A fitness tracking mobile application that helps users monitor their workouts, nutrition, and progress over time.",
			link: "#",
			github: "#",
		},
		{
			id: 6,
			title: "Restaurant Booking System",
			category: "ui",
			image: "/image1.png",
			technologies: ["Figma", "Adobe XD", "Illustrator"],
			description:
				"A UI/UX design project for a restaurant booking system with an intuitive user interface and seamless booking experience.",
			link: "#",
			github: "#",
		},
	];

	useEffect(() => {
		if (activeFilter === "all") {
			setVisibleProjects(projects);
		} else {
			setVisibleProjects(
				projects.filter((project) => project.category === activeFilter)
			);
		}
	}, [activeFilter]);

	const handleFilterClick = (filter) => {
		setActiveFilter(filter);
	};

	const openProjectModal = (project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const closeProjectModal = () => {
		setIsModalOpen(false);
		setTimeout(() => setSelectedProject(null), 300);
	};

	return (
		<section id="portfolio" className={styles.portfolio}>
			<div className="container">
				<h2 className="section-title">{strings.portfolio.title}</h2>
				<p className="section-subtitle">{strings.portfolio.subtitle}</p>

				<div className={styles.portfolioFilters}>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "all" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("all")}
					>
						{strings.portfolio.filters.all}
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "web" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("web")}
					>
						{strings.portfolio.filters.web}
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "mobile" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("mobile")}
					>
						{strings.portfolio.filters.mobile}
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "ui" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("ui")}
					>
						{strings.portfolio.filters.ui}
					</button>
				</div>

				<div className={styles.portfolioGrid} ref={ref}>
					{visibleProjects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							onClick={() => openProjectModal(project)}
							isVisible={isVisible}
							delay={index * 0.1}
						/>
					))}
				</div>

				{selectedProject && (
					<ProjectModal
						project={selectedProject}
						isOpen={isModalOpen}
						onClose={closeProjectModal}
					/>
				)}
			</div>
		</section>
	);
};

export default Portfolio;
