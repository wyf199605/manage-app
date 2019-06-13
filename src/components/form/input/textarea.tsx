import * as React from "react";
import {ReactResizeObserver} from "../../../utils/ReactResizeObserver";
import {calculateNodeHeight} from "./calculateNodeHeight";
import {validateControlled} from "../validateControlled";

interface ITextareaProps {
    defaultValue?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    placeholder?: string;
    autosize?: boolean | AutoSize;
    readOnly?: boolean;
}

interface ITextareaState {
    value: string;
    textareaStyles?: React.CSSProperties;
}

type AutoSize = {
    minRows: number;
    maxRows: number;
};

function onNextFrame(cb: () => void) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId: number) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

export class Textarea extends React.Component<ITextareaProps, ITextareaState>{

    private readonly _controlled: boolean;
    protected nextFrameActionId: number;
    protected textAreaRef: HTMLTextAreaElement;

    constructor(props: ITextareaProps){
        super(props);
        this._controlled = 'value' in props;
        this.state = {
            value: props.defaultValue
        };

        validateControlled(this);
    }

    resizeOnNextFrame(){
        if (this.nextFrameActionId) {
            clearNextFrameAction(this.nextFrameActionId);
        }
        this.nextFrameActionId = onNextFrame(() => this.resizeTextarea());
    }

    resizeTextarea(){
        const { autosize } = this.props;
        if (!autosize || !this.textAreaRef) {
            return;
        }
        const { minRows, maxRows } = autosize as AutoSize;
        const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
        this.setState({ textareaStyles });
    }

    changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>){
        if (!this._controlled) {
            this.resizeTextarea();
        }
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
            readOnly,
            autosize
        } = this.props;

        return <ReactResizeObserver disabled={!autosize} onResize={() => {
            this.resizeOnNextFrame();
        }}>
            <textarea
                className="textarea-wrapper"
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    this.changeHandler(e);
                }}
                disabled={disabled}
                readOnly={readOnly}
                style={this.state.textareaStyles}
                ref={(el) => this.textAreaRef = el}
            />
        </ReactResizeObserver>;
    }
}
