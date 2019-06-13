import * as React from "react";
import {JSXElementConstructor} from "react";
import {ReactNode} from "react";
import {CheckBox, ICheckBoxProps} from "./index";
import {BoxGroup} from "../basicBox/group";
import {validateControlled} from "../validateControlled";

type CheckBoxNode = React.ReactElement<
ICheckBoxProps & Readonly<{ children?: ReactNode }>,
JSXElementConstructor<ICheckBoxProps & Readonly<{ children?: ReactNode }>>
>;

interface ICheckBoxGroupProps {
    children?: CheckBoxNode | CheckBoxNode[];
    name?: string; // 设置CheckBox name属性
    layout?: "horizontal" | "vertical"; // 布局方式，水平or垂直，默认水平
    disabled?: boolean; // 是否不可点击
    defaultValues?: string[]; // 默认选中值，在受控状态下无效
    values?: string[]; // 选中值，开启受控状态
    onChange?: (values: string[]) => void; // 值改变时触发
}

interface ICheckBoxGroupState {
    values: string[];
}

export class CheckBoxGroup extends React.Component<ICheckBoxGroupProps, ICheckBoxGroupState> {
    static defaultProps: Partial<ICheckBoxGroupProps> = {
        defaultValues: []
    };

    protected _controlled: boolean;

    constructor(props: ICheckBoxGroupProps){
        super(props);
        this._controlled = 'values' in props;
        this.state = {
            values: props.defaultValues
        };

        validateControlled(this, 'values');
    }

    toggleNameHandler(value: string){
        let values = this.state.values,
            onChange = this.props.onChange,
            isAppend = values.find((item) => item === value);

        values = isAppend
            ? values.filter((item) => item !== value)
            : values.concat(value);

        this.setState({
            values
        });
        onChange && onChange(values);
    }

    checkBoxPropsInit(itemProps: ICheckBoxProps): ICheckBoxProps{
        let disabled = this.props.disabled,
            values = this._controlled ? this.props.values : this.state.values,
            value = itemProps.value,
            name = itemProps.name;
        return {
            disabled: typeof disabled === 'undefined' ? itemProps.disabled : disabled,
            checked: !!~values.indexOf(value),
            name: name,
            value: value,
            onChange: () => {
                this.toggleNameHandler(value);
            }
        };
    }

    render(){
        let {
            children,
            layout
        } = this.props;

        return <BoxGroup
            className={"checkbox-group-wrapper"}
            Box={CheckBox}
            propsInit={(props) => this.checkBoxPropsInit(props)}
            layout={layout}
        >
            {children}
        </BoxGroup>;
    }
}
