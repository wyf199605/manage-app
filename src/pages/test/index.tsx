import * as React from "react";
import {hot} from "react-hot-loader/root";

class TestPage extends React.Component <obj> {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {

    }

    render(): React.ReactNode {
        return <div>
            testPage
        </div>;
    }

}

export default hot(TestPage);

