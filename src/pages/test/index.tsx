import * as React from "react";
import {hot} from "react-hot-loader/root";
import {connect} from "react-redux";

const state = {
    name: 'wyf',
    changeName: () => {
        state.name = 'test';
    }
};

const TestContext = React.createContext(state);

@hot
@connect<{}, {} ,{}, obj>((store) => ({name: store.name}))
export default class TestPage extends React.Component <obj, typeof state>{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: state.name,
            changeName: () => {
                this.setState({
                    name: 'gl'
                });
            }
        };
    }

    render(): React.ReactNode{
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

