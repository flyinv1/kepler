import React, { Component } from 'react';
import styles from './docs.module.scss';
import {nav} from "../../utils";
import PAGES from './pages';

export default class Docs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };

        this.setSelected = this.setSelected.bind(this);
    }

    setSelected(index) {
        this.setState({
            index: index,
        })
    }

    render() {
        let Title = PAGES[this.state.index].title;
        let Docs = PAGES[this.state.index].component;

        let Next = () => ((PAGES.length) > this.state.index + 1) && <button onClick={() => this.setSelected(this.state.index + 1)}>Next: {PAGES[this.state.index + 1].title}</button>;

        let Back = () => (this.state.index > 0) && <button onClick={() => this.setSelected(this.state.index - 1)}>Previous: {PAGES[this.state.index - 1].title}</button>;

        return(
            <div className={styles.container}>
                <a href={nav('')}><button className={styles.backButton}>Exit</button></a>
                <div className={styles.wrapper}>
                    <div className={styles.nav}>
                        <ul> {
                            PAGES.map((page, i) =>
                                <li onClick={() => this.setSelected(i)} className={(i === this.state.index) ? styles.selected : ''}> {page.nav} </li>)
                        } </ul>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h1>{Title}</h1>
                        </div>
                        <Docs/>
                        <div className={styles.controls}>
                            <div><Back/></div>
                            <div><Next/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}