import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './system.module.scss';
import {checkNormalization, spacedVectorString, randomTag} from "../../../utils";
import {getBodies, getSavedBodies, getSteps, getStepSize} from "../../../Redux/selectors";
import action from "../../../Redux/action";
import SystemTable from "../../Components/SystemTable/systemTable";
import savedBodies from "../../../Data/solarSystem";
import SystemBodySelector from "../../Components/SystemBodySelector/systemBodySelector";
import {getSaved, save} from "../../../Redux/storage";
import {
    ADD_BODY,
    BODIES,
    DELETE_SAVED_USER_BODY,
    REMOVE_BODY_BY_ID, SAVE_USER_BODY, SET_STEP_SIZE,
    SET_STEPS,
    UPDATE_SAVED_DATA,
    USER_BODIES
} from "../../../Redux/constants";

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            editing: false,
            valid: false,
            r: [0, 0, 0],
            v: [0, 0, 0],
            name: "",
            mass: 0,
            bodyRadius: 0,
            steps: this.props.steps,
            stepSize: this.props.stepSize,
        }
    }

    addValidBody() {
        let ID = (this.state.selected >= 0) ? this.props.bodies[this.state.selected].id : randomTag().toUpperCase();

        console.log(ID);

        let name = (this.state.name === "") ? ID : this.state.name;

        if (this.props.bodies.filter((body) => body.id === ID).length > 0) {
            this.removeSelected();
        }

        let body = {
            id: ID,
            name: name,
            position: this.state.r.map((r) => parseFloat(r)),
            velocity: this.state.v.map((v) => parseFloat(v)),
            mass: this.state.mass,
            radius: this.state.bodyRadius,
        };

        this.props.addBody(body);

        if (this.state.selected >= 0) {
            this.props.saveBody(body);
        }

        this.clearFields();
    }

    addSavedBody(body) {
        if (!this.props.bodies.filter((bod) => bod.id === body.id).length > 0) {
            this.props.addBody(body)
        }
    }

    editSelectedRow() {
        let bod = this.props.bodies[this.state.selected];
        this.setState({
            editing: true,
            r: bod.position,
            v: bod.velocity,
            name: bod.name,
            mass: bod.mass,
            bodyRadius: bod.radius,
        })
    }

    removeSelected() {
        this.props.removeBody(this.props.bodies[this.state.selected].id);
        if (!this.props.bodies.length > 0 || this.state.selected >= this.props.bodies.length - 1) {
            this.setState({selected: -1});
        }
    }

    saveSelected() {
        let selBody = this.props.bodies[this.state.selected];
        this.props.saveBody(selBody);
    }

    removeFromSaved() {
        this.props.removeSavedBody(this.props.bodies[this.state.selected].id);
    }

    cancel() {
        this.clearFields();
        this.toggleAdd();
    }

    updateByKey(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.updateBodyValidity()
        });
    }

    updateOrbitParam(e, index) {
        let newArr = this.state[e.target.name];
        newArr[index] = e.target.value;
        this.setState({[e.target.name]: newArr}, () => {
            this.updateBodyValidity();
        })
    }

    updateStep(e, callback) {
        let v = e.target.value;
        if (v >= 0) this.setState({[e.target.name]: v}, callback);
    }

    updateBodyValidity() {
        if (checkNormalization(this.state.r) >= 0 && checkNormalization(this.state.v) >= 0 && this.state.mass > 0 && this.state.bodyRadius > 0) {
            if (!this.state.valid) {
                this.setState({valid: true})
            }
        } else if (this.state.valid) {
            this.setState({valid: false})
        }
    }

    toggleAdd() {
        this.setState({
            editing: !this.state.editing,
            selected: (!this.state.editing) ? -1 : this.state.selected
        })
    }

    clearFields() {
        this.setState({
            editing: false,
            valid: false,
            r: [0, 0, 0],
            v: [0, 0, 0],
            name: "",
            mass: 0,
            bodyRadius: 0,
        })
    }

    setSelectedRow(index) {
        if (!this.state.editing)
            this.setState({selected: (index === this.state.selected) ? -1 : index})
    }

    isSaved() {
        if (this.state.selected >= 0) {
            let selID = this.props.bodies[this.state.selected].id;
            return !(Object.values(getSaved(USER_BODIES)).filter((obj) => obj.id === selID).length > 0);
        } else { return false }
    }

    render() {
        let dim = ["x", "y", "z"];
        return (
            <div className={styles.container}>
                { (Object.keys(this.props.savedBodies.defaults || {}).length > 0) &&
                    <div className={styles.section}>
                        <SectionHeader title={"Default Bodies"}/>
                        <SystemBodySelector bodies={this.props.savedBodies.defaults} callback={this.addSavedBody.bind(this)}/>
                    </div>
                }
                { (Object.keys(this.props.savedBodies.saved || {}).length > 0) &&
                <div className={styles.section}>
                    <SectionHeader title={"Saved Bodies"}/>
                    <SystemBodySelector bodies={this.props.savedBodies.saved} callback={this.addSavedBody.bind(this)}/>
                </div>
                }
                <div className={styles.section}>
                    <SectionHeader title={"Current System"}/>
                    <SystemTable
                        bodies={this.props.bodies}
                        selected={this.state.selected}
                        setSelected={this.setSelectedRow.bind(this)}
                    />
                    {
                        this.state.editing &&
                        <div className={styles.formContainer}>
                            <div className={styles.formRow}>
                                <div>
                                    <label>Name</label>
                                    <input name={"name"} type={"text"} value={this.state.name} onChange={(e) => this.updateByKey(e)}/>
                                </div>
                                <div>
                                    <label>Mass [kg]</label>
                                    <input name={"mass"} type={"number"} step={"1e-20"} min={0} onChange={(e) => this.updateByKey(e)} value={this.state.mass}/>
                                </div>
                                <div>
                                    <label>Body Radius [km]</label>
                                    <input name={"bodyRadius"} type={"number"} step={"1e-20"} min={0} onChange={(e) => this.updateByKey(e)} value={this.state.bodyRadius}/>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                {/*TODO:: Move inputs to dedicated component*/}
                                {
                                    dim.map((dim, i) => {
                                        return <div key={i}>
                                            <label>{`r_${dim} [km]`}</label>
                                            <input name={"r"} step={"1e-20"} type={"number"} onChange={(e) => this.updateOrbitParam(e, i)} value={this.state.r[i]}/>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={styles.formRow}>
                                {
                                    dim.map((dim, i) => {
                                        return <div key={i}>
                                            <label>{`v_${dim} [km/s]`}</label>
                                            <input name={"v"} step={"1e-20"} type={"number"} onChange={(e) => this.updateOrbitParam(e, i)} value={this.state.v[i]}/>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        (!this.state.editing) ?
                        <div className={styles.buttonRow}>
                            <div>
                                <button onClick={this.toggleAdd.bind(this)}>New Body</button>
                                <button onClick={this.editSelectedRow.bind(this)} disabled={!(this.state.selected >= 0) }>Edit</button>
                                <button onClick={this.removeSelected.bind(this)} disabled={!(this.state.selected >= 0)}>Delete</button>
                            </div>
                            {(this.state.selected >= 0) &&
                                <div>
                                    { (this.isSaved()) ?
                                        <button onClick={this.saveSelected.bind(this)}>Save Body</button> :
                                        <button onClick={this.removeFromSaved.bind(this)}>Remove from Saved</button>
                                        }
                                </div>
                            }
                        </div> :
                        <div className={styles.buttonRow}>
                            <div>
                                <button onClick={this.addValidBody.bind(this)} disabled={!this.state.valid}>Add</button>
                                <button onClick={this.cancel.bind(this)}>Cancel</button>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.section}>
                    <SectionHeader title={"Integration Options"}/>
                    <div className={styles.formContainer}>
                        <div className={styles.formRow}>
                            {/*These inputs should be condensed*/}
                            <div>
                                <label>Steps</label>
                                <input name={"steps"} type={"number"} value={this.state.steps} onChange={(e) =>
                                    this.setState({
                                        steps: e.target.value
                                    }, () => {
                                        this.props.setSteps(this.state.steps)
                                    })
                                }/>
                            </div>
                            <div>
                                <label>Step Size [s]</label>
                                <input name={"stepSize"} type={"number"} value={this.state.stepSize} onChange={(e) => {this.updateStep(e, () => {
                                    this.props.setStepSize(this.state.stepSize)
                                })}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SectionHeader = (props) => {
    return (<div className={styles.sectionHeader}>
        <h2>{props.title}</h2>
    </div>)
};

const mapStateToProps = state => ({
    bodies: getBodies(state),
    steps: getSteps(state),
    stepSize: getStepSize(state),
    savedBodies: getSavedBodies(state),
});

const mapDispatchToEvents = dispatch => ({
    addBody: (body) => dispatch(action(ADD_BODY, body)),
    removeBody: (id) => dispatch(action(REMOVE_BODY_BY_ID, id)),
    setSteps: (steps) => dispatch(action(SET_STEPS, steps)),
    setStepSize: (steps) => dispatch(action(SET_STEP_SIZE, steps)),
    removeSavedBody: (id) => dispatch(action(DELETE_SAVED_USER_BODY, id)),
    saveBody: (body) => dispatch(action(SAVE_USER_BODY, body)),
});

export default connect(mapStateToProps, mapDispatchToEvents)(System);

