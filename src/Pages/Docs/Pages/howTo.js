import React from 'react';
import styles from '../docs.module.scss';
import {} from '../formatting';
import {nav} from '../../../utils';

const HowTo = () => {
    return(
        <div className={styles.page}>
            <section>
                <h2>Navigating the Simulator</h2>
                <p className={styles.noIndent}>
                    The simulator is split into the following four panels:
                </p>
                <ul>
                    <li><strong>Animator: </strong>The upper left pane contains the animated output of the computation and related animation controls.</li>
                    <li><strong>Controls: </strong>Just under the animator is a small row containing the engine controls. This is where computations are dispatched.</li>
                    <li><strong>Outputs: </strong>The large pane below the animator contains relevant logs, including initial and final system conditions when running computations.</li>
                    <li><strong>Tabs: </strong>The tabbed pane to the right contains pages useful for creating a system.</li>
                </ul>
            </section>
            <section>
                <h2>Initializing a System</h2>
                <p>
                    The first step in using the application is creating a system of bodies and specifying initial conditions. The system tab is selected by default and contains a variety of fields for generating and placing bodies in orbit. A body can be selected from the defaults provided, selected from saved bodies, or created from scratch using the 'New Body' button. Any number of bodies may be added to the system.
                </p>
            </section>
            <section>
                <h2>Creating a Body</h2>
                <p>
                    To create a body, select the 'New Body' button beneath the Current System table. This opens a form with fields for body name, mass, body radius, and initial state. All fields are in metric with length units of kilometer for convenience. Values can be entered in standard floats or scientific notation using the 'e' operator to denote power (1.3x10<sup>9</sup> is entered 1.3e9). The mass and body radius fields are required and must be non-zero values. Initial position and velocity must be entered by vector component, these six fields accept zero values.
                </p>
            </section>
            <section>
                <h2>Default Bodies</h2>
                <p>
                    The simulator currently provides three default bodies: the Sun, Earth, and Mars. Both Earth and Mars data reflect their respective periapsis conditions and do not correspond to the correct planetary ephemeris. In addition, their orbits are assumed to be co-planar. A complete set of solar system data is in progress and will be implemented in the future.
                </p>
            </section>
            <section>
                <h2>Saving Bodies</h2>
                <p>
                    Once a body has been created, it can be saved to the browser's persistent storage. To do this, select the desired body in the system table and click the 'Save Body' button to the right. To remove a saved body, first ensure the body is in the system table, then select 'Remove from Saved'. Any number of bodies may be saved. Once bodies have been saved, they may be added to the system at any time by selecting them from the Saved Body table.
                </p>
            </section>
            <section>
                <h2>Setting Integration Parameters</h2>
                <p>
                    The engine's step size and desired number of integration steps can be entered in the 'Integration Options' fields. There is no limit on these parameters, but browsers will respond poorly to high step counts (usually on the order of 10<sup>5</sup>). By default, the step size is set to a single day (86400s), and the number of steps set to 365.
                </p>
            </section>
            <section>
                <h2>Dispatching Computations</h2>
                <p>
                    Once the system and integration options are configured the calculations can proceed. To begin computing, click the 'Calculate System' button in the control panel. This may temporarily freeze the browser as the code executes. Once completed, the initial and final states of the system will be logged and the animator will update to show the orbital paths taken by each body.
                </p>
            </section>
        </div>
    )
};

export default HowTo;
