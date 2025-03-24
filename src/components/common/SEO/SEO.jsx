// src/components/common/SEO/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
	title,
	description,
	image,
	url,
	type = "website",
	twitterCardType = "summary_large_image",
}) => {
	// Default values
	const defaultTitle = "Emir Kugić | Full-Stack Developer";
	const defaultDescription =
		"Pravim prelijepe web stranice i aplikacije koje pomažu poslovanju da raste i napreduje u digitalnom svijetu.";
	const defaultImage = "/main_image.png";
	const defaultUrl = "https://araneum.ba/";

	// Use provided values or defaults
	const seoTitle = title || defaultTitle;
	const seoDescription = description || defaultDescription;
	const seoImage = image || defaultImage;
	const seoUrl = url || defaultUrl;

	return (
		<Helmet>
			{/* Standard meta tags */}
			<title>{seoTitle}</title>
			<meta name="description" content={seoDescription} />

			{/* Open Graph meta tags (Facebook, LinkedIn, etc.) */}
			<meta property="og:type" content={type} />
			<meta property="og:title" content={seoTitle} />
			<meta property="og:description" content={seoDescription} />
			<meta property="og:image" content={`${defaultUrl}${seoImage}`} />
			<meta property="og:url" content={seoUrl} />
			<meta property="og:site_name" content="Emir Kugić Portfolio" />

			{/* Twitter Card meta tags */}
			{/* <meta name="twitter:card" content={twitterCardType} />
			<meta name="twitter:title" content={seoTitle} />
			<meta name="twitter:description" content={seoDescription} />
			<meta name="twitter:image" content={`${defaultUrl}${seoImage}`} /> */}
			{/* Optional: Add your Twitter handle if you have one */}
			{/* <meta name="twitter:creator" content="@yourhandle" /> */}
		</Helmet>
	);
};

export default SEO;
