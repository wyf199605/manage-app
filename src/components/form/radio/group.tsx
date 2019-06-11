import * as React from "react";
import {ReactNode} from "react";
import {JSXElementConstructor} from "react";
import {IRadioProps, Radio} from "./index";

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
    static defaultProps: Partial<IRadioGroupProps> = {
        layout: 'horizontal'
    };

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

    renderRadios(){
        let {
            disabled,
            name
        } = this.props;

        let groupValue = this._controlled ? this.props.value : this.state.value;

        return React.Children.map<React.ReactNode, RadioNode>(this.props.children, (child) => {
            if(typeof child === 'object' && child.type.name === Radio.name) {
                let props = child.props,
                    value = props.value;

                if(typeof value !== 'string'){
                    throw new Error(Radio.name + '在' + RadioGroup.name + '中必须有value参数!');
                }

                return <Radio
                    key={child.key}
                    disabled={typeof disabled !== 'undefined' ? disabled : props.disabled}
                    name={name}
                    value={value}
                    checked={value === groupValue}
                    onChange={() => {
                        this.setState({
                            value: value
                        });
                    }}
                >
                    {props.children}
                </Radio>;
            }else{
                return null;
            }
        });
    }

    render(){
        return <div className="radio-group-wrapper" data-layout={this.props.layout}>
            {this.renderRadios()}
        </div>;
    }
}
