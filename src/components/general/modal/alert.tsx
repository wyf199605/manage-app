import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal} from "./index";
import {Button} from "../button";

export function modalAlert(msg: any, title = '提示', onClick?: Function, container = document.body){
    let div = document.createElement('div');
    container.appendChild(div);

    let close = () => {
        container.removeChild(div);
    };

    ReactDOM.render(
        <Modal
            className="modal-alert-wrapper"
            title={title}
            visible={true}
            onClose={close}
            footer={<Button className="alert-button" type="primary" block={true} onClick={() => {
                onClick && onClick();
                close();
            }}>确定</Button>}
        >
            {msg}
        </Modal>,
        div
    );
}
