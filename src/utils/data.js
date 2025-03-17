// Site data
export const siteData = {
	name: "Emir Kugić",
	title: "Full-Stack Developer",
	email: "hello@example.com",
	phone: "+1 (234) 567-890",
	location: "San Francisco, CA",
	socials: {
		github: "https://github.com",
		linkedin: "https://linkedin.com",
		twitter: "https://twitter.com",
		dribbble: "https://dribbble.com",
	},
};

// Skills data
export const skillsData = {
	frontend: [
		{ name: "HTML5", percentage: 95 },
		{ name: "CSS3", percentage: 90 },
		{ name: "JavaScript", percentage: 92 },
		{ name: "React", percentage: 88 },
		{ name: "Vue.js", percentage: 85 },
		{ name: "Tailwind CSS", percentage: 90 },
	],
	backend: [
		{ name: "Node.js", percentage: 85 },
		{ name: "Express", percentage: 88 },
		{ name: "MongoDB", percentage: 82 },
		{ name: "PostgreSQL", percentage: 80 },
		{ name: "Firebase", percentage: 85 },
		{ name: "GraphQL", percentage: 78 },
	],
	other: [
		{ name: "Git & GitHub", percentage: 90 },
		{ name: "Docker", percentage: 75 },
		{ name: "AWS", percentage: 70 },
		{ name: "UI/UX Design", percentage: 85 },
		{ name: "Figma", percentage: 88 },
		{ name: "Responsive Design", percentage: 92 },
	],
};

// Portfolio projects data
export const projectsData = [
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

// Services data
export const servicesData = [
	{
		id: 1,
		title: "Web Development",
		description:
			"Custom website development tailored to your business needs, including e-commerce, corporate sites, and web applications.",
		icon: "monitor",
	},
	{
		id: 2,
		title: "Mobile App Development",
		description:
			"Native and cross-platform mobile applications for iOS and Android that provide a seamless user experience.",
		icon: "smartphone",
	},
	{
		id: 3,
		title: "UI/UX Design",
		description:
			"User-centric design that focuses on creating intuitive, engaging, and accessible digital experiences.",
		icon: "pen-tool",
	},
	{
		id: 4,
		title: "E-commerce Solutions",
		description:
			"Complete e-commerce solutions including shopping carts, payment gateways, inventory management, and customer portals.",
		icon: "shopping-cart",
	},
	{
		id: 5,
		title: "API Development",
		description:
			"Robust and scalable API solutions for seamless integration between your applications and third-party services.",
		icon: "code",
	},
	{
		id: 6,
		title: "Technical Consulting",
		description:
			"Expert advice on technology stack, architecture, and best practices to help you make informed decisions.",
		icon: "book-open",
	},
];

// Testimonials data
export const testimonialsData = [
	{
		id: 1,
		name: "Jane Smith",
		role: "CEO, TechStart",
		avatar: "/image1.png",
		testimonial:
			"Working with John was a fantastic experience. He delivered our website ahead of schedule and exceeded our expectations in terms of design and functionality.",
		rating: 5,
	},
	{
		id: 2,
		name: "Michael Johnson",
		role: "Marketing Director, DigitalBrand",
		avatar: "/image1.png",
		testimonial:
			"Johns attention to detail and ability to translate our ideas into a beautiful, functional website was impressive. Hes a true professional.",
		rating: 5,
	},
	{
		id: 3,
		name: "Sarah Williams",
		role: "Founder, FitLife",
		avatar: "/image1.png",
		testimonial:
			"Our mobile app developed by John has received rave reviews from our users. His technical skills and problem-solving abilities are top-notch.",
		rating: 5,
	},
];
