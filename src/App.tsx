import * as React from "react";
import {AppRouter} from "./router";
import {hot} from "react-hot-loader/root";

@hot
export class App extends React.Component{
    render(){
        return <div>
            <AppRouter/>
        </div>;
    }
}




