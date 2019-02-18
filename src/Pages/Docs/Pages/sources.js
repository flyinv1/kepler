import React from 'react';
import styles from '../docs.module.scss';
import {} from '../formatting';
import {nav} from '../../../utils';

const Sources = () => {
    return(
        <div className={styles.page}>
            <section>
                <h2>Thanks To</h2>
                <p>The following resources were extremely helpful in determining the correct integration procedures and building the application.</p>
                <ul>
                    <li>
                        <em>Orbital Mechanics for Engineering Students</em> by Howard D. Curtis
                    </li>
                    <li>
                        Basics of various EoM integration methods: <a href={"https://gafferongames.com/post/integration_basics/"}>gafferongames.com/post/integration_basics/</a>
                    </li>
                    <li>
                        Wikipedia: <a href={"https://en.wikipedia.org/wiki/Semi-implicit_Euler_method"}>wikipedia.org/wiki/Semi-implicit_Euler_method</a>
                    </li>
                    <li>
                        ReactJS Docs: <a href={"https://reactjs.org/"}>reactjs.org/</a>
                    </li>
                    <li>
                        And of course: <a href={"https://stackoverflow.com"}>stackoverflow.com</a>
                    </li>
                </ul>

            </section>
        </div>
    )
};

export default Sources;
