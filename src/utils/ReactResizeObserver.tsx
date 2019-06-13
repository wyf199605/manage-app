import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";
import * as ReactDOM from "react-dom";

export interface IReactResizeObserverProps {
    disabled?: boolean;
    onResize?: () => void;
}

export class ReactResizeObserver extends React.Component<IReactResizeObserverProps>{
    static defaultProps: Partial<IReactResizeObserverProps> = {
        disabled: false
    };

    resizeObserver: ResizeObserver = null;

    componentDidMount(): void {
        this.initObserver();
    }

    componentDidUpdate(prevProps: Readonly<IReactResizeObserverProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.initObserver();
    }

    componentWillUnmount(): void {
        this.destroyObserver();
    }

    initObserver(){
        let disabled = this.props.disabled,
            onResize = this.props.onResize,
            element = ReactDOM.findDOMNode(this) as Element;

        if(!disabled && !this.resizeObserver && element){
            let ro = this.resizeObserver = new ResizeObserver(() => {
                onResize && onResize();
            });
            ro.observe(element);
        }else if(disabled){
            this.destroyObserver();
        }
    }

    destroyObserver(){
        if(this.resizeObserver){
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    render(){
        return React.Children.only(this.props.children);
    }
}
