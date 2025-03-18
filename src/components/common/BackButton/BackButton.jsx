import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = () => {
	return (
		<Link to="/" className={styles.backButton}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M19 12H5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 19L5 12L12 5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<span>Back to Portfolio</span>
		</Link>
	);
};

export default BackButton;
