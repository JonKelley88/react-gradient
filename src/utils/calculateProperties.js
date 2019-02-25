import memo from 'lodash/memoize';

export default memo(function calculateProperties({
	propertyList,
	counter,
	gradientType,
	duration,
	sourceGradient,
	leftDelta,
	rightDelta,
	angle
}) {
	const propertiesObject = {};
	const transitionProgress = (counter * 100 / duration).toFixed(3);

	const leftInterpolation = leftDelta.map(num => transitionProgress * num / 100);
	const rightInterpolation = rightDelta.map(num => transitionProgress * num / 100);
	const leftValues = sourceGradient[0].map((num, idx) => Math.round(num - leftInterpolation[idx]));
	const rightValues = sourceGradient[1].map((num, idx) => Math.round(num - rightInterpolation[idx]));
	
	const interpolatedValues = () => `rgb(${leftValues}), rgb(${rightValues})`;
	
	propertyList.forEach(property => {
		propertiesObject[property] = `${gradientType}-gradient(${angle && angle + ', '}${interpolatedValues()})`;
	});
	
	return propertiesObject;
});
