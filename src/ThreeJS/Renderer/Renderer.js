import React, { Component } from 'react';
import threeEntryPoint from '../../ThreeJS/ThreeEntryPoint';
import styles from './'

import {makeRequest} from "../../utils";

const shaderArr = [
    'test'
];

export default class Renderer extends Component {

    componentDidMount() {
        const newShaders = this.requestShaders(shaderArr);

        const shaders = {
            vert: '',
            frag: ''
        };

        //TODO:: load component only if shaders are loaded
        threeEntryPoint(this.threeRoot, shaders);

        console.log(newShaders);
    }

    requestShaders(shaderArr, callback) {
        const shaders = {};
        shaderArr.map(fileName => [
            `Shaders/${fileName}.vert`,
            `Shaders/${fileName}.frag`
        ]).flat().map(url => makeRequest())
    }

    render() {
        return (
            <div className={styles.renderBlock}>
                <div className={styles.renderContainer} ref={element => this.threeRoot = element}/>
            </div>
        )
    }
}

