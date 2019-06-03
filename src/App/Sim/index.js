import React, { Component } from 'react';
import { ThreeContainer } from 'ThreeJS';
import styles from './sim.module.scss';
import TabController from "Components/TabController/TabController";
import Dropdown from "Components/Dropdown/Dropdown";
import Tile from "Components/Tile/Tile";
import Tooltip from "Components/Tooltip/Tooltip";
import {nav} from "utils";
import {IconButton, TextButton} from "Components/Button/Button";
import {AddButton} from "Components/Button";

const options = ['Symplectic Euler', 'Standard Euler', 'Galactic', 'GPU - WebGL'];

export default class Simulator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            value: -1,
        };
        this.selectTab = this.selectTab.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    selectTab(index) {
        if (index !== this.state.selected) {
            this.setState({
                selected: index
            });
        }
    }

    selectValue(index) {
        if (index !== this.state.value) {
            this.setState({
                value: index
            })
        }
    }

    render() {

        const helper =
            <a href={nav('simulator')}>This is short</a>;
        return(
            <div>
                <h1>Kepler!</h1>
                <TabController tabs={['Tab 1', 'Tab 2']} selected={this.state.selected} className={styles.test} callback={this.selectTab}/>
                <Dropdown options={options} selected={this.state.value} callback={this.selectValue}/>
                <Tile>
                    <h1>Test</h1>
                    <span>Child content</span>
                </Tile>
                <ThreeContainer className={styles.container} type={'dark'}/>
            </div>
        )
    }

}