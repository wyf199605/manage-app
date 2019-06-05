import {reducerCreator} from "./index";
import {Actions} from "../actions";

export type UserInfoState = {
    username: string;
    token: string;
};

export type UserInfoAction = {
    [Actions.RECORD_USER_INFO]: RecodeUserInfoAction;
    [Actions.CLEAR_USER_INFO]: ClearUserInfoAction;
};

type RecodeUserInfoAction = {
    type: Actions.RECORD_USER_INFO;
    userInfo: UserInfoState;
};

type ClearUserInfoAction = {
    type: Actions.CLEAR_USER_INFO;
};

const userInfoState: UserInfoState = {
    username: '',
    token: ''
};

export const userInfo = reducerCreator<UserInfoAction, UserInfoState>(
    userInfoState,
    {
        [Actions.RECORD_USER_INFO]: (state, action) => {
            return {
                username: action.userInfo.username,
                token: action.userInfo.token
            };
        },
        [Actions.CLEAR_USER_INFO]: () => {
            return {
                username: '',
                token: ''
            };
        }
    }
);
