const colorStringToArray = function(color) {
	const openParen = color.indexOf('(') + 1;
	const closeParen = color.indexOf(')');
	const numericString = color.substring(openParen, closeParen);
	
	return numericString.split(',').map(num => parseFloat(num));
};

const stringArrayToNumericArray = arr => arr.map(num => parseFloat(num));

export {
	colorStringToArray,
	stringArrayToNumericArray
};