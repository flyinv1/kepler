import React, { Component } from 'react';
import "./footer.css";

const Footer = () => {

    return (
        <div className={"footer"}>
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

