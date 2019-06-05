import * as React from 'react';
import * as ReactDOM from "react-dom";
import {App} from "./App";
import "./style/index.scss";

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);

// if (module.hot) {
//     module.hot.accept((err) => {
//         err && console.log(err);
//     });
// }


