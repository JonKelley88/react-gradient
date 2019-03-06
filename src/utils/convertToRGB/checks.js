import isString from 'lodash/isString';
import inRange from 'lodash/inRange';

const isRgbArray = function(color) {
	if (!Array.isArray(color) || color.length !== 3) return false;
	return color.every(num => num >= 0 && num <= 255);
};

const isHslArray = function(color) {
	const [hue, saturation, lightness] = color.map(num => num);

	if (!Array.isArray(color) || color.length !== 3) return false;
	if (!inRange(hue, 0, 360 + 1)) return false;
	if (!inRange(parseFloat(saturation), 0, 100 + 1)) return false;
	if (!inRange(parseFloat(lightness), 0, 100 + 1)) return false;
	return [saturation, lightness].every(string => isString(string) && string.includes('%'));
};

const isHexString = color => isString(color) && color.startsWith('#');
const isRgbString = color => isString(color) && color.startsWith('rgb(');
const isHslString = color => isString(color) && color.startsWith('hsl(');
const isColorNameString = color => isString(color) && !/[^a-zA-Z]/.test(color);

export {
	isRgbArray,
	isHslArray,
	isHexString,
	isRgbString,
	isHslString,
	isColorNameString,
};