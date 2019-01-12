import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './system.module.scss';
import {checkNormalization, formatVector, randomTag} from "../../../utils";
import { getBodies } from "../../../Redux/Selectors";
import { addBody } from "../../../Redux/Actions";

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            adding: !this.state.adding
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

    render() {
        let dim = ["x", "y", "z"];
        return (
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Bodies</h2>
                    </div>
                    <div className={styles.sectionContent}>
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
                                    this.props.bodies.map((body) => {
                                        return <tr key={body.name}>
                                            {Object.values(body).map((val, i) => {
                                                return <td key={i}>{formatVector(val)}</td>
                                            })}
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
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
                        !this.state.adding &&
                        <div className={styles.buttonRow}>
                            <button onClick={this.toggleAdd.bind(this)}>New Body</button>
                        </div> ||
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

const mapStateToProps = state => {
    return {
        bodies: getBodies(state),
    }
};

const mapDispatchToEvents = (dispatch) => {
    return {
        addBody: (body) => {
            dispatch(addBody(body))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToEvents)(System);

