import React, { Component } from 'react';
import { connect } from 'react-redux';

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={""}>
                This is the system!
            </div>
        )
    }

}

export default connect()(System);

