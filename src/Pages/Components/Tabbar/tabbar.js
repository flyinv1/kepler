import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './tabbar.module.scss';

class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(index) {
        if (index !== this.state.index) {
            this.setState({
                index: index
        })}
    }

    render() {
        let Tab = this.props.tabs[this.state.index].tab || <h1>Error displaying content</h1>;
        return (
            <section>
                <div className={styles.controller}>
                    {
                        this.props.tabs.map((tab, i) => {
                            let selected = (this.state.index === i) ? styles.selected : "";
                            return (
                                <div key={i} onClick={() => this.selectTab(i)} className={[styles.tab, selected].join(' ')}>
                                    {tab.title}
                                </div>
                            )}
                        )
                    }
                </div>
                <div className={styles.content}>
                    <Tab/>
                </div>
            </section>
        )
    }
}

Tabbar.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            page: PropTypes.element,
            title: PropTypes.string,
        })
    ).isRequired,
};

export default Tabbar;



