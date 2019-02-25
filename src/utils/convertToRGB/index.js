import flatten from 'lodash/flatten';
import hexToRGB from './hexToRGB';
import rgbStringToRGB from './rgbStringToRGB';
import isRGBArray from './isRGBArray';

export default function convertToRGB(gradients, transitionType) {
	const rgbArray = gradients.map(gradient => {
		return gradient.map(color => {
			// if the color is already an rgb value array
			if (Array.isArray(color) && isRGBArray(color)) return color;
			// if the color is a hex
			if (color.startsWith('#')) return hexToRGB(color);
			// if the color is an rgb (string)
			if (color.startsWith('rgb(')) return rgbStringToRGB(color);
		});
	});

	// parallel transition array
	if (transitionType === 'parallel') return rgbArray;
	
	// sequential transition array
	return flatten(rgbArray);
};