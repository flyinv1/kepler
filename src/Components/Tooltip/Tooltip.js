import React from 'react';
import PropTypes from 'prop-types';
import styles from './tooltip.module.scss';
import {style} from "utils";

const locations = {
    'top': styles.top,
    'right': styles.right,
    'bottom': styles.bottom,
    'left': styles.left
};

const Tooltip = (props) => {
    const loc = locations[props.location] || locations['top'];
    return(
        <div className={styles.container}>
            {props.children}
            <div className={style(styles.tipWrapper, loc)}>
                {props.tipContent}
                <div className={styles.arrow}/>
            </div>
        </div>
    )
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    tipContent: PropTypes.node.isRequired,
    location: PropTypes.string.isRequired,
};

export default Tooltip;
