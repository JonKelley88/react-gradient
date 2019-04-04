import React from 'react';
import { Gradient } from '../../src';

export default function Text() {
	return (
		<Gradient
			gradients={[
				['#FFFD00', '#9CA2FF'],
				['#FF47F4', '#6DFF5C'],
			]}
			property="text"
			element="h1"
			angle="30deg"
			className="text"
		>
			react-gradient
		</Gradient>
	);
};