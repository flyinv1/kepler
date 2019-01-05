import React, { Component } from 'react';

//Pages
import Landing from "./Pages/Landing/landing";
import Simulator from "./Pages/Simulator/simulator";
import NotFound from "./Pages/NotFound/notFound.js";

const Pages = {
    '': Landing,
    '#/': Landing,
    '#/simulator': Simulator,
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
