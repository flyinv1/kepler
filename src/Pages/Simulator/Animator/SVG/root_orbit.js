import React, {Component} from 'react';
import styles from './svg.module.scss';
import convertToPath from '../../../../Computation/AnimationHelpers/convertToPath';


export default class RootOrbit extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <g style={this.props.style}>
                <path d={this.props.path} className={styles.orbitPath}/>
                <circle cx={0} cy={0} r={0.05} className={styles.body}>
                    <animateMotion path={this.props.path} dur={this.props.duration} repeatCount="indefinite" fill="freeze">
                    </animateMotion>
                </circle>
            </g>
        )
    }


}