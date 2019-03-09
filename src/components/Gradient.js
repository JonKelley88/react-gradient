import React, { Component } from 'react';
import generateCycleConstants from '../utils/generateCycleConstants';
import calculateGradient from '../utils/calculateGradient';
import matchProperties from '../utils/matchProperties';
import convertToRGB from '../utils/convertToRGB';

export default class Gradient extends Component {
	constructor(props) {
		super(props);

		// supported props
		this.transitionType = props.transitionType || 'parallel';
		this.rgbGradients = convertToRGB(props.gradients, this.transitionType);
		this.gradientType = props.gradientType || 'linear';
		this.angle = this.gradientType === 'radial' ? '' : `${props.angle || '0deg'}, `;
		this.property = matchProperties(props.property || 'background');
		this.duration = props.duration || 5000;
		this.element = props.element || 'div';

		// the css property being passed into the component styles
		this.style = { [this.property]: '' };
		
		// other variables
		this.cycleConstants = generateCycleConstants(this.rgbGradients, this.transitionType);	
		this.lastCycle = this.rgbGradients.length - 1;
		this.isText = props.property === 'text';
		this.animationId = undefined;
		this.mounted = false;
		
		// methods
		this.animate = this.animate.bind(this);
		
		// state
		this.state = {
			currentCycle: 0,
			counter: 0,
		};
	}
	
	componentDidMount() {
		this.mounted = true;
		this.animate();
	}

	componentWillUnmount() {
		this.mounted = false;
		window.cancelAnimationFrame(this.animationId);
	}
	
	animate() {
		if (!this.mounted) return;

		const { currentCycle, counter } = this.state;

		const { 
			sourceGradient,
			leftDelta,
			rightDelta,
		} = this.cycleConstants[currentCycle];

		this.style[this.property] = calculateGradient({
			gradientType: this.gradientType,
			duration: this.duration,
			property: this.property,
			angle: this.angle,
			sourceGradient,
			rightDelta,
			leftDelta,
			counter,
		});

		if (this.isText) {
			this.style.WebkitBackgroundClip = 'text';
			this.style.WebkitTextFillColor = 'transparent';
		}

		const updatedCounter = counter >= this.duration ? 0 : counter + 16;
		const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;

		if (updatedCounter === 0) {
			this.setState({
				currentCycle: updatedCycle,
				counter: updatedCounter,
			});
		} else {
			this.setState({
				counter: updatedCounter
			});
		}
		
		this.animationId = window.requestAnimationFrame(this.animate);
	}
	
	render() {
		const { 
			transitionType,
			className = '',
			gradientType,
			style = {},
			gradients,
			children, 
			duration,
			property,
			element,
			angle,

			...rest
		} = this.props;

		return React.createElement(
			this.element,
			{	
				...rest,
				className: `react-gradient ${className}`,
				style: { 
					...style,
					...this.style 
				}
			},
			children
		);
	};
};