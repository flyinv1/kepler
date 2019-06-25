import React, { Component } from 'react';
import Simulator from 'App/Sim';
import Landing from 'App/Landing';

const Pages = {
    "": Landing,
    "simulator": Simulator,
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: window.location.hash
        };
    }

    componentDidMount() {
        //TODO:: Add query support
        window.addEventListener("hashchange", () => {
            this.setState({
                location: window.location.hash
            });
        });
    }

    render() {
        const location = this.state.location.slice(2);
        let Page = Pages[location] || Landing;
        const nav = {
            location: location
        };
        return (
            <div className="App">
               <Page nav={nav}/>
            </div>
        );
    }
}

export default App;
