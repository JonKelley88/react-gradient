import memo from 'lodash/memoize';

export default memo(function calculateGradient({
	sourceGradient,
	gradientType,
	rightDelta,
	leftDelta,
	duration,
	property,
	counter,
	angle
}) {
	const transitionProgress = (counter * 100 / duration).toFixed(2);

	const leftInterpolation = leftDelta.map(num => transitionProgress * num / 100);
	const rightInterpolation = rightDelta.map(num => transitionProgress * num / 100);
	const leftValues = sourceGradient[0].map((num, idx) => Math.round(num - leftInterpolation[idx]));
	const rightValues = sourceGradient[1].map((num, idx) => Math.round(num - rightInterpolation[idx]));
	
	const interpolatedValues = `rgb(${leftValues}), rgb(${rightValues})`;

	return `${gradientType}-gradient(${angle && angle + ', '}${interpolatedValues})${property === 'borderImage' ? ' 1' : ''}`;
});
