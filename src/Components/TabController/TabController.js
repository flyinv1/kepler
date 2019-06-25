import React from 'react';
import styles from './tabController.module.scss';
import PropTypes from 'prop-types';
import {style} from "utils";

const TabController = (props) => {
    return(
        <div className={style(styles.container, props.className)}>
            { props.tabs.map((tab, index) => {
                const sel = (index === props.selected) ? styles.selected : '';
                return <div className={style(styles.tab, sel)} key={index} onClick={() => props.onClick(index)}>{tab}</div>
            })}
        </div>
    )
};

TabController.propTypes = {
    tabs: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default TabController;