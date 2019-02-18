import React from 'react';
import styles from '../docs.module.scss';
import {} from '../formatting';
import {nav} from '../../../utils';

const Introduction = () => {
    return(
        <div className={styles.page}>
            <section>
                <h2>N-Body Simulator</h2>
                <p>
                    This simulator is a web based application designed to perform low-cost computational analysis of n-body systems. The engine calculates the time evolution of the system using the semi-implicit Euler method. While this method conserves momentum and energy of the system reasonably well, it does not conserve phase. As a result, the paths are accurate in space, but the time-dependent motion of each body diverges from reality over time. For shorter time intervals (fewer than 10000 steps) these errors are negligible. For these reasons in conjunction with browser limitations, this application is ideal for calculating and visualizing the short term behavior of chaotic n-body systems.
                </p>
            </section>
            <section>
                <h2>What is the N-Body Problem?</h2>
                <p>
                    In planetary systems, all bodies are subject to a net acceleration due to the gravitational forces imparted by every other body in the system. In stable systems a single body (such as the sun) is sufficiently massive such that all other forces are negligible and orbits are deterministic. However, in an arbitrary n-body system this is not strictly the case. Bodies moving under gravitational influence will take paths that cannot be described analytically. Instead, the motion can only be determined by modelling the system computationally by calculating the position and velocity at each point in time. Producing accurate results employing these methods is an expensive and time consuming process which is not easily accomplished. The specifics of the integration methods are discussed in a later section.
                </p>
            </section>
        </div>
    )
};

export default Introduction;
