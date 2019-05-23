import * as React from 'react';
import * as ReactDOM from "react-dom";
import {TextInput} from "./components/text";
import "./style.scss";
import {App} from "./App";

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);

if (module.hot) {
    module.hot.accept();
}


