export default function rgbStringToRGB(color) {
	const openParen = color.indexOf('(') + 1;
	const closeParen = color.indexOf(')');
	const numericString = color.substring(openParen, closeParen);
	
	return numericString.split(',').map(num => +num);
};