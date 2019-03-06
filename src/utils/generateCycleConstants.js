export default function generateCycleConstants(gradients, transitionType) {
	const lastCycle = gradients.length - 1;

	// parallel cycle constants
	if (transitionType === 'parallel') {
		return gradients.map((gradient, idx) => {
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
	}

	// sequential cycle constants
	return gradients.map((gradient, idx) => {
		const sourceLeft = gradients[idx];
		const sourceRight = idx === lastCycle ? gradients[0] : gradients[idx + 1];

		const targetLeft = sourceRight;
		const targetRight = idx + 1 === lastCycle ? gradients[0] :
			idx === lastCycle ? gradients[1] : 
				gradients[idx + 2];

		const sourceGradient = [sourceLeft, sourceRight];
		const targetGradient = [targetLeft, targetRight];

		const leftDelta = sourceGradient[0].map((num, idx) => num - targetGradient[0][idx]);
		const rightDelta = sourceGradient[1].map((num, idx) => num - targetGradient[1][idx]);

		return {
			sourceGradient,
			leftDelta,
			rightDelta		
		};
	});
};