import React from 'react';
import { Gradient } from '../../src';

export default function Pound() {
	return (
		<Gradient
			gradients={[
				['#FFFD00', '#9CA2FF'],
				['#FF47F4', '#6DFF5C'],
			]}
			property="text"
			element="span"
			angle="30deg"
			className="pound"
		>
			#
		</Gradient>
	);
};