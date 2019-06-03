import {createStore, Reducer, combineReducers} from "redux";
import {todos} from "./reducers/todos";

const initialState = {
    todos: []
};

// const reducer: Reducer = (state = initialState, action) => {
//     return combineReducers({
//         todos
//     });
// };

export const store = createStore(combineReducers({
    todos
}));
