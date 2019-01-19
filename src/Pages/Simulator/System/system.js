import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './system.module.scss';
import {checkNormalization, spacedVectorString, randomTag} from "../../../utils";
import { getBodies } from "../../../Redux/Selectors";
import {addBody, removeBodyById} from "../../../Redux/Actions";
import bodies from './../../../Data';

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
        }
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

    editSelected() {

    }

    removeSelected() {
        this.props.removeBody(this.props.bodies[this.state.selected].id);
        this.setState({selected: -1})
    }

    cancel() {
        this.clearFields();
        this.toggleAdd();
    }

    updateByKey(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.updateValidity()
        });
    }

    updateParam(e, index) {
        let newArr = this.state[e.target.name];
        newArr[index] = e.target.value;
        this.setState({[e.target.name]: newArr}, () => {
            this.updateValidity();
        })
    }

    updateValidity() {
        if (checkNormalization(this.state.r) > 0 && checkNormalization(this.state.v) > 0 && this.state.mass > 0 && this.state.bodyRadius > 0) {
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

    setSelected(index) {
        this.setState({selected: (index === this.state.selected) ? -1 : index})
    }

    render() {
        let dim = ["x", "y", "z"];
        return (
            <div className={styles.container}>
                <div className={styles.section}>
                    {/*TODO:: Convert to components*/}
                    <SectionHeader title={"Defaults"}/>
                    {
                        Object.values(bodies.defaults).map((body) => {
                            return (
                                <div key={body.id} onClick={() => this.addSavedBody(body)}>{body.name}</div>
                            )
                        })
                    }
                </div>
                <div className={styles.section}>
                    <SectionHeader title={"System Bodies"}/>
                    <div>
                        { this.props.bodies.length > 0 &&
                        <table className={styles.bodiesTable}>
                            <tbody>
                                <tr className={styles.tableHeader}>
                                    <td>Name</td>
                                    <td>r [km]</td>
                                    <td>v [km]</td>
                                    <td>M [kg]</td>
                                    <td>R [km]</td>
                                </tr>
                                {
                                    this.props.bodies.map((body, i) => {
                                        return (
                                        <tr
                                            key={body.id}
                                            onClick={() => this.setSelected(i)}
                                            className={(i === this.state.selected) ? styles.selectedRow : ""}
                                        >
                                            <td>{body.name}</td>
                                            <td>{spacedVectorString(body.position)}</td>
                                            <td>{spacedVectorString(body.velocity)}</td>
                                            <td>{body.mass}</td>
                                            <td>{body.radius}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> }
                    </div>
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
                                            <input name={"r"} step={"1e-20"} type={"number"} onChange={(e) => this.updateParam(e, i)} value={this.state.r[i]}/>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={styles.formRow}>
                                {
                                    dim.map((dim, i) => {
                                        return <div key={i}>
                                            <label>{`v_${dim} [km/s]`}</label>
                                            <input name={"v"} step={"1e-20"} type={"number"} onChange={(e) => this.updateParam(e, i)} value={this.state.v[i]}/>
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
                            <button onClick={this.editSelected.bind(this)} disabled={!(this.state.selected >= 0) }>Edit</button>
                            <button onClick={this.removeSelected.bind(this)} disabled={!(this.state.selected >= 0)}>Delete</button>
                        </div> :
                        <div className={styles.buttonRow}>
                            <button onClick={this.addValidBody.bind(this)} disabled={!this.state.valid}>Save</button>
                            <button onClick={this.cancel.bind(this)}>Cancel</button>
                        </div>
                    }
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
    }
};

const mapDispatchToEvents = (dispatch) => {
    return {
        addBody: (body) => {
            dispatch(addBody(body))
        },
        removeBody: (id) => {
            dispatch(removeBodyById(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToEvents)(System);

