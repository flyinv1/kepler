import React, {Component, Fragment} from 'react';
import { Renderer } from 'ThreeJS';
import styles from './sim.module.scss';
import {nav, style} from "utils";
import {TextButton} from "Components/Button/Button";
import Tile from "Components/Tile/Tile";
import TabController from "Components/TabController/TabController";
import Dropdown from "Components/Dropdown/Dropdown";
import Toggle from "Components/Toggle/Toggle";

const tabs = ['Solar', 'Cloud'];

const procedureOptions = ['Disk'];

const integrationOptions = ['All Pairs'];


const initialState = {
    systemType: 1,
    procedureType: 0,
    integrationType: 0,
    bodyCount: 1096,
};

const planets = [
    {
        name: 'Earth',
        position: [0, 1e9, 1e8],
        velocity: [0, 2, 3],
        mass: 1e23,
        id: 0,
    },
    {
        name: 'Sun',
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        mass: 1e34,
        id: 1,
    }
];

export default class Simulator extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.selectSystem = this.selectSystem.bind(this);
        this.selectProcedure = this.selectProcedure.bind(this);
        this.selectIntegration = this.selectIntegration.bind(this);

    }

    selectSystem(index) {
        // if (this.state.systemType !== index) { this.setState({
        //     systemType: index,
        // })}
    }

    selectProcedure(index) {
        this.setState({
            procedureType: index
        })
    }

    selectIntegration(index) {
        this.setState({
            integrationType: index
        })
    }

    render() {
        return(
            <div className={styles.container}>
                <Renderer/>
                <div className={styles.guiWrapper}>

                    <div className={style(styles.column, styles.verticalizer, styles.left)}>
                        <a href={nav('home')}><TextButton type={'dark'}>Exit</TextButton></a>
                        <div className={styles.status}>
                            <span>59.9 FPS</span>
                            <span>200Y 6M 3D 23:03:02</span>
                        </div>
                    </div>

                    <div className={style(styles.column, styles.verticalizer, styles.center)}>
                        <TextButton type={'basic'}>Hide Interface</TextButton>
                        <div className={styles.animationControls}>
                        </div>
                    </div>

                    <div className={style(styles.column)}>
                        <div className={styles.forms}>
                            <Tile>
                                <TabController
                                    tabs={tabs}
                                    selected={this.state.systemType} onClick={this.selectSystem}/>
                                { (this.state.systemType === 0)
                                ?
                                    <Fragment>
                                        {/*TODO:: Move to component*/}
                                        <ul className={styles.planetList}>
                                            { planets.map((planet, index) =>
                                                <li className={styles.planetRow} key={index}>
                                                    <span>{planet.name}</span>
                                                    <span>{planet.mass} kg</span>
                                                </li>
                                            )}
                                        </ul>
                                        <TextButton type={'secondary'}>Edit System</TextButton>
                                    </Fragment>
                                :
                                    <Fragment>
                                        <div className={styles.formElement}>
                                            <label>Procedure Type</label>
                                            <Dropdown options={procedureOptions} selected={this.state.procedureType} onClick={this.selectProcedure}/>
                                        </div>
                                        <div className={styles.formElement}>
                                            <label>Bodies</label>
                                            <input type={'number'} placeholder={'Bodies'} value={this.state.bodyCount} onChange={e => this.setState({bodyCount: e.target.value})}/>
                                        </div>
                                        <TextButton type={'primary'}>Generate</TextButton>
                                    </Fragment>
                                }
                            </Tile>

                            <Tile>
                                <div className={styles.formElement}>
                                    <label>Integration Method</label>
                                    <Dropdown options={integrationOptions} selected={this.state.integrationType} onClick={this.selectIntegration}/>
                                </div>
                                <div className={styles.formElement}>
                                    <label>Delta (s)</label>
                                    <input type={'number'} placeholder={'Delta'} value={3600}/>
                                </div>
                            </Tile>

                            <Tile>
                                <div className={styles.toggleRow}>
                                    <span>Cinematic Render</span>
                                    <Toggle on={false} onClick={() => {}}/>
                                </div>
                                <div className={styles.toggleRow}>
                                    <span>Show Logs</span>
                                    <Toggle on={false} onClick={() => {}}/>
                                </div>
                                <div className={styles.toggleRow}>
                                    <span>Draw Paths</span>
                                    <Toggle on={false} onClick={() => {}}/>
                                </div>
                            </Tile>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}