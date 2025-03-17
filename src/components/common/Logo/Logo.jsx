import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
	return (
		<a href="#home" className={styles.logo}>
			<div className={styles.logoIcon}>
				<span className={styles.bracket}>&lt;</span>
				<span className={styles.letter}>EK</span>
				<span className={styles.bracket}>/&gt;</span>
			</div>
			<div className={styles.logoText}>Emir Kugić</div>
		</a>
	);
};

export default Logo;
