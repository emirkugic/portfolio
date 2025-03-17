import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import Button from "../../common/Button/Button";
import styles from "./Contact.module.css";

const Contact = () => {
	const { strings } = useLanguage();
	const [ref, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [formErrors, setFormErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Clear error for this field when user starts typing
		if (formErrors[name]) {
			setFormErrors({
				...formErrors,
				[name]: null,
			});
		}
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			errors.email = "Email is required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
		) {
			errors.email = "Invalid email address";
		}

		if (!formData.subject.trim()) {
			errors.subject = "Subject is required";
		}

		if (!formData.message.trim()) {
			errors.message = "Message is required";
		}

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = validateForm();

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitMessage({
				type: "success",
				text: strings.contact.form.success,
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});

			// Clear success message after 5 seconds
			setTimeout(() => {
				setSubmitMessage(null);
			}, 5000);
		}, 1500);
	};

	const contactInfo = [
		{
			title: strings.contact.info.email,
			value: "emirkugic0@gmail.com",
			icon: (
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
					<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
					<polyline points="22,6 12,13 2,6"></polyline>
				</svg>
			),
		},
		{
			title: strings.contact.info.phone,
			value: "+387 62 909 200",
			icon: (
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
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
				</svg>
			),
		},
		{
			title: strings.contact.info.location,
			value: "Sarajevo, Bosnia",
			icon: (
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
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
					<circle cx="12" cy="10" r="3"></circle>
				</svg>
			),
		},
	];

	return (
		<section id="contact" className={styles.contact}>
			<div className="container">
				<h2 className="section-title">{strings.contact.title}</h2>
				<p className="section-subtitle">{strings.contact.subtitle}</p>

				<div className={styles.contactContainer} ref={ref}>
					<div
						className={`${styles.contactInfo} ${isVisible ? "fadeInLeft" : ""}`}
					>
						<div className={styles.contactInfoContent}>
							<h3 className={styles.contactInfoTitle}>
								{strings.contact.info.title}
							</h3>
							<p className={styles.contactInfoText}>
								{strings.contact.info.text}
							</p>

							<ul className={styles.contactInfoList}>
								{contactInfo.map((info, index) => (
									<li key={index} className={styles.contactInfoItem}>
										<div className={styles.contactInfoIcon}>{info.icon}</div>
										<div className={styles.contactInfoDetails}>
											<h4 className={styles.contactInfoItemTitle}>
												{info.title}
											</h4>
											<p className={styles.contactInfoItemValue}>
												{info.value}
											</p>
										</div>
									</li>
								))}
							</ul>

							<div className={styles.contactSocial}>
								<h4 className={styles.contactSocialTitle}>
									{strings.contact.info.followMe}
								</h4>
								<div className={styles.contactSocialLinks}>
									<a
										href="#"
										className={styles.contactSocialLink}
										aria-label="GitHub"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
										</svg>
									</a>
									<a
										href="#"
										className={styles.contactSocialLink}
										aria-label="LinkedIn"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
											<rect x="2" y="9" width="4" height="12"></rect>
											<circle cx="4" cy="4" r="2"></circle>
										</svg>
									</a>
									<a
										href="#"
										className={styles.contactSocialLink}
										aria-label="Twitter"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
										</svg>
									</a>
									<a
										href="#"
										className={styles.contactSocialLink}
										aria-label="Dribbble"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
										</svg>
									</a>
								</div>
							</div>
						</div>

						<div className={styles.contactDecoration}></div>
					</div>

					<div
						className={`${styles.contactForm} ${
							isVisible ? "fadeInRight" : ""
						}`}
					>
						<form onSubmit={handleSubmit}>
							<div className={styles.formGrid}>
								<div className={styles.formGroup}>
									<label htmlFor="name" className={styles.formLabel}>
										{strings.contact.form.name}{" "}
										<span className={styles.required}>*</span>
									</label>
									<input
										type="text"
										id="name"
										name="name"
										className={`${styles.formControl} ${
											formErrors.name ? styles.error : ""
										}`}
										value={formData.name}
										onChange={handleChange}
										placeholder="John Doe"
									/>
									{formErrors.name && (
										<div className={styles.formError}>{formErrors.name}</div>
									)}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="email" className={styles.formLabel}>
										{strings.contact.form.email}{" "}
										<span className={styles.required}>*</span>
									</label>
									<input
										type="email"
										id="email"
										name="email"
										className={`${styles.formControl} ${
											formErrors.email ? styles.error : ""
										}`}
										value={formData.email}
										onChange={handleChange}
										placeholder="john@example.com"
									/>
									{formErrors.email && (
										<div className={styles.formError}>{formErrors.email}</div>
									)}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="subject" className={styles.formLabel}>
										{strings.contact.form.subject}{" "}
										<span className={styles.required}>*</span>
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										className={`${styles.formControl} ${
											formErrors.subject ? styles.error : ""
										}`}
										value={formData.subject}
										onChange={handleChange}
										placeholder="Project Inquiry"
									/>
									{formErrors.subject && (
										<div className={styles.formError}>{formErrors.subject}</div>
									)}
								</div>

								<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
									<label htmlFor="message" className={styles.formLabel}>
										{strings.contact.form.message}{" "}
										<span className={styles.required}>*</span>
									</label>
									<textarea
										id="message"
										name="message"
										rows="5"
										className={`${styles.formControl} ${
											formErrors.message ? styles.error : ""
										}`}
										value={formData.message}
										onChange={handleChange}
										placeholder="Tell me about your project..."
									></textarea>
									{formErrors.message && (
										<div className={styles.formError}>{formErrors.message}</div>
									)}
								</div>

								<div className={`${styles.formGroup} ${styles.formGroupFull}`}>
									<Button
										type="submit"
										variant="primary"
										size="large"
										fullWidth
										disabled={isSubmitting}
										icon={
											isSubmitting ? (
												<svg
													className={styles.spinner}
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle
														cx="12"
														cy="12"
														r="10"
														fill="none"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														fill="none"
														stroke="white"
														strokeWidth="4"
														d="M 12 2 A 10 10 0 0 1 22 12"
													></path>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<line x1="22" y1="2" x2="11" y2="13"></line>
													<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
												</svg>
											)
										}
									>
										{isSubmitting
											? strings.contact.form.sending
											: strings.contact.form.send}
									</Button>
								</div>
							</div>

							{submitMessage && (
								<div
									className={`${styles.formMessage} ${
										styles[submitMessage.type]
									}`}
								>
									{submitMessage.text}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
