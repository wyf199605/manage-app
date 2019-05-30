import * as React from "react";
import "./style.scss";
import {Link} from "react-router-dom";
import {hot} from "react-hot-loader/root";

@hot
export default class LoginPage extends React.Component{

    render(){
        return <div className="login-page">
            <p>
                <Link to="/home">home</Link>
            </p>
            <p>
                <Link to="/test">test</Link>
            </p>
            <input type="text"/>
        </div>;
    }
}
