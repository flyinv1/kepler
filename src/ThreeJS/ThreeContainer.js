import React, { Component } from 'react';
import threeEntryPoint from './ThreeEntryPoint';

export default class ThreeContainer extends Component {

    componentDidMount() {
        threeEntryPoint(this.threeRoot);
    }

    render() {
        return (
            <div className={this.props.className} ref={element => this.threeRoot = element}/>
        )
    }
}