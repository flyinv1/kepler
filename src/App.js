import React, { Component } from 'react';

//Pages
import Landing from "./Pages/Landing/landing";
import Simulator from "./Pages/Simulator/simulator";
import NotFound from "./Pages/NotFound/notFound.js";
import symplecticeuler from "./Computation/symplecticEuler";
import Docs from "./Pages/Docs/docs";

const Pages = {
    '': Landing,
    '#/': Landing,
    '#/simulator': Simulator,
    '#/docs': Docs
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: window.location.hash
        };
    }

    componentDidMount() {
        window.addEventListener("hashchange", () => {
            this.setState({
                location: window.location.hash
            });
        });
    }

    render() {
        let Page = Pages[this.state.location] || NotFound;
        return (
            <div className="App">
                <Page/>
            </div>
        );
    }
}

export default App;
