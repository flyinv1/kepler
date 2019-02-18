import React from 'react';
import styles from '../docs.module.scss';
import {} from '../formatting';
import {nav} from '../../../utils';

const Engine = () => {
    return(
        <div className={styles.page}>
            <section>
                <h2>Semi-Implicit Euler</h2>
                <p>
                    The core of the integration engine is the Semi-implicit Euler method. At each time step, the algorithm iterates over the array of bodies. For each body, the net acceleration due to gravitational forces is calculated. The velocity at the next time step is then calculated from the net acceleration and previous velocity:
                    <eq>
                        <strong>v</strong><sub>n+1</sub> = <strong>a</strong><sub>n,grav</sub>dt + <strong>v</strong><sub>n</sub>
                    </eq>
                    From the new velocity, the next position can be calculated:
                    <eq>
                        <strong>r</strong><sub>n+1</sub> = <strong>v</strong><sub>n+1</sub>dt + <strong>r</strong><sub>n</sub>
                    </eq>
                    The Semi-implicit Euler method was implemented because of its conservative properties. Unlike explicit euler, or even RK4, the semi-implicit method tends to conserve the energy of the system. It belongs to the class of symplectic integrators which share this property. However, it fails to conserve phase and the resulting orbits will deviate from their real position in time on the order of &Delta;t.
                </p>
            </section>
            <section>
                <h2>Shortcomings</h2>
                <p>
                    Beyond the failure to maintain phase, the engine is bottle-necked by browser implementation. Since the application is implemented in javascript, the DOM events, computation, and rendering is entirely single-threaded. This prevents optimization of the engine by parallelization (at each time step), causes the application to freeze when performing computations with more than ~10000 steps, and generally results in a poorer experience.
                </p>
            </section>
        </div>
    )
};

export default Engine;
