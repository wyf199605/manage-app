import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {Button, Input} from "antd";
import {hot} from "react-hot-loader/root";

console.log(module);

@hot
export default class HomePage extends React.Component<RouteComponentProps>{
    render(){
        return <div>
            <div>
                <Link to={"/login"}>login</Link>
            </div>
            <div>
                <Link to={"/home"}>home</Link>
            </div>
            <div>
                <Button type={"primary"}>按钮</Button>
            </div>
            <div>
                <Input/>
            </div>
        </div>;
    }
}


