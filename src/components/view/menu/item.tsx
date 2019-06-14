import * as React from "react";

export interface IMenuItemProps {
    title: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: Function;
    open?: boolean;
    selected?: boolean;
}

interface IMenuItemState {
    visible: boolean;
}

export class MenuItem extends React.Component<IMenuItemProps, IMenuItemState>{
    static defaultProps: Partial<IMenuItemProps> = {
        open: false,
        disabled: false,
        selected: false
    };

    static getDerivedStateFromProps(props: IMenuItemProps, state: IMenuItemState){
        return Object.assign({}, state, {
            visible: props.open
        });
    }

    constructor(props){
        super(props);
        this.state = {
            visible: props.open
        };
    }

    render(){
        let {
            title,
            children,
            onClick
        } = this.props;

        let leaf = !!children;

        return <div className="menu-item-wrapper">
            <div className="menu-item-title" onClick={() => onClick && onClick()}>
                {title}
            </div>
            {leaf
                ? <div className="menu-sub-items" style={{display: this.state.visible ? '' : 'none'}}>
                    {children}
                </div>
                : null
            }
        </div>;
    }
}
