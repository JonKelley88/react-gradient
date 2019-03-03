import React from 'react';
import generateCycleConstants from '../utils/generateCycleConstants';
import calculateGradient from '../utils/calculateGradient';
import matchProperties from '../utils/matchProperties';
import convertToRGB from '../utils/convertToRGB';

export default class Gradient extends React.Component {
	constructor(props) {
		super(props);
		
		// the css property being passed into the component styles
		this.style = {};

		// supported props
		this.transitionType = props.transitionType || 'parallel';
		this.rgbGradients = convertToRGB(props.gradients, this.transitionType);
		this.gradientType = props.gradientType || 'linear';
		this.angle = this.gradientType === 'radial' ? '' : props.angle;
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
		this.setState({
			...this.cycleConstants[0]
		});

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

		this.style = {
			[this.property]: calculateGradient({
				gradientType: this.gradientType,
				duration: this.duration,
				property: this.property,
				angle: this.angle,
				sourceGradient,
				rightDelta,
				leftDelta,
				counter,
			})
		};

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
			transitionType,
			className = '',
			gradientType,
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
				style: this.style
			},
			children
		);
	};
};