import * as React from "react";

interface ITextareaProps {
    defaultValue?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    placeholder?: string;
    autosize?: boolean | ITextareaAutoSize;
    readOnly?: boolean;
}

interface ITextareaState {
    value: string;
}

interface ITextareaAutoSize {
    minRows: number;
    maxRow: number;
}

export class Textarea extends React.Component<ITextareaProps, ITextareaState>{

    private readonly _controlled: boolean;
    constructor(props: ITextareaProps){
        super(props);
        this._controlled = typeof props.value !== 'undefined';
        this.state = {
            value: props.defaultValue
        };
    }

    changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState({
            value: e.target.value
        });
        let onChange = this.props.onChange;
        onChange && onChange(e);
    }

    render(){
        let value = this._controlled ? this.props.value : this.state.value;
        let {
            disabled,
            placeholder,
            readOnly
        } = this.props;

        return <textarea
            className="textarea-wrapper"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                this.changeHandler(e);
            }}
            disabled={disabled}
            readOnly={readOnly}
        />;
    }
}
