import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styles from './logger.module.scss';
import { getLogs } from "../../../Redux/selectors";
import {currentDateString} from "../../../utils";

class Logger extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.el.scrollIntoView({behavior: "smooth"});
    }

    render() {
        return(
            <div className={styles.container}>
                {
                    this.props.logs.map((log, i) =>
                        <LogItem key={i} tag={log.tag}>{JSON.stringify(log.content)}</LogItem>
                    )
                }
                {/*Capture scroll*/}
                <div ref={el => {this.el = el}}/>
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

const mapStateToProps = state => ({
    logs: getLogs(state),
});

export default connect(mapStateToProps, null)(Logger);
