import React, { Component } from 'react';
import styles from './controls.module.scss';
import action from "../../../Redux/action";
import {getBodies, getSteps, getStepSize} from "../../../Redux/selectors";
import {connect} from "react-redux";
import {save} from "../../../Redux/storage";
import integrateSystem from '../../../Computation/symplecticEuler';
import {CLEAR_LOGS, DISPATCH_LOG, SET_HISTORY} from "../../../Redux/constants";

const COMP = { idle: 'IDLE', running: 'RUNNING', done: 'DONE' };

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computerState: COMP.idle,
            index: 0,
        }
    }

    componentDidMount() {
    }

    startIntegration() {
        this.setState({
            computerState: COMP.running,
        });
        this.props.log({
            tag: "",
            content: "Computing..."
        });
        this.props.log({
            tag: "Initial State",
            content: this.props.bodies
        });

        let results = integrateSystem(this.props.bodies, this.props.stepSize, this.props.steps, () => {},
            () => {
                this.setState({computerState: COMP.done})
            });
        // console.log("history: ", history);
        this.props.saveComputation(results);
        this.props.log({
            tag: "Results",
            content: results.history[results.history.length - 1],
        });
    }

    terminate() {
        this.setState({
            computerState: COMP.idle
        })
    }

    saveSystemState() {

    }

    saveInitialConditions() {

    }

    clearEngine() {
        this.setState({
            computerState: COMP.idle
        })
    }


    clearBodies() {

    }

    render() {
        switch (this.state.computerState) {
            case COMP.running:
                return (
                    <div className={styles.container}>
                        <div className={styles.left}>
                            Computation running...
                        </div>
                        <div className={styles.right}>
                            <button disabled={true} onClick={this.terminate.bind(this)}>
                                Terminate
                            </button>
                        </div>
                    </div>
                );
            case COMP.done:
                return (
                    <div className={styles.container}>
                        <div className={styles.left}>
                            Finished!
                        </div>
                        <div className={styles.right}>
                            <button onClick={this.clearEngine.bind(this)}>
                                Done
                            </button>
                            {/*<button onClick={this.saveSystemState.bind(this)}>Save Current System State</button>*/}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <button onClick={this.startIntegration.bind(this)}>
                                Calculate System
                            </button>
                            {/*TODO:: Temp fix*/}
                            <div className={styles.hiddenButtons}>
                                <button onClick={this.saveInitialConditions.bind(this)}>
                                    Save Initial Conditions
                                </button>
                                <button onClick={this.saveSystemState}>
                                    Save Current State
                                </button>
                                <button onClick={this.clearBodies.bind(this)}>
                                    Clear Bodies
                                </button>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <button onClick={this.props.clearLogs}>
                                Clear Console
                            </button>
                        </div>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    bodies: getBodies(state),
    steps: getSteps(state),
    stepSize: getStepSize(state),
});

const mapDispatchToEvents = dispatch => ({
    saveComputation: (history) => dispatch(action(SET_HISTORY, history)),
    log: (log) => dispatch(action(DISPATCH_LOG, log)),
    clearLogs: () => dispatch(action(CLEAR_LOGS, {})),
});

export default connect(mapStateToProps, mapDispatchToEvents)(Controls);