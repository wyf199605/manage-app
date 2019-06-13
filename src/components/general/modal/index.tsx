import * as React from "react";
import "./style.scss";
import {Button} from "../button";
import {modalAlert} from "./alert";
import {modalConfirm} from "./confirm";

export interface IModalProps {
    title?: string;
    width?: string;
    className?: string;
    mask?: boolean;
    maskClosable?: boolean;
    visible?: boolean;
    zIndex?: number;
    closable?: boolean;
    onClose?: () => void;
    footer?: React.ReactNode;
    onOk?: Function;
    onCancel?: Function;
}

export class Modal extends React.Component<IModalProps>{

    static alert = modalAlert;
    static confirm = modalConfirm;

    static defaultProps: Partial<IModalProps> = {
        visible: false,
        closable: true,
        mask: true,
        maskClosable: true,
        zIndex: 1001,
        className: ''
    };

    protected wrapper: HTMLDivElement;

    componentDidMount(): void {
        this.focus();
    }
    componentDidUpdate(): void {
        this.focus();
    }

    protected focus(){
        if(this.props.visible){
            this.wrapper.focus();
        }
    }

    closeHandler(){
        let onClose = this.props.onClose;
        onClose && onClose();
    }

    keyUpHandler(e: React.KeyboardEvent){
        console.log(e.keyCode);
    }

    render(){
        let {
            zIndex,
            visible,
            children,
            className,
            mask,
            maskClosable,
            width
        } = this.props;

        let style = {
            zIndex,
            display: visible ? null : 'none'
        };

        return <div className="modal-wrapper">
            {mask
                ? <div
                    className="modal-mask"
                    style={style}
                    onClick={() => {
                        maskClosable && this.closeHandler();
                    }}
                />
                : null
            }
            <div
                className={`modal-dialog ${className}`}
                style={Object.assign({
                    width: width
                }, style)}
                tabIndex={-1}
                onKeyUp={(e) => {
                    this.keyUpHandler(e);
                }}
                ref={(el) => this.wrapper = el}
            >
                {this.renderHeader()}
                <div className="modal-body-wrapper">
                    {children}
                </div>
                {this.renderFooter()}
            </div>
        </div>;
    }

    renderHeader(){
        let {
            title,
            closable
        } = this.props;
        return title === null ? null : <ModalHeader closable={closable} onClose={() => {this.closeHandler()}}>
            {title || '提示'}
        </ModalHeader>;
    }

    renderFooter(){
        let {
            footer,
            onCancel,
            onOk
        } = this.props;
        if(footer === null){
            return null;
        }

        return <div className="modal-footer-wrapper">
            {footer || [
                <Button
                    key="cancel"
                    onClick={() => {
                        onCancel && onCancel();
                    }}
                >
                    取消
                </Button>,
                <Button
                    key="sure"
                    type="primary"
                    onClick={() => {
                        onOk && onOk();
                    }}
                >
                    确定
                </Button>
            ]}
        </div>;
    }

}

interface IModalHeaderProps {
    closable: boolean;
    onClose: () => void;
}

class ModalHeader extends React.Component<IModalHeaderProps>{
    render(){
        let {
            children,
            closable,
            onClose
        } = this.props;

        return <div className="modal-header-wrapper">
            <h1 className="modal-title">{children}</h1>
            {closable
                ? <span
                    className="modal-close iconfont icon-close"
                    onClick={() => {
                        onClose && onClose();
                    }}
                />
                : null
            }
        </div>;
    }
}
