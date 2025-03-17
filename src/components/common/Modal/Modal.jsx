import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({
	isOpen,
	onClose,
	children,
	title,
	size = "medium",
	className = "",
}) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modalClasses = [styles.modalContent, styles[size], className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={styles.modalOverlay}>
			<div className={modalClasses} ref={modalRef}>
				<div className={styles.modalHeader}>
					{title && <h3 className={styles.modalTitle}>{title}</h3>}
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
