import React, { useEffect, useRef } from "react";
import styles from "./Skills.module.css";

const SkillItem = ({ name, percentage, delay = 0, isVisible }) => {
	const progressRef = useRef(null);

	useEffect(() => {
		if (isVisible && progressRef.current) {
			setTimeout(() => {
				progressRef.current.style.width = `${percentage}%`;
			}, delay * 1000);
		}
	}, [isVisible, percentage, delay]);

	return (
		<div className={styles.skillItem}>
			<div className={styles.skillHeader}>
				<h4 className={styles.skillName}>{name}</h4>
				<span className={styles.skillPercentage}>{percentage}%</span>
			</div>
			<div className={styles.skillBar}>
				<div
					ref={progressRef}
					className={styles.skillProgress}
					style={{ width: "0%" }}
				></div>
			</div>
		</div>
	);
};

export default SkillItem;
