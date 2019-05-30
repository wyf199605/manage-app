import * as React from "react";
import {hot} from "react-hot-loader/root";

const state = {
    name: 'wyf',
    changeName: () => {
        state.name = 'test';
    }
};

const TestContext = React.createContext(state);

@hot
export default class TestPage extends React.Component <obj, typeof state>{
    constructor(props) {
        super(props);
        this.state = {
            name: state.name,
            changeName: () => {
                this.setState({
                    name: 'gl'
                });
            }
        };
    }

    render(){
        return <div>
            <TestContext.Provider value={this.state}>
                <Context/>

            </TestContext.Provider>
        </div>;
    }
}

class Context extends React.Component {
    render(){
        return <div>
            <TestContext.Consumer>
                {(props: typeof state) => <button onClick={() => props.changeName()}>{props.name}</button>}
            </TestContext.Consumer>
        </div>;
    }
}

