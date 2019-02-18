import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './numController.module.scss';

class NumController extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <p className={styles.counter}>{this.props.count}x</p>
                <div className={styles.countWrapper}>
                    <p onClick={this.props.down}>{'<<'}</p>
                    <p onClick={this.props.up}>{'>>'}</p>
                </div>
            </div>
        )
    }

}

NumController.propTypes = {
    count: PropTypes.number.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
};

export default NumController;