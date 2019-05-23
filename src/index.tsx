import * as React from 'react';
import * as ReactDOM from "react-dom";
import {TextInput} from "./components/text";
import "./style.scss";

ReactDOM.render(
    <div>
        <TextInput />
        <TextInput />
        <div>1231231232</div>
    </div>
    ,
    document.getElementById("app")
);

if (module.hot) {
    module.hot.accept();
}


