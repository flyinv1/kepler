import React, { Component } from 'react';
import Tabbar from "../Components/Tabbar/tabbar";
import System from "./System/system";
import Computer from "./Computer/computer";
import Mission from "./Mission/mission";
import Footer from "../Components/Footer/footer";
import Logger from "./Logger/logger";
import Controls from "./Controls/controls";
import styles from "./simulator.module.scss";
import Animator from "./Animator/animator";
import {nav} from "../../utils";

let tabs = [
    {tab: System, title: "Configuration"},
    // {tab: Mission, title: "Mission"},
    {tab: Computer, title: "Methods"}
];

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container}>
                <a href={nav('')}><button className={styles.backButton}>Exit</button></a>
                <div className={styles.content}>
                    <div className={styles.outputs}>
                        <div className={styles.animator}>
                            <Animator/>
                        </div>
                        <div className={styles.controls}>
                            <Controls/>
                        </div>
                        <div className={styles.logs}>
                            <Logger/>
                        </div>
                    </div>
                    <div className={styles.tabs}>
                        <Tabbar tabs={tabs}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Simulator;