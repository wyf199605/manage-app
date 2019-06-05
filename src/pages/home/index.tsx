import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {hot} from "react-hot-loader/root";
import {connect, MapStateToPropsParam} from "react-redux";
import {StoreState} from "../../store";
import {UserInfoState} from "../../store/reducers/userInfo";

interface IStateProps {
    userInfo: UserInfoState;
}

const mapStateToProps: MapStateToPropsParam<IStateProps, any, StoreState> = (state) => {
    return {
        userInfo: state.userInfo
    };
};

class HomePage extends React.Component<RouteComponentProps>{
    render(){
        console.log(this.props);
        return <div>
            <div>
                <Link to={"/login"}>login</Link>
            </div>
            <div>
                <Link to={"/home"}>home</Link>
            </div>
        </div>;
    }
}
export default hot(
    connect(mapStateToProps)(
        HomePage
    )
);


