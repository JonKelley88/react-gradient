const interperlationProgress = function(num) {
	return this * num / 100;
};

const interpolate = function(num, idx) {
	return Math.round(num - this[idx]);
};

export default function calculateGradient({
	sourceGradient,
	gradientType,
	rightDelta,
	leftDelta,
	duration,
	property,
	counter,
	angle
}) {
	const transitionProgress = +(counter * 100 / duration).toFixed(2);

	const leftInterpolation = leftDelta.map(interperlationProgress, transitionProgress);
	const rightInterpolation = rightDelta.map(interperlationProgress, transitionProgress);
	const leftValues = sourceGradient[0].map(interpolate, leftInterpolation);
	const rightValues = sourceGradient[1].map(interpolate, rightInterpolation);
	
	const interpolatedValues = `rgb(${leftValues}), rgb(${rightValues})`;

	return `${gradientType}-gradient(${angle}${interpolatedValues})${property === 'borderImage' ? ' 1' : ''}`;
};