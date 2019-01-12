import React, { Component } from 'react';
import Tabbar from "../../Components/Tabbar/tabbar";
import System from "./System/system";
import Computer from "./Computer/computer";
import Mission from "./Mission/mission";
import Footer from "../../Components/Footer/footer";
import styles from "./simulator.module.scss";

let tabs = [
    {tab: System, title: "System"},
    // {tab: Mission, title: "Mission"},
    {tab: Computer, title: "Computer"}
];

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.outputs}>
                        <div className={styles.animator}>
                        </div>
                        <div className={styles.logs}>
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

export default Simulator