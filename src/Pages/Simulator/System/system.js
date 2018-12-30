import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCenterBody, addBody } from "../../../Redux/Actions";
import "./system.css";

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {
            centralRadius: 0,
            centralMass: 0,
            centralMu: 0,
            bodies: [],
        };
    }

    // componentDidMount() {
    //     this.setState({
    //         centralRadius: ,
    //         centralMass: "",
    //         centralMu: "",
    //         bodies: [],
    //     })
    // }

    updateCentralValue(key, e) {
        let val = e.target.value;
        if (!isNaN(val)) {
            console.log(val);
            this.setState({[key]: Number(val)}, () => {
                this.props.updateCenterBody({
                    radius: this.state.centralRadius,
                    mass: this.state.centralMass,
                    mu: this.state.centralMu,
                })
            });
        }
    }

    render() {
        return (
            <div className={"system-form-wrapper"}>
                <div className={"system-section-header"}>
                    <h2>Central Body</h2>
                </div>
                <div className={"system-section"}>
                    <div>
                        <label>RADIUS [km]</label>
                        <input onChange={(e) => this.updateCentralValue("centralRadius", e)} value={this.state.centralRadius}/>
                    </div>
                    <div>
                        <label>MASS [kg]</label>
                        <input onChange={(e) => this.updateCentralValue("centralMass", e)} value={this.state.centralMass}/>
                    </div>
                    <div>
                        <label>MU [km3/s2]</label>
                        <input onChange={(e) => this.updateCentralValue("centralMu", e)} value={this.state.centralMu}/>
                    </div>
                </div>
                <div className={"system-section"}>

                </div>
            </div>
        )
    }

}


export default connect(null, { updateCenterBody, addBody })(System);

