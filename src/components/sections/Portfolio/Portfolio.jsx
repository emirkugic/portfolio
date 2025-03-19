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
			title: "mojDnevnik",
			category: "web",
			image: "/mojDnevnik.png",
			technologies: ["React", ".NET", "MongoDB", "cPanel"],
			descriptions: {
				en: "A fully functional School Management System with many roles, permissions, and features for teachers, students, and parents.",
				bs: "Potpuno funkcionalni sistem za upravljanje školom s mnogo uloga, dozvola i značajki za nastavnike, učenike i roditelje.",
			},
			link: "https://mojdnevnik.com.alamelschools.ba/",
			github: "https://github.com/emirkugic/al-amel-ednevnik",
		},
		{
			id: 2,
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
			id: 3,
			title: "Glasnik",
			category: "web",
			image: "/news.png",
			technologies: ["ReactJS"],
			descriptions: {
				en: "A news website with a modern design, real-time updates, and a user-friendly interface for reading and sharing news articles.",
				bs: "Web stranica s vijestima s modernim dizajnom, ažuriranjima u stvarnom vremenu i korisničkim sučeljem za čitanje i dijeljenje članaka.",
			},
			link: "/projects/news",
			github: "#",
		},
		{
			id: 4,
			title: "Portfolio Website",
			category: "web",
			image: "/portfolio.png",
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
			title: "MetalPrec",
			category: "web",
			image: "/metalprec.png",
			technologies: ["React JS"],
			descriptions: {
				en: "A CNC machine business website with a product catalog, pricing, and contact form for customers to request quotes.",
				bs: "Web stranica za firmu s CNC mašinama s katalogom proizvoda, cijenama i kontakt obrascem za korisnike koji žele zatražiti ponudu.",
			},
			link: "projects/metalprec",
			github: "#",
		},
		{
			id: 6,
			title: "Barber Reservation System",
			category: "web",
			image: "/news.png",
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
