import React, { Component } from 'react';
import styles from "./footer.module.scss";
import {nav} from "../../../utils";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <ul>
                <li>Pre-Alpha Build V 0.1</li>
            </ul>
            <ul>
                <li><a href={nav('docs')}>Documentation</a></li>
                <li><a href={"https://github.com/flyinv1/kepler/tree/n-body"}>Github</a></li>
                {/*<li><a>Data</a></li>*/}
            </ul>
        </div>
    )
};

export default Footer;

