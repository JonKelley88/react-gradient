import React, {Component} from 'react';
import generateCycleConstants from '../utils/generateCycleConstants';
import {calculateCSSGradient, calculateGradient} from '../utils/calculateGradient';
import matchProperties from '../utils/matchProperties';
import convertToRGB from '../utils/convertToRGB';

export default class Gradient extends Component {
    //supported props
    //TODO currently a quick fix. Make this system better since at the beginning this component wasn't coded for changing props
    //Possible way to clean up in the future is to use Gradient.defaultProps
    get transitionType() {
        return this.props.transitionType || 'parallel';
    }

    get rgbGradients() {
        return convertToRGB(this.props.gradients, this.transitionType);
    }

    get gradientType() {
        return this.props.gradientType || 'linear'
    }

    get angle() {
        return this.gradientType === 'radial' ? '' : `${this.props.angle || '0deg'}, `
    }

    get property() {
        return matchProperties(this.props.property || 'background');//convert default property name to valid JSX property name
    }

    get duration() {
        return this.props.duration || 5000;
    }

    get element() {
        return this.props.element || 'div';
    }

    //other
    get isText() {
        return this.props.property === 'text';
    }

    get lastCycle() {
        return this.rgbGradients.length - 1;
    }

    constructor(props) {
        super(props);


        // the css property being passed into the component styles
        this.style = {[this.property]: ''};

        // other variables
        this.animationId = 0;
        this.mounted = false;
        this.elapsed = 0;

        // methods
        this.updateState = this.updateState.bind(this);
        this.animate = this.animate.bind(this);

        // state
        this.state = {
            currentCycle: 0,
            counter: 0,
            cycleConstants: generateCycleConstants(this.rgbGradients, this.transitionType)
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {//used to animate gradients on change
        if (prevProps.gradients !== this.props.gradients || prevProps.transitionType !== this.props.transitionType) {//means we need to prepare a gradient transition to new props
            //transitioning from this to the new prop gradients
            const oldCycle = prevState.cycleConstants[prevState.currentCycle];
            const activeGradient = calculateGradient({
                ...oldCycle,
                duration: this.duration,
                counter: this.state.counter
            });

            this.props.gradients.unshift(activeGradient);//add to beginning of gradients so we can animate the change.
            const update = () => {
                return {
                    cycleConstants: generateCycleConstants(convertToRGB(this.props.gradients, this.transitionType), this.transitionType),
                    counter: 0,
                    currentCycle: 0
                }
            };
            this.updateState(update());
            setTimeout(() => {//once we finish changing from old to new, remove the old gradient and let the component loop between the new ones now.
                this.props.gradients.shift(activeGradient);
                this.updateState(update());

            }, this.duration);

        }

    }

    componentDidMount() {
        this.mounted = true;
        this.animate();
    }


    componentWillUnmount() {
        this.mounted = false;
        window.cancelAnimationFrame(this.animationId);
    }

    updateState(update) {
        this.setState({
            ...update
        });
    }

    animate(timestamp) {
        if (!this.mounted) return;

        const {currentCycle, counter, cycleConstants} = this.state;

        const {
            sourceGradient,
            leftDelta,
            rightDelta,
        } = cycleConstants[currentCycle];

        this.style[this.property] = calculateCSSGradient({
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

        const interval = Math.round(timestamp - this.elapsed) || 16;
        const updatedCounter = counter >= this.duration ? 0 : counter + interval;
        const updatedCycle = currentCycle === this.lastCycle ? 0 : currentCycle + 1;

        if (updatedCounter === 0) {
            this.updateState({
                currentCycle: updatedCycle,
                counter: updatedCounter,
            });

        } else {
            this.updateState({
                counter: updatedCounter
            });
        }

        this.elapsed = timestamp;
        this.animationId = window.requestAnimationFrame(this.animate);
    }

    render() {
        const {
            className = '',
            style = {},
            children,

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