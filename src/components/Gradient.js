import React from 'react';
import convertToRGB from '../utils/convertToRGB';
import calculateProperties from '../utils/calculateProperties';
import generateCycleConstants from '../utils/generateCycleConstants';

export default class Gradient extends React.Component {
	constructor(props) {
		super(props);
		
		this.properties = {};

		this.rgbGradients = convertToRGB(props.gradients);
		this.lastCycle = props.gradients.length - 1;
		this.cycleConstants = generateCycleConstants(this.rgbGradients);	
		this.duration = props.duration || 4000;
		this.gradientType = props.gradientType || 'linear';
		this.angle = props.angle || '0deg';
		this.animationId = undefined;
		this.unmounted = false;
		
		this.setCycleConstants = this.setCycleConstants.bind(this);
		this.animate = this.animate.bind(this);
		
		this.state = {
			counter: 0,
			currentCycle: 0,
			sourceGradient: this.rgbGradients[0],
			leftDelta: undefined,
			rightDelta: undefined
		};
	}
	
	componentDidMount() {
		this.setCycleConstants();
		window.requestAnimationFrame(this.animate);
	}

	componentDidUpdate(prevProps, prevState) {
		const { currentCycle } = this.state;

		// when a new cycle starts, calculate the cycle-long constants
		if (prevState.currentCycle !== currentCycle) {
			this.setCycleConstants();
		}
	}

	componentWillUnmount() {
		this.unmounted = true;
		window.cancelAnimationFrame(this.animationId);
	}

	setCycleConstants() {
		if (this.unmounted) return;

		const { currentCycle } = this.state;

		this.setState({
			...this.cycleConstants[currentCycle]
		});
	}
	
	animate() {
		if (this.unmounted) return;

		const { 
			counter, 
			currentCycle,
			sourceGradient,
			leftDelta,
			rightDelta,
		} = this.state;
		
		const updatedCounter = counter >= this.duration ? 0 : counter + 16;
		const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;
		
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
		const { children } = this.props;
		
		return (
			<div 
				className="animate-gradient"
				style={ this.properties }
			>
				{ children }
			</div>
		);
	};
};