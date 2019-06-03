import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';
import {style} from "utils";

const buttonStyles = {
    'dark': styles.darkButton,
    'primary': styles.primaryButton,
    'secondary': styles.secondaryButton,
};

const TextButton = (props) => {
    return(
        <button onClick={props.callback} className={style(styles.container, styles.textButton, buttonStyles[props.type] || buttonStyles['secondary'])} {...props}>
            {props.title}
        </button>
    )
};

const IconButton = (props) => {
    return(
        <button onClick={props.callback} className={style(styles.iconContainer, styles.secondaryButton)} {...props}>
            <img src={props.src} alt={''} className={styles.icon}/>
        </button>
    )
};

export {
    TextButton,
    IconButton
}