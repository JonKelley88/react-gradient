export default function generateCycleConstants(gradients, transitionType) {
	const lastCycle = gradients.length - 1;
	console.log(gradients);

	// parallel cycle constants
	if (transitionType === 'parallel') return gradients.map((gradient, idx) => {
		const sourceGradient = gradients[idx];
		const targetGradient = idx === lastCycle ? gradients[0] : gradients[idx + 1];
		const leftDelta = sourceGradient[0].map((num, idx) => num - targetGradient[0][idx]);
		const rightDelta = sourceGradient[1].map((num, idx) => num - targetGradient[1][idx]);

		return {
			sourceGradient,
			leftDelta,
			rightDelta		
		};
	});

	// sequential cycle constants
	return gradients.map((gradient, idx) => {
		const leftSource = gradients[idx];
		const rightSource = idx === lastCycle ? gradients[0] : gradients[idx + 1];
		const leftTarget = idx === lastCycle ? gradients[0] : gradients[idx + 1];
		const rightTarget = undefined;

		const sourceGradient = [leftSource, rightSource];
		const targetGradient = [leftTarget, rightTarget];

		console.log(sourceGradient);

		return {
			sourceGradient,
			leftDelta,
			rightDelta		
		};
	});
};