import React from 'react';
import PropTypes from 'prop-types';
import "./formSection.css";

const FormSection = (props) => {
    return(
        <div>
            <div className={"form-section-title-wrapper"}>
                <h2 className={"form-section-title"}>{props.title}</h2>
            </div>
            <div className={"form-section-inputs"}>
                { props.children }
            </div>
        </div>
    )
};

FormSection.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default FormSection;