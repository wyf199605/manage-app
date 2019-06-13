import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal} from "./index";
import {BtnType, Button} from "../button";

interface IConfirmProps {
    msg: string;
    title?: string;
    okText?: string;
    cancelText?: string;
    okType?: BtnType;
    cancelType?: BtnType;
    callback?: (flag: boolean) => void;
}

export function modalConfirm(props: IConfirmProps, container = document.body) {
    let defaultProps: IConfirmProps = {
        msg: '',
        title: '提示',
        okText: '确定',
        cancelText: '取消',
        okType: 'primary',
        cancelType: 'default'
    };
    props = Object.assign(defaultProps, props);
    let confirm = props.callback;

    let div = document.createElement('div');
    container.appendChild(div);

    let close = () => {
        container.removeChild(div);
    };
    ReactDOM.render(
        <Modal
            className="modal-confirm-wrapper"
            title={null}
            visible={true}
            onClose={close}
            footer={[
                <Button key="cancel" type={props.cancelType} onClick={() => {
                    confirm && confirm(false);
                    close();
                }}>
                    {props.cancelText}
                </Button>,
                <Button key="ok" type={props.okType} onClick={() => {
                    confirm && confirm(true);
                    close();
                }}>
                    {props.okText}
                </Button>,
            ]}
        >
            <div className="confirm-title">
                <span className="confirm-icon iconfont icon-warning"/>
                {props.title}
            </div>
            <div className="confirm-content">{props.msg}</div>
        </Modal>,
        div
    );
}
