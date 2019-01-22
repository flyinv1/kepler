import React, { Component } from 'react';
import styles from "./footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <ul>
                <li>V 1.0</li>
            </ul>
            <ul>
                <li><a>Documentation</a></li>
                <li><a>Github</a></li>
                <li><a>Data</a></li>
            </ul>
        </div>
    )
};

export default Footer;

