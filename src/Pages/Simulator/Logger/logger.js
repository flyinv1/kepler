import React, { Component } from 'react';
import './logger.css';

import { connect } from 'react-redux';
// import { getLabels, getShortSortedLabels } from "../../../Redux/Selectors";
import { getCentralBody } from "../../../Redux/Selectors";

class Logger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={"logger-container"}>
                {Object.values(this.props.centerBody).map((val) => <p>{val}</p>)}
            </div>
        )
    }
}

export default connect(state => ({ centerBody: getCentralBody(state) || {}}))(Logger);