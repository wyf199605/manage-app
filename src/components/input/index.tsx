import * as React from "react";

export interface IInputProps {
    type?: "text" | "password";
    placeholder?: string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface IInputState {
    value: string
}

export class Input extends React.Component<IInputProps, IInputState>{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.target.value
        });
    };

    render(){
        return <div>
            <input type="text" value={this.state.value} onChange={this.changeHandler}/>
        </div>
    }
}
