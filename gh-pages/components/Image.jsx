import React from 'react';
import { Gradient } from '../../src';

export default function Image() {
	return (
		<Gradient
			gradients={[
				['rgb(231, 75, 255)', 'rgb(255, 243, 75)'],
				['rgb(255, 78, 167)', 'rgb(167, 255, 78)'],
				['rgb(255, 127, 63)', 'rgb(63, 197, 255)'],
				['rgb(255, 228, 74)', 'rgb(195, 74, 255)']
			]}
			property="border"
			element="img"
			src="https://i.ibb.co/Z8GdxjM/kitty.jpg"
			className="image"
		/>
	);
};