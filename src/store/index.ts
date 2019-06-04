import {createStore, combineReducers, applyMiddleware, Middleware} from "redux";
import ReduxThunk from "redux-thunk";
import {UserInfoState, userInfo, UserInfoAction} from "./reducers/userInfo";

const middleware: Middleware[] = [ReduxThunk];

if(process.env.NODE_ENV === 'development'){
    const {createLogger} = require('redux-logger');
    middleware.push(createLogger());
}

export type StoreState = {
    userInfo: UserInfoState;
};

type StoreActions = UserInfoAction;
export type StoreAction = StoreActions[keyof StoreActions];

export const store = createStore<StoreState, StoreAction,{} ,{}>(
    combineReducers({
        userInfo
    }),
    applyMiddleware(...middleware)
);



