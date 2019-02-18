import React from 'react';
import PropTypes from 'prop-types';
import styles from './systemBodySelector.module.scss';

const SystemBodySelector = (props) => {
    return(
        <div className={styles.container}>
            {
                Object.values(props.bodies).map((body, i) => {
                    return (
                        <div className={styles.body} key={body.id} onClick={() => props.callback(body, i)}>{body.name}</div>
                    )
                })
            }
        </div>
    )
};

SystemBodySelector.propTypes = {
    bodies: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
};

export default SystemBodySelector;