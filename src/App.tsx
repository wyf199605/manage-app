import * as React from "react";
import {AppRouter} from "./router";
import {Provider} from "react-redux";
import {configureStore} from "./store";
import {PersistGate} from 'redux-persist/integration/react';

const {
    store,
    persistor
} = configureStore();

export class App extends React.Component{
    render(){
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppRouter/>
            </PersistGate>
        </Provider>;
    }
}
