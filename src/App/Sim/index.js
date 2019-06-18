import React, { Component } from 'react';
import { Renderer } from 'ThreeJS';
import styles from './sim.module.scss';

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
        return(
            <div className={styles.container}>
                <Renderer/>
            </div>
        )
    }

}