import React from 'react';
import convertToRGB from '../utils/convertToRGB';
import calculateProperties from '../utils/calculateProperties';

export default class Gradient extends React.Component {
	constructor(props) {
		super(props);
		
		this.properties = {};

		this.rgbGradients = convertToRGB(props.gradients);
		this.lastCycle = props.gradients.length - 1;
		this.duration = props.duration || 3000;
		this.gradientType = props.gradientType || 'linear';
		this.animationId = undefined;
		
		this.animate = this.animate.bind(this);
		
		this.state = {
			currentCycle: 0,
			counter: 0,
		};
	}
	
	componentDidMount() {
		window.requestAnimationFrame(this.animate);
	}

	componentWillUnmount() {
		window.cancelAnimationFrame(this.animationId);
	}
	
	animate() {
		const { counter, currentCycle } = this.state;
		
		const updatedCounter = counter >= this.duration ? 0 : counter + 16;
		const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;
		
		this.properties = calculateProperties({
			gradients: this.rgbGradients,
			propertyList: this.props.properties,
			duration: this.duration,
			cycle: currentCycle,
			gradientType: this.gradientType,
			counter
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