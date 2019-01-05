import React, { Component } from 'react';
import {nav} from "../../utils";
import styles from './notFound.module.scss';

class NotFound extends Component {

    render() {
        return (
            <div className={styles.container}>
                <ul className={styles.router}>
                    <li>Lost in space?</li>
                    <li><a href={nav("")}>Go home</a></li>
                    <li><a href={nav("simulator")}>Simulator</a></li>
                </ul>
            </div>
        )
    }
}

export default NotFound;