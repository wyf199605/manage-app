import * as React from "react";
import "./style.scss";
import {Link, RouteComponentProps} from "react-router-dom";
import {hot} from "react-hot-loader/root";
import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from "react-redux";
import {StoreState} from "../../store";
import {UserInfoState} from "../../store/reducers/userInfo";
import {Actions} from "../../store/actions";
import {storageCreator, StorageProps} from "../../utils/storageCreator";
import {Button} from "../../components/button";
import {Input} from "../../components/input";


interface IStateProps {
    userInfo: UserInfoState;
}

interface IDispatchProps {
    recodeHandler: (userInfo: UserInfoState) => void;
}

const mapStateToProps: MapStateToPropsParam<IStateProps, any, StoreState> = (state) => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchProps, any> = (dispatch) => {
    return {
        recodeHandler: (userInfo) => {
            dispatch({
                type: Actions.RECORD_USER_INFO,
                userInfo: userInfo
            });
        }
    };
};

interface ISubmitParam {
    username: string;
    password: string;
    remember: boolean;
}

class LoginPage extends React.Component<IStateProps & IDispatchProps & RouteComponentProps & StorageProps<'username' | 'password'>>{

    render() {
        let {
            username,
            password
        } = this.props.storage.get();

        username && (username = atob(username));
        password && (password = atob(password));

        return <div className="login-page">
            <Button>aaa</Button>
            <Button type="primary">aaa</Button>
            <Button type="info">aaa</Button>
            <Button type="danger">aaa</Button>
            <Button type="warn" disabled={true}>aaa</Button>
            <Button type="link">aaa</Button>
            <Input/>
        </div>;
    }
}

// 热更新
export default hot(
    // redux connect连接
    connect(mapStateToProps, mapDispatchToProps)(
        storageCreator('username', 'password')(
            LoginPage
        )
    )
);

