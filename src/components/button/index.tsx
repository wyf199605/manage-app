import * as React from "react";
import './style.scss';

export interface IButtonProps {
    disabled?: boolean;
    type?: "default" | "primary" | "warn" | "danger" | "info" | "link";
    htmlType?: "submit" | "button";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    block?: boolean;
}

export class Button extends React.Component<IButtonProps>{
    static defaultProps: Partial<IButtonProps> = {
        type: 'default',
        htmlType: 'button',
        disabled: false,
        block: false
    };

    render(){
        let {
                type,
                htmlType,
                onClick,
                disabled,
                block
            } = this.props,
            className = [
                'btn-wrapper',
                'btn-' + type,
                block ? 'btn-block' : null
            ];

        return <button
            className={className.join(' ')}
            type={htmlType}
            disabled={disabled}
            onClick={onClick}
        >
            {this.props.children}
        </button>;
    }
}
