import React from 'react';
import convertToRGB from '../utils/convertToRGB';
import calculateProperties from '../utils/calculateProperties';
import generateCycleConstants from '../utils/generateCycleConstants';
import matchProperties from '../utils/matchProperties';

export default class Gradient extends React.Component {
	constructor(props) {
		super(props);
		
		// the css properties being passed into the component styles
		this.properties = {};

		// supported props
		this.rgbGradients = convertToRGB(props.gradients, this.transitionType);
		this.angle = this.gradientType === 'radial' ? '' : props.angle || '';
		this.transitionType = props.transitionType || 'parallel';
		this.gradientType = props.gradientType || 'linear';
		this.property = matchProperties(props.property);
		this.duration = props.duration || 4000;
		this.element = props.element || 'div';
		
		// other variables
		this.cycleConstants = generateCycleConstants(this.rgbGradients, this.transitionType);	
		this.lastCycle = this.rgbGradients.length - 1;
		this.animationId = undefined;
		this.unmounted = false;
		
		// methods
		this.animate = this.animate.bind(this);
		
		// state
		this.state = {
			sourceGradient: this.rgbGradients[0],
			rightDelta: undefined,
			leftDelta: undefined,
			currentCycle: 0,
			counter: 0,
		};
	}
	
	componentDidMount() {
		window.requestAnimationFrame(this.animate);
	}

	componentWillUnmount() {
		this.unmounted = true;
		window.cancelAnimationFrame(this.animationId);
	}
	
	animate() {
		if (this.unmounted) return;

		const { 
			sourceGradient,
			currentCycle,
			rightDelta,
			leftDelta,
			counter, 
		} = this.state;
		
		this.properties = calculateProperties({
			gradientType: this.gradientType,
			duration: this.duration,
			property: this.property,
			angle: this.angle,
			sourceGradient,
			rightDelta,
			leftDelta,
			counter,
		});

		const increment = this.transitionType === 'parallel' ? 16 : 34;
		const updatedCounter = counter >= this.duration ? 0 : counter + increment;
		const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;

		if (updatedCounter === 0) {
			this.setState({
				...this.cycleConstants[updatedCycle],
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
			children, 
			className = '',
		} = this.props;

		return React.createElement(
			this.element,
			{	
				className: `react-gradient ${className}`,
				style: this.properties
			},
			children
		);
	};
};