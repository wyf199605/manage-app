import * as React from "react";
import {hot} from "react-hot-loader/root";

@hot
export default class TestPage extends React.Component <obj> {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render(): React.ReactNode {
        return <div>
            testPage
        </div>;
    }

}

