import * as React from "react";
import {ReactNode} from "react";
import {JSXElementConstructor} from "react";
import {IRadioProps, Radio} from "./index";
import {BoxGroup} from "../basicBox/group";

type RadioNode = React.ReactElement<
IRadioProps & Readonly<{ children?: ReactNode }>,
JSXElementConstructor<IRadioProps & Readonly<{ children?: ReactNode }>>
>;

export interface IRadioGroupProps {
    children: RadioNode | RadioNode[];
    layout?: "horizontal" | "vertical"; // 布局方式，水平or垂直，默认水平
    defaultValue?: any;
    value?: any;
    onChange?: (value: any) => void;
    disabled?: boolean;
    name?: string;
}

interface IRadioGroupState {
    value: any;
}

export class RadioGroup extends React.Component<IRadioGroupProps, IRadioGroupState>{
    protected _controlled;
    constructor(props: IRadioGroupProps){
        super(props);
        this._controlled = typeof props.value !== 'undefined';
        this.state = {
            value: props.defaultValue
        };

        if(this._controlled && typeof props.onChange !== 'function'){
            throw new Error('受控RadioGroup组件必须传入onChange参数');
        }
    }

    radioPropsInit(props: IRadioProps): IRadioProps{
        let {
            disabled,
            name
        } = this.props;
        let groupValue = this._controlled ? this.props.value : this.state.value;
        let value = props.value;

        return {
            disabled: typeof disabled !== 'undefined' ? disabled : props.disabled,
            name: name,
            value: value,
            checked: value === groupValue,
            onChange: () => {
                this.setState({
                    value: value
                });
            }
        };
    }

    render(){
        let {
            layout,
            children
        } = this.props;

        return <BoxGroup
            className={"radio-group-wrapper"}
            Box={Radio}
            layout={layout}
            propsInit={(props) => this.radioPropsInit(props)}
        >
            {children}
        </BoxGroup>;
    }
}
