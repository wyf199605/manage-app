import * as React from "react";

export interface IMenuItemProps {
    title: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

export class MenuItem extends React.Component<IMenuItemProps>{
    render(){
        let {
            title,
            children
        } = this.props;
        return <div className="menu-item-wrapper">
            <div className="menu-item-title">{title}</div>
            {children
                ? <div className="menu-sub-items">
                    {children}
                </div>
                : null
            }
        </div>;
    }
}
