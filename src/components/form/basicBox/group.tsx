import * as React from "react";
import {ReactNode} from "react";
import {JSXElementConstructor} from "react";

type BoxNode<T> = React.ReactElement<
T & Readonly<{ children?: ReactNode }>,
JSXElementConstructor<T & Readonly<{ children?: ReactNode }>>
>;

export interface IBoxGroupProps<T> {
    layout?: "horizontal" | "vertical"; // 布局方式，水平or垂直，默认水平
    Box: React.ComponentType<T>;
    propsInit: (prop: T) => T;
    className?: string;
    children: BoxNode<T> | BoxNode<T>[];
}

export class BoxGroup<T> extends React.Component<IBoxGroupProps<T>>{
    static defaultProps = {
        layout: 'horizontal',
        className: ''
    };

    render(){
        let {
            layout,
            Box,
            propsInit,
            className,
            children
        } = this.props;

        return <div className={"box-group-wrapper " + className} data-layout={layout}>
            {React.Children.map<React.ReactNode, BoxNode<T>>(children, (child) => {
                if(typeof child === 'object' && child.type.name === Box.name) {
                    let props = propsInit(child.props);
                    return <Box key={child.key} {...props}>
                        {child.props.children}
                    </Box>;
                }else{
                    return null;
                }
            })}
        </div>;
    }
}
