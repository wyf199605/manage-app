import {Action, Reducer} from "redux";

type ActionType<K = any> = obj<Action<K>>;

type ReducerHandlers<T, K extends ActionType<keyof K>> = {
    [P in keyof K]: Reducer<T, K[P]>;
};

export function reducerCreator
<
    TActions extends ActionType,
    TState = any
>
(
    initialState: TState,
    handlers: ReducerHandlers<TState, TActions>
): Reducer<TState,  TActions[keyof TActions]>
{
    return (state = initialState, action) => {
        if(handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }else {
            return state;
        }
    };
}
