import hexToRGB from './hexToRGB';
import rgbStringToRGB from './rgbStringToRGB';
import isRGBArray from './isRGBArray';

export default function convertToRGB(gradients) {
	const rgbArray = gradients.map(gradient => {
		return gradient.map(color => {
			// if the color is already an rgb value array
			if (Array.isArray(color) && isRGBArray(color)) return color;
			// if the color is a 6-digit hex
			if (color.charAt(0) === '#' && color.length === 7) return hexToRGB(color);
			// if the color is an rgb (string)
			if (color.startsWith('rgb(')) return rgbStringToRGB(color);
		});
	});
	
	return rgbArray;
};