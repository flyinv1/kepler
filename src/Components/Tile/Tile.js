import React from 'react';
import PropTypes from 'prop-types';
import styles from './tile.module.scss';
import {style} from "utils";

const Tile = (props) => {
    return(
        <div className={style(styles.container, props.className)}>
            {props.children}
        </div>
    )
};

Tile.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Tile;