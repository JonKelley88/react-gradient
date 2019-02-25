import React from 'react';
import convertToRGB from '../utils/convertToRGB';
import calculateProperties from '../utils/calculateProperties';
import generateCycleConstants from '../utils/generateCycleConstants';

export default class Gradient extends React.Component {
	constructor(props) {
		super(props);
		
		// the css properties being passed into the component styles
		this.properties = {};

		// supported props
		this.transitionType = props.transitionType || 'parallel';
		this.gradientType = props.gradientType || 'linear';
		this.rgbGradients = convertToRGB(props.gradients, this.transitionType);
		this.duration = props.duration || 4000;
		this.angle = this.gradientType === 'radial' ? '' : props.angle || '';
		
		// other variables
		this.cycleConstants = generateCycleConstants(this.rgbGradients, this.transitionType);	
		this.lastCycle = props.gradients.length - 1;
		this.animationId = undefined;
		this.unmounted = false;
		
		// methods
		this.setCycleConstants = this.setCycleConstants.bind(this);
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
		this.setCycleConstants();
		window.requestAnimationFrame(this.animate);
	}

	componentDidUpdate(prevProps, prevState) {
		const { currentCycle } = this.state;

		if (prevState.currentCycle !== currentCycle) {
			this.setCycleConstants();
		}
	}

	componentWillUnmount() {
		this.unmounted = true;
		window.cancelAnimationFrame(this.animationId);
	}

	setCycleConstants() {
		const { currentCycle } = this.state;

		this.setState({
			...this.cycleConstants[currentCycle]
		});
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
			propertyList: this.props.properties,
			gradientType: this.gradientType,
			duration: this.duration,
			angle: this.angle,
			sourceGradient,
			rightDelta,
			leftDelta,
			counter,
		});

		const updatedCounter = counter >= this.duration ? 0 : counter + 16;
		const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;

		if (updatedCounter === 0) {
			this.setState({
				currentCycle: updatedCycle,
				counter: updatedCounter
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
			className = '' 
		} = this.props;
		
		return (
			<div 
				className={ `react-gradient ${className}` }
				style={ this.properties }
			>
				{ children }
			</div>
		);
	};
};