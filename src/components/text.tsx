import * as React from "react";

interface IState {
    value: string
}

export class TextInput extends React.Component<{}, IState>{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    changHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.target.value
        })
    };

    render(){
        return <div>
            <input type="text" value={this.state.value} onChange={this.changHandler}/>
        </div>
    }
}
