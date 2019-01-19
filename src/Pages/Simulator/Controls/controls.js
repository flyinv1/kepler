import React, { Component } from 'react';
import styles from './controls.module.scss';
import {clearLogs, dispatchLog, saveComputation} from "../../../Redux/Actions";
import {getBodies} from "../../../Redux/Selectors";
import {connect} from "react-redux";
import integrateSystem from "../../../Computation/symplecticEuler";

const COMP = { idle: 'IDLE', running: 'RUNNING', done: 'DONE' };

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computerState: COMP.idle,
        }
    }

    startIntegration() {
        this.setState({
            computerState: COMP.running
        });
        this.props.log({
            tag: "",
            content: "Computing..."
        })
        this.props.log({
            tag: "Initial State",
            content: this.props.bodies
        });
        //Ensure the state is updated to 'running' before taking up all of the computer's resources :/
        setTimeout(() => {
            let bodies = integrateSystem(this.props.bodies, 60, 60*24*365, () => {
                this.setState({
                    computerState: COMP.done
                })
            }, (state) => {if (state) console.log(state)});
            this.props.saveComputation(bodies);
            this.props.log({
                tag: "Results",
                content: bodies[bodies.length - 1],
            })
        }, 100);
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

    renderComputationState() {
        switch (this.state.computerState) {
            case COMP.running:
                return(
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
                return(
                    <div className={styles.container}>
                        <div className={styles.left}>
                            Finished!
                        </div>
                        <div className={styles.right}>
                            <button onClick={this.clearEngine.bind(this)}>
                                Done
                            </button>
                            <button onClick={this.saveSystemState.bind(this)}>Save Current System State</button>
                        </div>
                    </div>
                );
            default:
                return(
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

    render() {
        return (this.renderComputationState());
    }
}

const mapStateToProps = state => {
    return {
        bodies: getBodies(state),
    }
};

const mapDispatchToEvents = (dispatch) => {
    return {
        saveComputation: (history) => {
            dispatch(saveComputation(history))
        },
        log: (log) => {
            dispatch(dispatchLog(log))
        },
        clearLogs: () => {
            dispatch(clearLogs());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToEvents)(Controls);