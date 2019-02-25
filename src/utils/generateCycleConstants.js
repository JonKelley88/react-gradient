export default function generateCycleConstants(gradients) {
	const lastCycle = gradients.length - 1;

	return gradients.map((gradient, idx, gradientArray) => {
		const sourceGradient = gradientArray[idx];
		const targetGradient = idx === lastCycle ? gradientArray[0] : gradientArray[idx + 1];
		const leftDelta = sourceGradient[0].map((num, idx) => num - targetGradient[0][idx]);
		const rightDelta = sourceGradient[1].map((num, idx) => num - targetGradient[1][idx]);

		return {
			sourceGradient,
			leftDelta,
			rightDelta		
		};
	});
};