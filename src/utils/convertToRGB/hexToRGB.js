export default function hexToRGB(color) {
	const numericString = color.substring(1);
	
	return [
		// parse the R value
		parseInt(numericString.substring(0, 2), 16),
		// parse the G value
		parseInt(numericString.substring(2, 4), 16),
		// parse the B value
		parseInt(numericString.substring(4), 16)
	];
};