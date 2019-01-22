import React from 'react';
import PropTypes from 'prop-types';
import styles from './systemTable.module.scss';
import {spacedVectorString} from "../../../utils";

const SystemTable = (props) => {
    return (
        <div>
            { props.bodies.length > 0 &&
            <table className={styles.bodiesTable}>
                <tbody>
                <tr className={styles.tableHeader}>
                    <td>Name</td>
                    <td>r [km]</td>
                    <td>v [km]</td>
                    <td>M [kg]</td>
                    <td>R [km]</td>
                </tr>
                {
                    props.bodies.map((body, i) => {
                        return (
                            <tr
                                key={body.id}
                                onClick={() => props.setSelected(i)}
                                className={(i === props.selected) ? styles.selectedRow : ""}
                            >
                                <td>{body.name}</td>
                                <td>{spacedVectorString(body.position)}</td>
                                <td>{spacedVectorString(body.velocity)}</td>
                                <td>{body.mass}</td>
                                <td>{body.radius}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table> }
        </div>
    )
};

SystemTable.propTypes = {
    bodies: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired,
};

export default SystemTable;