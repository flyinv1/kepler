import React, { Component } from 'react';
import styles from './loadingIcon.module.scss';

const LoadingIcon = ({size}) => {
    const dim = size || 100;
    return(
        <div className={styles.container} style={{width: dim, height: dim}}>
            <svg width={dim} height={dim} xmlns={"http://www.w3.org/2000/svg"} className={styles.svgOuter} viewBox={`-50 -50 100 100`}>
                <g>
                    <circle r={6} className={styles.sun}/>
                </g>
                <circle r={36} className={styles.path}/>
                <circle r={18} className={styles.path}/>
                <g className={styles.or_1}>
                    <circle r={4} className={styles.planet}/>
                </g>
                <g className={styles.or_2}>
                    <circle r={5} className={styles.planet}/>
                </g>
            </svg>
        </div>
    )
};

export default LoadingIcon;


