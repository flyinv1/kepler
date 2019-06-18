import React, {Component} from 'react';
import styles from './field.module.scss';
import PropTypes from 'prop-types';
import {style} from "utils";

class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visited: false,
        };
        this.visit = this.visit.bind(this);
    }

    visit() {
        if (!this.state.visited) this.setState({visited: true});
    }

    render() {

        const showError = (this.state.visited && !this.props.valid && this.props.hasOwnProperty('errorMessage') && this.props.hasOwnProperty('valid'));

        return (
            <div className={style(styles.container, this.props.className)} onClick={this.visit}>

                {(this.props.title) && <span className={styles.title}>{this.props.title}</span>}

                {/*{(this.props.hint) && <span className={styles.hint}>{this.props.hint}</span>}*/}

                {this.props.children}

                {(showError) && <span className={styles.error}>{this.props.errorMessage}</span>}

            </div>
        );
    }
}

Field.propTypes = {
    title: PropTypes.string,
    hint: PropTypes.string,
    children: PropTypes.node.isRequired,
    valid: PropTypes.bool,
    errorMessage: PropTypes.string,
};

export default Field;