import convert from 'color-convert';
import flatten from 'lodash/flatten';
import { colorStringToArray, stringArrayToNumericArray } from './helpers';
import { 
	isRgbArray, 
	isHslArray, 
	isHexString, 
	isRgbString,
	isHslString,
	isColorNameString,
} from './checks';

export default function convertToRGB(gradients, transitionType) {
	const rgbArray = gradients.map(gradient => {
		return gradient.map(color => {
			// hex string
			if (isHexString(color)) return convert.hex.rgb(color.substring(1));
			// rgb string
			if (isRgbString(color)) return colorStringToArray(color);
			// hsl string
			if (isHslString(color)) return convert.hsl.rgb(colorStringToArray(color));
			// named color string
			if (isColorNameString(color)) return convert.keyword.rgb(color);
			// hsl array
			if (isHslArray(color)) return convert.hsl.rgb(stringArrayToNumericArray(color));
			// already an rgb array
			if (isRgbArray(color)) return color;
		});
	});

	// parallel transition array
	if (transitionType === 'parallel') return rgbArray;
	
	// sequential transition array
	return flatten(rgbArray);
};