import shortHexToHex from './shortHexToHex';

export default function hexToRGB(color) {
	const hexString = color.length === 7 ? 
		color.substring(1) :
		shortHexToHex(color.substring(1));
	
	return [
		// parse the R value
		parseInt(hexString.substring(0, 2), 16),
		// parse the G value
		parseInt(hexString.substring(2, 4), 16),
		// parse the B value
		parseInt(hexString.substring(4), 16)
	];
};