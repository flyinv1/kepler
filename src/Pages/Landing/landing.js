import React, { Component } from 'react';
import "./landing.css";
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
            <div className={"landing"}>
                <div className={"landing-animation"}>
                    <svg id={"system-animation"} version={1.1} xmlns="http://www.w3.org/2000/svg">
                        <g id={"system"}>
                            <circle cx={0} cy={0} r={12} id={"sun"}/>
                            <g>
                                <circle cx={0} cy={0} r={200} className={"animation-orbit"}/>
                                <circle cx={-200} cy={0} r={6} id={"body-1"} className={"animation-body"}/>
                            </g>
                            <g>
                                <circle cx={0} cy={0} r={400} className={"animation-orbit"}/>
                                <circle cx={-365.18} cy={163.23} r={4} id={"body-2"} className={"animation-body"}/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className={"landing-content"}>
                    <div>
                        <h1>Keplerian Orbit Simulator</h1>
                        <ul>
                            <li>press enter to begin</li>
                            <li>read the <a>documentation</a></li>
                            <li>view <a>data</a></li>
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