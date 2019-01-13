import React, { Component } from 'react';

//Pages
import Landing from "./Pages/Landing/landing";
import Simulator from "./Pages/Simulator/simulator";
import NotFound from "./Pages/NotFound/notFound.js";
import {addVectors, cross, dot} from "./Computation/vector";
import integrateSystem from "./Computation/symplecticeuler";

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
        var bods = [
            {
                name: "earth",
                position: [0, 0, 0],
                velocity: [0, 0, 0],
                mass: 5.971e24,
            },
            {
                name: "kaeden",
                position: [0, 0, 6378],
                velocity: [0, 0, 0],
                mass: 60,
            },
            {
                name: "matt",
                position: [0, 3000, 3000],
                velocity: [0, 0, 0],
                mass: 5.0e15,
            }
        ];

        integrateSystem(bods, 1.0, 1000);
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
