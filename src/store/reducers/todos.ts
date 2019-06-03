import {Actions} from "../actions";

interface IAddTodo {
    type: Actions.ADD_TODO;
    todo: {
        name: string;
        content: string;
    };
}

export const todos = (state = [], action: IAddTodo) => {
    switch (action.type) {
        case Actions.ADD_TODO:
            return state.concat(action.todo);
        default:
            return state;
    }
};
