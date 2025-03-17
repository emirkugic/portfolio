import React from "react";
import styles from "./Button.module.css";

const Button = ({
	children,
	variant = "primary",
	size = "medium",
	href,
	onClick,
	type = "button",
	fullWidth = false,
	icon,
	iconPosition = "left",
	className = "",
	...props
}) => {
	const buttonClasses = [
		styles.button,
		styles[variant],
		styles[size],
		fullWidth ? styles.fullWidth : "",
		icon ? styles.withIcon : "",
		icon && iconPosition === "right" ? styles.iconRight : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = (e) => {
		if (onClick) {
			onClick(e);
		}
	};

	const content = (
		<>
			{icon && iconPosition === "left" && (
				<span className={styles.icon}>{icon}</span>
			)}
			<span className={styles.text}>{children}</span>
			{icon && iconPosition === "right" && (
				<span className={styles.icon}>{icon}</span>
			)}
		</>
	);

	if (href) {
		return (
			<a href={href} className={buttonClasses} {...props}>
				{content}
			</a>
		);
	}

	return (
		<button
			type={type}
			className={buttonClasses}
			onClick={handleClick}
			{...props}
		>
			{content}
		</button>
	);
};

export default Button;
