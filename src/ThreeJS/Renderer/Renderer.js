import React, { Component } from 'react';
import threeEntryPoint from '../Scene';
import styles from './renderer.module.scss';

import {makeRequest} from "../../utils";
import LoadingIcon from "Components/LoadingIcon/LoadingIcon";
const shaderArr = [
    'sun.frag',
    'sun.vert',
    'velocity.frag',
    'position.frag',
];

export default class Renderer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            fetching: true,
        };
    }

    componentDidMount() {
        const newShaders = this.requestShaders(shaderArr, (shaders) => {
            const shaderObj = shaders.reduce((obj, shader) => {
                const responseURLFrag = shader.responseURL.split('/');
                const fileName = responseURLFrag[responseURLFrag.length - 1];
                const shaderName = fileName.split('.')[0];
                const fileType = fileName.split('.')[1];
                if (!obj.hasOwnProperty(shaderName)) obj[shaderName] = {vert: '', frag: ''};
                obj[shaderName][fileType] = shader.responseText;
                return obj
            }, {});
            this.setState({fetched: true});
            threeEntryPoint(this.threeRoot, shaderObj);
        });
    }

    requestShaders(shaderArr, callback) {
        // Promise.all(shaderArr.map(fileName => [
        //     `Shaders/${fileName}.vert`,
        //     `Shaders/${fileName}.frag`
        // ]).flat().map(url => makeRequest(url))).then(output => callback(output));
        Promise.all(shaderArr.map(url => makeRequest(`Shaders/${url}`))).then(output => callback(output));
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.fetched ?
                    <div className={styles.renderWrapper} ref={element => this.threeRoot = element}/> :
                    <div className={styles.empty}>
                        <LoadingIcon size={80}/>
                        <span>Initializing Shaders</span>
                    </div>
                }
            </div>
        )
    }
}

