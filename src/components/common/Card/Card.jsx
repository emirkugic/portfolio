import React from "react";
import styles from "./Card.module.css";

const Card = ({
	children,
	className = "",
	variant = "default",
	hoverable = false,
	clickable = false,
	onClick,
	...props
}) => {
	const cardClasses = [
		styles.card,
		styles[variant],
		hoverable ? styles.hoverable : "",
		clickable ? styles.clickable : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = (e) => {
		if (clickable && onClick) {
			onClick(e);
		}
	};

	return (
		<div
			className={cardClasses}
			onClick={handleClick}
			role={clickable ? "button" : undefined}
			tabIndex={clickable ? 0 : undefined}
			{...props}
		>
			{children}
		</div>
	);
};

export default Card;
