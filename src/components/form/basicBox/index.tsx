import * as React from "react";
import "./style.scss";

export interface IBasicBoxProps {
    type: "checkbox" | "radio";
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    name?: string;
    disabled?: boolean;
}

export class BasicBox extends React.Component<IBasicBoxProps>{
    render(){
        let {
            type,
            className,
            name,
            children,
            checked,
            onChange,
            disabled
        } = this.props;

        return <label
            className={"basic-box-wrapper " + className}
            data-input-type={type}
            data-checked={checked}
            data-disabled={disabled}
        >
            <span className="box">
                <input
                    type={type}
                    name={name}
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) => {
                        onChange && onChange(event);
                    }}
                />
                <span className="box-inner"/>
            </span>
            <span className="box-text">{children}</span>
        </label>;
    }
}
