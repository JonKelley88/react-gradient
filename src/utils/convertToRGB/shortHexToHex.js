export default function shortHexToHex(hex) { 
	return hex.split('').map(char => char.repeat(2)).join(''); 
};