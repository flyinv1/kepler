import React, { Component } from 'react';
import styles from './animator.module.scss';
import {connect} from "react-redux";
import {getFormattedHistory, getHistory, getMaxRadius, getSteps, getStepSize} from "../../../Redux/selectors";
import RootOrbit from './SVG/root_orbit';
import NumController from "../../Components/NumController/numController";
import convertToPath from "../../../Computation/AnimationHelpers/convertToPath";

const ROOT_ZOOM = 10;
const ZOOM_RATE = 0.001;
const MIN_ZOOM = 0.01;

class Animator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            speed: Math.pow(2, 18),
            zoom: 1,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    // Move draggable properties to component
    onMouseDown(e) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        if (e.button !== 0) return; // only allow left clicks
        this.setState({
            relX: e.clientX - this.state.x,
            relY: e.clientY - this.state.y,
        });
        e.preventDefault();
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    onMouseMove(e) {
        this.setState({
            x: (e.clientX - this.state.relX),
            y: (e.clientY - this.state.relY)
        });

    }

    onScroll(e) {
        let new_z = this.state.zoom - (e.deltaY*ZOOM_RATE);
        this.setState({
            zoom: (new_z > MIN_ZOOM) ? new_z : MIN_ZOOM,
        });
    }

    togglePlay() {
        // TODO:: Find alternate for deprecated SMIL controls
        if (this.state.playing) this.svg.pauseAnimations();
        else this.svg.unpauseAnimations();
        this.setState({
            playing: !this.state.playing
        })
    }

    setSpeed(factor) {
        this.setState({
            speed: this.state.speed*factor,
        });
    }

    resetAnimator() {
        this.setState({
            zoom: 1,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
        })
    }

    render() {
        const frame = ROOT_ZOOM/this.state.zoom;
        var box, ratioX = 1, ratioY = 1;
        if (this.svg) {
            box = this.svg.getBoundingClientRect();
            ratioX = frame / box.width;
            ratioY = frame / box.height;
        }
        const transformations = {
            transform: `translate(${this.state.x*ratioX}px, ${this.state.y*ratioY}px)`
        };

        return(
            <div className={styles.container}>
                {
                    (this.props.history.length > 0) ?
                        <div onWheel={this.onScroll} className={styles.innerContainer} ref={el => {this.svgContainer = el}}>
                            <svg
                                className={styles.svgOuter}
                                viewBox={`${-frame/2} ${-frame/2} ${frame} ${frame}`}
                                // viewBox={`-5 -5 10 10`}
                                ref={el => {this.svg = el}}
                                // style={transformations}
                                onMouseDown={this.onMouseDown}>
                                <g style={transformations}>
                                    {
                                        this.props.history.map((body, i) => <RootOrbit key={i}
                                            path={convertToPath(body, this.props.maxRadius/(ROOT_ZOOM/2.8))} duration={this.props.steps*this.props.stepSize/(this.state.speed)}/>)
                                    }
                                </g>
                            </svg>
                        </div>
                        :
                        <div className={styles.empty}>
                            <h4>No history to animate.</h4>
                        </div>
                }
                {
                    (this.props.history.length > 0) &&
                        <div className={styles.controller}>
                            <div className={styles.buttonRow}>
                                <button onClick={this.togglePlay.bind(this)}>{ (this.state.playing) ? 'Pause' : 'Play' }</button>
                                <NumController count={this.state.speed} up={this.setSpeed.bind(this, 2)} down={this.setSpeed.bind(this, 0.5)}/>
                            </div>
                            <div>
                                <button onClick={this.resetAnimator.bind(this)}>Center</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    history: getFormattedHistory(state),
    maxRadius: getMaxRadius(state),
    steps: getSteps(state),
    stepSize: getStepSize(state),
});

export default connect(mapStateToProps, null)(Animator)