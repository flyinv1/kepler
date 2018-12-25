import React, { Component } from 'react';
import {nav} from "../../utils";
import './notFound.css';

class NotFound extends Component {

    render() {
        return (
            <div className="not-found">
                <ul className={"not-found-router"}>
                    <li>Lost in space?</li>
                    <li><a href={nav("")}>Go home</a></li>
                    <li><a href={nav("simulator")}>Simulator</a></li>
                </ul>
            </div>
        )
    }
}

export default NotFound;