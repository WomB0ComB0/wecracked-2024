export const Slugify = (text: string) => {
	return text
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
};


export const ScrollIntoCenterView = (href: string) => {
	const element = document.querySelector(href);
	if (element) {
		const elementRect = element.getBoundingClientRect();
		const absoluteElementTop = elementRect.top + window.scrollY;
		const middle =
			absoluteElementTop + Math.floor(elementRect.height / 2) - Math.floor(window.innerHeight / 2);
		window.scrollTo({
			top: middle,
			behavior: 'smooth',
		});
	}
};