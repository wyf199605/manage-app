import * as React from "react";
import {TextInput} from "./components/text";
import {hot} from "react-hot-loader/root";


@hot
export class App extends React.Component{
    render(){
        return <div>
            <TextInput />
            <TextInput />
        </div>
    }
}
