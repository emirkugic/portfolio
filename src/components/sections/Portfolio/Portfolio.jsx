import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "../../../context/LanguageContext";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
	const { strings, language } = useLanguage();
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
			title: "Photography Portfolio",
			category: "web",
			image: "/photography.png",
			technologies: ["HTML", "CSS", "JavaScript"],
			descriptions: {
				en: "A beautiful photography portfolio showcasing nature photography with a responsive design and smooth animations.",
				bs: "Prekrasan fotografski portfolio koji prikazuje fotografije prirode s responzivnim dizajnom i glatkim animacijama.",
			},
			link: "/projects/photography",
			github: "#",
		},
		{
			id: 2,
			title: "E-commerce Website",
			category: "web",
			image: "/image1.png",
			technologies: ["React", "Node.js", "MongoDB", "Express"],
			descriptions: {
				en: "A fully functional e-commerce platform with payment integration, user authentication, and admin dashboard.",
				bs: "Potpuno funkcionalna e-commerce platforma sa integracijom plaćanja, autentikacijom korisnika i administratorskom kontrolnom pločom.",
			},
			link: "#",
			github: "#",
		},
		{
			id: 3,
			title: "Mobile Banking App",
			category: "mobile",
			image: "/image1.png",
			technologies: ["React Native", "Firebase", "Redux"],
			descriptions: {
				en: "A mobile banking application with secure transaction features, account management, and real-time notifications.",
				bs: "Mobilna bankarska aplikacija sa sigurnim funkcijama transakcija, upravljanjem računima i obavještenjima u stvarnom vremenu.",
			},
			link: "#",
			github: "#",
		},
		{
			id: 4,
			title: "Portfolio Website",
			category: "web",
			image: "/image1.png",
			technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
			descriptions: {
				en: "A creative portfolio website with smooth animations and responsive design for a photography client.",
				bs: "Kreativna portfolio web stranica s glatkim animacijama i responzivnim dizajnom za klijenta koji se bavi fotografijom.",
			},
			link: "#",
			github: "#",
		},
		{
			id: 5,
			title: "Task Management System",
			category: "web",
			image: "/image1.png",
			technologies: ["Vue.js", "Vuex", "Node.js", "PostgreSQL"],
			descriptions: {
				en: "A comprehensive task management system with team collaboration features, deadline tracking, and performance analytics.",
				bs: "Sveobuhvatni sistem za upravljanje zadacima s značajkama za timsku saradnju, praćenje rokova i analitiku performansi.",
			},
			link: "#",
			github: "#",
		},
		{
			id: 6,
			title: "Fitness Tracking App",
			category: "mobile",
			image: "/image1.png",
			technologies: ["Flutter", "Firebase", "Google Fit API"],
			descriptions: {
				en: "A fitness tracking mobile application that helps users monitor their workouts, nutrition, and progress over time.",
				bs: "Mobilna aplikacija za praćenje fitnessa koja pomaže korisnicima da prate svoje vježbe, prehranu i napredak tokom vremena.",
			},
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
							language={language}
						/>
					))}
				</div>

				{selectedProject && !selectedProject.internalRoute && (
					<ProjectModal
						project={selectedProject}
						isOpen={isModalOpen}
						onClose={closeProjectModal}
						language={language}
					/>
				)}
			</div>
		</section>
	);
};

export default Portfolio;
