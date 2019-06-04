import * as React from "react";
import "./style.scss";
import {RouteComponentProps} from "react-router-dom";
import {hot} from "react-hot-loader/root";
import {connect} from "react-redux";
import {StoreState} from "../../store";
import {UserInfoState} from "../../store/reducers/userInfo";
import {Actions} from "../../store/actions";

interface IStateProps {
    userInfo: UserInfoState;
}

interface IDispatchProps {
    recodeHandler: (userInfo: UserInfoState) => void;
}

@hot
@connect<IStateProps, IDispatchProps, any, StoreState>((state) => {
    return {
        userInfo: state.userInfo
    };
}, (disptach) => {
    return {
        recodeHandler: (userInfo) => {
            disptach({
                type: Actions.RECORD_USER_INFO,
                userInfo: userInfo
            });
        }
    };
})
export default class LoginPage extends React.Component<IStateProps & IDispatchProps & RouteComponentProps>{



    render(): React.ReactNode {
        console.log(this.props.userInfo);
        return <div className="login-page">
            <input type="text"/>
        </div>;
    }
}
