import * as React from "react";
import {Tree} from "../../tree";

interface IMenuTree {
}

export class Menu extends React.Component{
    render(){
        return <div></div>;
    }
}

interface IMenuTreeProps {
    title: string;
    disabled?: boolean;
}

export class MenuTree extends Tree<IMenuTreeProps>{

}
