import React from 'react';
import styles from '../docs.module.scss';
import {} from '../formatting';
import {nav} from '../../../utils';

const Coordinates = () => {
    return(
        <div className={styles.page}>
            <section>
                <h2>Current Implementation</h2>
                <p>
                   The simulator operates in an absolute coordinate frame which remains stationary throughout the computation process. This has a few important consequences. First, central bodies (such as the sun) exhibit drift over time, and orbital paths therefore precess relative to the initial origin. Secondly, implementing satellites requires one or more manual transformations to the global frame.
                </p>
            </section>
            <section>
                <h2>Animation Frame</h2>
                <p>
                    The animator is implemented entirely in svg using SMIL animations. Though straightforward to implement, svg is functional only in two dimensions (and of course, this is a 3D simulator). The z-axis is therefore flattened and only the x-y plane is shown.
                </p>
            </section>
            <section>
                <h2>Feature Improvements</h2>
                <p>
                    The global frame is computationally cheaper than a relative frame, but reduces user convenience. In some cases, it is necessary to compute in a relative frame to prevent orbit drift. One potential solution is allowing the user to set a central body which is then used as the relative origin. The satellite issue can be resolved by automatically performing coordinate transformations.
                </p>
            </section>
        </div>
    )
};

export default Coordinates;
