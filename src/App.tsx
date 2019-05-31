import * as React from "react";
import {AppRouter} from "./router";
import {Provider} from "react-redux";
import {hot} from "react-hot-loader/root";
import {store} from "./store";

@hot
export class App extends React.Component{
    render(){
        return <Provider store={store}>
            <AppRouter/>
        </Provider>;
    }
}

