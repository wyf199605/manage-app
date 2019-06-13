import * as React from "react";
import "./style.scss";

export type BtnType = "default" | "primary" | "warn" | "danger" | "info" | "link";

export interface IButtonProps {
    className?: string;
    disabled?: boolean;
    type?: BtnType;
    htmlType?: "submit" | "button";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    block?: boolean;
}

export class Button extends React.Component<IButtonProps>{
    static defaultProps: Partial<IButtonProps> = {
        type: 'default',
        htmlType: 'button',
        disabled: false,
        block: false,
        className: ''
    };

    render(){
        let {
                type,
                htmlType,
                onClick,
                disabled,
                block,
                className
            } = this.props,
            classNames = [
                'btn-wrapper',
                className,
                'btn-' + type,
                block ? 'btn-block' : null
            ];

        return <button
            className={classNames.join(' ')}
            type={htmlType}
            disabled={disabled}
            onClick={onClick}
        >
            {this.props.children}
        </button>;
    }
}
