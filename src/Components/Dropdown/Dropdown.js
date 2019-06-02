import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.scss';
import {style} from "utils";

import rightArrow from 'Assets/rightArrow.svg';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const active = (this.props.selected >= 0);
        const selectedItem = this.props.options[this.props.selected];
        const activeContent = (active) ? selectedItem : this.props.placeholder || 'Select a value';
        const activeStyle = (active) ? '' : styles.placeholder;
        const expandedStyle = (this.state.expanded) ? styles.expanded : '';

        return (
            <div className={style(styles.container, this.props.className)} onClick={this.toggle}>
                <div className={style(styles.activeOption, activeStyle, expandedStyle)}>
                    <span>{activeContent}</span>
                    <img src={rightArrow} alt={''}/>
                </div>
                {(this.state.expanded) &&
                <div className={styles.dropContainer}>
                    {this.props.options.map((option, index) => {
                        return (
                            <div className={style(styles.option)} key={index} onClick={() => this.props.callback(index)}>
                                { option }
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
};

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
};

export default Dropdown;
