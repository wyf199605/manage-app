import * as React from "react";
import {JSXElementConstructor} from "react";
import {CheckBox} from "./index";

type CheckBoxNode = React.ReactElement<ICheckBoxGroupProps, JSXElementConstructor<ICheckBoxGroupProps>>;

interface ICheckBoxGroupProps {
    layout?: "horizontal" | "vertical";
    children?: CheckBoxNode | CheckBoxNode[];
}

export class Group extends React.Component<ICheckBoxGroupProps> {
    static defaultProps: Partial<ICheckBoxGroupProps> = {
        layout: 'horizontal'
    };

    render(){
        let {
            layout
        } = this.props;


        return <div className="check-box-group-wrapper" data-layout={layout}>
            {React.Children.map<React.ReactNode, CheckBoxNode>(this.props.children, (child) => {
                if(typeof child === 'object' && child.type.name === CheckBox.name){
                    return <CheckBox key={child.key} {...child.props}/>;
                }else{
                    return child;
                }
            })}
        </div>;
    }
}
