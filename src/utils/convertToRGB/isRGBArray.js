export default function isRGBArray(color) {
	if (color.length !== 3) return false;
	return color.every(num => num >= 0 && num <= 255);
};