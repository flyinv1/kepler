import React, { Component } from 'react';
import Tabbar from "../../Components/Tabbar/tabbar";
import System from "./System/system";
import Computer from "./Computer/computer";
import Mission from "./Mission/mission";
import Footer from "../../Components/Footer/footer";
import "./simulator.css";
import Logger from "./Logger/logger";

let tabs = [
    {tab: System, title: "System"},
    {tab: Mission, title: "Mission"},
    {tab: Computer, title: "Computer"}
];

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={"simulator"}>
                <div className={"simulator-content"}>
                    <div className={"simulator-outs"}>
                        <div className={"simulator-animator-container"}>

                        </div>
                        <div className={"log-container"}>
                            <Logger/>
                        </div>
                    </div>
                    <div className={"simulator-tab-container"}>
                        <Tabbar tabs={tabs}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Simulator