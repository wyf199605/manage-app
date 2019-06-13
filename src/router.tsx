import * as React from "react";
import {BrowserRouter, Route, RouteProps, Switch} from "react-router-dom";
import {PageLoader} from "./utils/pageLoader";

const HomePage = PageLoader({
        loader: () => import(/* webpackChunkName: "home" */'@pages/home')
    }),
    LoginPage = PageLoader({
        loader: () => import(/* webpackChunkName: "login" */'@pages/login')
    }),
    TestPage = PageLoader({
        loader: () => import(/* webpackChunkName: "Test" */'@pages/test')
    });

export class AppRouter extends React.Component {
    render(){
        return <BrowserRouter>
            <Switch>
                <Route path={"/home"} component={HomePage}/>
                <Route path={"/login"} component={LoginPage}/>
                <Route path={"/test"} component={TestPage}/>
                <Route path={"/"} component={LoginPage}/>
            </Switch>
        </BrowserRouter>;
    }
}
