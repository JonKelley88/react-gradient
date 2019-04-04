import React from 'react';
import { Gradient } from '../../src';

export default function Button() {
	return (
		<Gradient
			gradients={[
				['lime', 'coral'],
				['magenta', 'gold'],
				['violet', 'royalblue']
			]}
			property="background"
			element="button"
			angle="90deg"
			transitionType="sequential"
			duration="3000"
			className="button"
		>
			button
		</Gradient>
	);
};