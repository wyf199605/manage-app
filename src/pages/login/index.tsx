import * as React from "react";
import "./style.scss";
import {Link, RouteComponentProps} from "react-router-dom";
import {hot} from "react-hot-loader/root";
import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from "react-redux";
import {StoreState} from "../../store";
import {UserInfoState} from "../../store/reducers/userInfo";
import {Actions} from "../../store/actions";
import {storageCreator, StorageProps} from "../../utils/storageCreator";
import {Input} from "../../components/form/input";
import {CheckBox} from "../../components/form/checkBox";
import {Radio} from "../../components/form/radio";


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
    constructor(props){
        super(props);
    }

    render() {
        let {
            username,
            password
        } = this.props.storage.get();

        username && (username = atob(username));
        password && (password = atob(password));

        return <div className="login-page">
            <CheckBox indeterminate={true}>测试</CheckBox>
            <CheckBox.Group layout={"vertical"} defaultValues={['1']}>
                <CheckBox value="1">测试</CheckBox>
                <CheckBox value="2">aaa</CheckBox>
            </CheckBox.Group>
            <Radio.Group defaultValue={'1'}>

                <Radio value={'1'}>1</Radio>
                <Radio value={'2'}>2</Radio>
            </Radio.Group>
            <Input
                type="text"
                prefixIcon={<span className="icon-wrapper iconfont icon-browse"/>}
                suffixIcon={<span className="icon-wrapper iconfont icon-browse"/>}
            />
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

