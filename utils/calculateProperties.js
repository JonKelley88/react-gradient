export default function calculateProperties({
	gradients, 
	propertyList,
	cycle,
	counter,
	gradientType,
	duration
}) {
	const propertiesObject = {};
	const sourceGradient = gradients[cycle];
	const targetGradient = cycle === gradients.length - 1 ? gradients[0] : gradients[cycle + 1];
	const transitionProgress = (counter * 100 / duration).toFixed(3);

	const leftDifference = sourceGradient[0].map((num, idx) => num - targetGradient[0][idx]);
	const rightDifference = sourceGradient[1].map((num, idx) => num - targetGradient[1][idx]);
	const leftInterpolation = leftDifference.map(num => transitionProgress * num / 100);
	const rightInterpolation = rightDifference.map(num => transitionProgress * num / 100);
	const leftValues = sourceGradient[0].map((num, idx) => Math.round(num - leftInterpolation[idx]));
	const rightValues = sourceGradient[1].map((num, idx) => Math.round(num - rightInterpolation[idx]));
	
	const interpolateValues = function() {
		return `rgb(${leftValues}), rgb(${rightValues})`;
	};
	
	propertyList.forEach(property => {
		propertiesObject[property] = `${gradientType}-gradient(${interpolateValues()})`;
	});
	
	return propertiesObject;
}
