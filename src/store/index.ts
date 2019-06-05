import {createStore, combineReducers, applyMiddleware, Middleware, bindActionCreators} from "redux";
import ReduxThunk from "redux-thunk";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {userInfo, UserInfoAction} from "./reducers/userInfo";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
export type StoreState = ReturnType<typeof rootReducer>;

type StoreActions = UserInfoAction;

export type StoreAction = StoreActions[keyof StoreActions];

const rootReducer = combineReducers({
    userInfo
});

const middleware: Middleware[] = [ReduxThunk];

if(process.env.NODE_ENV === 'development'){
    const {createLogger} = require('redux-logger');
    middleware.push(createLogger());
}

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export function configureStore(){
    let store = createStore<StoreState, StoreAction,{} ,{}>(
        persistReducer({
            key: 'root',
            storage: storage
        }, rootReducer),
        composedEnhancers
    );

    let persistor = persistStore(store);
    return {
        persistor,
        store
    };
}




