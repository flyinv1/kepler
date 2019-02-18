import React, { Component } from 'react';
import styles from "./landing.module.scss";
import {nav} from "../../utils";

const RADII = [15, 24, 40];

class Landing extends Component {
    constructor(props) {
        super(props);
        this.onKeydown = this.onKeydown.bind(this);
        window.addEventListener("keydown", this.onKeydown)
    }

    onKeydown(event) {
        if (event.key === "Enter") {
            window.removeEventListener("keydown", this.onKeydown);
            window.location.hash = "/simulator";
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.animated}>
                    <svg
                        className={styles.svg}
                        viewBox={'-130 -120 150 150'}
                    >
                        <g>
                            <circle className={styles.planet} r={0.8} cx={0} cy={0}/>
                            <AnimationGroup radius={10} r={0.3} animClass={styles.planet_0}/>
                            <AnimationGroup radius={20} r={0.5} animClass={styles.planet_1}/>
                            <AnimationGroup radius={50} r={0.4} animClass={styles.planet_2}/>
                        </g>
                    </svg>
                </div>
                <div className={styles.landingContent}>
                    <div>
                        <h1>N-Body Simulator</h1>
                        <ul>
                            <li>press enter to begin</li>
                            <li>read the <a href={nav("docs")}>documentation</a></li>
                            {/*<li>view <a href={nav("data")}>data</a></li>*/}
                        </ul>
                    </div>
                    <div>
                        <h3>This is an open source simulator, contribute on <a href={"https://github.com/flyinv1/kepler/tree/n-body"}>Github.</a></h3>
                    </div>
                </div>
            </div>
        )
    }
}

const AnimationGroup = (props) => {
    return(
        <g>
            <circle
                className={styles.orbitPath}
                r={props.radius}
                cx={0}
                cy={0}
            />
            <circle
                className={`${props.animClass} ${styles.planet}`}
                r={props.r}
                cx={0}
                cy={0}
            />
        </g>
    )
};

export default Landing