import * as React from "react";
import "./style.scss";
import {Group} from "./group";

export interface ICheckBoxProps {
    defaultChecked?: boolean;
    clickArea?: "all" | "box";
    // checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
}

interface ICheckBoxState {
    checked: boolean;
}

export class CheckBox extends React.Component<ICheckBoxProps, ICheckBoxState>{

    static Group = Group;

    static defaultProps:Partial<ICheckBoxProps> = {
        defaultChecked: false,
        clickArea: 'all',
        disabled: false
    };

    constructor(props){
        super(props);
        this.state = {
            checked: props.defaultProps
        };
    }

    checkedHandler() {
        this.setState((prevState => {
            return {
                checked: !prevState.checked
            };
        }));
    }

    spaceHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.keyCode === 32) {
            this.checkedHandler();
        }
    };

    render(){
        let {
            children,
            clickArea
        } = this.props;

        let allClickHandler = () => {
            clickArea === 'all' && this.checkedHandler();
        };
        let boxClickHandler = () => {
            clickArea === 'box' && this.checkedHandler();
        };

        return <div
            className="check-box-wrapper"
            data-click-area={clickArea}
            data-checked={this.state.checked}
            onClick={allClickHandler}
        >
            <span
                className="check-box-rect"
                onClick={boxClickHandler}
                onKeyUp={this.spaceHandler}
                tabIndex={0}
            />
            {children && <span className="check-box-text">{children}</span>}
        </div>;
    }
}

