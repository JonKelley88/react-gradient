import hexToRGB from './hexToRGB';
import rgbStringToRGB from './rgbStringToRGB';

export default function convertToRGB(gradients) {
	const rgbArray = gradients.map(gradient => {
		return gradient.map(color => {
			// if the color is a 6-digit hex
			if (color.charAt(0) === '#' && color.length === 7) return hexToRGB(color);
			// if the color is already rgb (string)
			if (color.startsWith('rgb(')) return rgbStringToRGB(color);
		});
	});
	
	return rgbArray;
};