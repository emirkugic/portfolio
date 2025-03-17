import React from "react";
import Hero from "../components/sections/Hero/Hero";
import About from "../components/sections/About/About";
import Skills from "../components/sections/Skills/Skills";
import Portfolio from "../components/sections/Portfolio/Portfolio";
import Services from "../components/sections/Services/Services";
import Contact from "../components/sections/Contact/Contact";

const Home = () => {
	return (
		<>
			<Hero />
			<About />
			<Skills />
			<Portfolio />
			<Services />
			<Contact />
		</>
	);
};

export default Home;
