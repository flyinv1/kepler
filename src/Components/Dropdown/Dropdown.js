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
        this.hideOnBlur = this.hideOnBlur.bind(this);
    }

    hideOnBlur(event) {
        if (event.target !== this.dropdown && !this.dropdown.contains(event.target)) {
            this.toggle();
        }
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                window.addEventListener('click', this.hideOnBlur)
            } else {
                window.removeEventListener('click', this.hideOnBlur)
            }
        })
    }

    render() {
        const active = (this.props.selected >= 0);
        const selectedItem = this.props.options[this.props.selected];
        const activeContent = (active) ? selectedItem : this.props.placeholder || 'Select a value';
        const activeStyle = (active) ? '' : styles.placeholder;
        const expandedStyle = (this.state.expanded) ? styles.expanded : '';

        return (
            <div className={style(styles.container, this.props.className)} onClick={this.toggle} ref={el => this.dropdown = el}>
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
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
};

export default Dropdown;
