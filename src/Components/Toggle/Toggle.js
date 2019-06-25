import React from 'react';
import styles from './toggle.module.scss';
import PropTypes from 'prop-types';
import {style} from "utils";

const Toggle = (props) => {
    const wrapperStyle = style(
        styles.wrapper,
        (props.on) ? styles.on : '',
        (props.disabled) ? styles.disabled : '');
    return(
        <div className={wrapperStyle} onClick={() => {
            if (!props.disabled) {
                props.onClick()
            }
        }}>
            <div className={styles.knob}/>
        </div>
    )
};

Toggle.propTypes = {
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default Toggle;