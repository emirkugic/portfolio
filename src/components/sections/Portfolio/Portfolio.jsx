import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
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
			title: "E-commerce Website",
			category: "web",
			image: "/image1.png",
			technologies: ["React", "Node.js", "MongoDB", "Express"],
			description:
				"A fully functional e-commerce platform with payment integration, user authentication, and admin dashboard.",
			link: "#",
			github: "#",
		},
		{
			id: 2,
			title: "Mobile Banking App",
			category: "mobile",
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
				<h2 className="section-title">My Portfolio</h2>
				<p className="section-subtitle">
					Check out some of my latest projects and work samples
				</p>

				<div className={styles.portfolioFilters}>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "all" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("all")}
					>
						All
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "web" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("web")}
					>
						Web Development
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "mobile" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("mobile")}
					>
						Mobile Apps
					</button>
					<button
						className={`${styles.filterButton} ${
							activeFilter === "ui" ? styles.active : ""
						}`}
						onClick={() => handleFilterClick("ui")}
					>
						UI/UX Design
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
