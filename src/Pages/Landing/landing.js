import React, { Component } from 'react';
import styles from "./landing.module.scss";
import {nav} from "../../utils";

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
                <div className={styles.landingContent}>
                    <div>
                        <h1>N-Body Simulator</h1>
                        <ul>
                            <li>press enter to begin</li>
                            <li>read the <a href={nav("documentation")}>documentation</a></li>
                            <li>view <a href={nav("data")}>data</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>This is an open source simulator, contribute on <a href={"https://google.com"}>Github.</a></h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing