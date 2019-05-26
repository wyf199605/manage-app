import * as React from "react";
import {Link} from "react-router-dom";
import {Button, Input} from "antd";
import {hot} from "react-hot-loader/root";

@hot
export default class HomePage extends React.Component{
    render(){
        return <div>
            <Link to={"/login"}>aaaa1233</Link>
            <Button type={"primary"}>按钮</Button>
            <Input/>
        </div>
    }
}

