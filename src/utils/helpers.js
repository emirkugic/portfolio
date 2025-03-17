/**
 * Format a phone number string
 * @param {string} phoneNumberString - The phone number to format
 * @returns {string} The formatted phone number
 */
export const formatPhoneNumber = (phoneNumberString) => {
	const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
	const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

	if (match) {
		const intlCode = match[1] ? "+1 " : "";
		return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
	}

	return phoneNumberString;
};

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} num - The maximum length
 * @returns {string} The truncated string
 */
export const truncateString = (str, num) => {
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num) + "...";
};

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeWords = (str) => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

/**
 * Get a random item from an array
 * @param {Array} array - The array to get a random item from
 * @returns {*} A random item from the array
 */
export const getRandomItem = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};

/**
 * Parse URL hash and return the ID without the hash symbol
 * @returns {string} The ID from the URL hash
 */
export const getHashID = () => {
	return window.location.hash.substring(1);
};

/**
 * Scroll to an element by ID with smooth scrolling
 * @param {string} id - The ID of the element to scroll to
 */
export const scrollToElement = (id) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
};

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - An optional offset
 * @returns {boolean} Whether the element is in the viewport
 */
export const isElementInViewport = (element, offset = 0) => {
	const rect = element.getBoundingClientRect();
	return rect.top <= window.innerHeight + offset && rect.bottom >= -offset;
};

/**
 * Debounce a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce time in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Throttle a function
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle time in milliseconds
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit) => {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};
