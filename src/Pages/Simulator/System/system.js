import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './system.module.scss';
import {checkNormalization, spacedVectorString, randomTag} from "../../../utils";
import {getBodies, getSteps, getStepSize} from "../../../Redux/Selectors";
import {addBody, removeBodyById, setSteps, setStepSize} from "../../../Redux/Actions";
import savedBodies from './../../../Data';
import SystemTable from "../../Components/SystemTable/systemTable";
import SystemBodySelector from "../../Components/SystemBodySelector/systemBodySelector";
import {getSaved, save} from "../../../Redux/Storage";
import {BODIES, USER_BODIES} from "../../../Redux/constants";

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            adding: false,
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

    componentDidMount() {
        console.log(getSaved(USER_BODIES));
    }

    addValidBody() {
        let ID = randomTag().toUpperCase();
        let name = (this.state.name === "") ? ID : this.state.name;
        this.props.addBody({
            id: ID,
            name: name,
            position: this.state.r.map((r) => parseFloat(r)),
            velocity: this.state.v.map((v) => parseFloat(v)),
            mass: this.state.mass,
            radius: this.state.bodyRadius,
        });
        this.clearFields();
    }

    addSavedBody(body) {
        if (!this.props.bodies.filter((bod) => bod.id === body.id).length > 0) {
            this.props.addBody(body)
        }
    }

    editSelectedRow() {

    }

    removeSelected() {
        this.props.removeBody(this.props.bodies[this.state.selected].id);
        this.setState({selected: -1});
    }

    saveSelected() {
        let savedBodies = getSaved(USER_BODIES);
        let selBody = this.props.bodies[this.state.selected];
        save(USER_BODIES, {...savedBodies,
            [selBody.name]: this.props.bodies[this.state.selected]
        });
        super.forceUpdate();
    }

    canSave() {
        if (this.state.selected >= 0) {
            let selID = this.props.bodies[this.state.selected].id;
            return !(Object.values(getSaved(USER_BODIES)).filter((obj) => obj.id === selID).length > 0);
        } else {
            return false;
        }
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
            adding: !this.state.adding,
            selected: (!this.state.adding) ? -1 : this.state.selected
        })
    }

    clearFields() {
        this.setState({
            adding: false,
            valid: false,
            r: [0, 0, 0],
            v: [0, 0, 0],
            name: "",
            mass: 0,
            bodyRadius: 0,
        })
    }

    setSelectedRow(index) {
        this.setState({selected: (index === this.state.selected) ? -1 : index})
    }

    render() {
        let dim = ["x", "y", "z"];
        return (
            <div className={styles.container}>
                { (Object.keys(savedBodies.defaults || {}).length > 0) &&
                    <div className={styles.section}>
                        <SectionHeader title={"Default Bodies"}/>
                        <SystemBodySelector bodies={savedBodies.defaults} callback={this.addSavedBody.bind(this)}/>
                    </div>
                }
                { (Object.keys(savedBodies.saved || {}).length > 0) &&
                <div className={styles.section}>
                    <SectionHeader title={"Saved Bodies"}/>
                    <SystemBodySelector bodies={savedBodies.saved} callback={this.addSavedBody.bind(this)}/>
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
                        this.state.adding &&
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
                        (!this.state.adding) ?
                        <div className={styles.buttonRow}>
                            <button onClick={this.toggleAdd.bind(this)}>New Body</button>
                            {/*<button onClick={this.editSelectedRow.bind(this)} disabled={!(this.state.selected >= 0) }>Edit</button>*/}
                            <button onClick={this.removeSelected.bind(this)} disabled={!(this.state.selected >= 0)}>Delete</button>
                            <button onClick={this.saveSelected.bind(this)} disabled={!(this.canSave())}>Save Selected</button>
                        </div> :
                        <div className={styles.buttonRow}>
                            <button onClick={this.addValidBody.bind(this)} disabled={!this.state.valid}>Add</button>
                            <button onClick={this.cancel.bind(this)}>Cancel</button>
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

const mapStateToProps = state => {
    return {
        bodies: getBodies(state),
        steps: getSteps(state),
        stepSize: getStepSize(state),
    }
};

const mapDispatchToEvents = (dispatch) => {
    return {
        addBody: (body) => {
            dispatch(addBody(body))
        },
        removeBody: (id) => {
            dispatch(removeBodyById(id))
        },
        setSteps: (steps) => {
            dispatch(setSteps(steps))
        },
        setStepSize: (steps) => {
            dispatch(setStepSize(steps))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToEvents)(System);

