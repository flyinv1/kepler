import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styles from './logger.module.scss';
import { getLogs } from "../../../Redux/Selectors";
import { clearLogs } from "../../../Redux/Actions";
import {currentDateString} from "../../../utils";


class Logger extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={styles.container}>
                {
                    this.props.logs.map((log, i) =>
                        <LogItem key={i} tag={log.tag}>{JSON.stringify(log.content)}</LogItem>
                    )
                }
            </div>
        )
    }
}

const LogItem = (props) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.meta}>{currentDateString()}</p>
            <p className={styles.tag}>{props.tag + ":"}</p>
            <p className={styles.content}>{ props.children }</p>
        </div>
    )
};

LogItem.propTypes = {
    tag: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        logs: getLogs(state),
    }
};

const mapDispatchToEvents = (dispatch) => {
    return {
        clearConsole: () => {
            dispatch(clearLogs)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToEvents)(Logger);
