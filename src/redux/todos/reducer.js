import {
    START_LOAD_TODOS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_ERROR,
    START_SAVE_TODO,
    SAVE_TODO_SUCCESS,
    SAVE_TODO_ERROR,
    START_GET_TODO,
    GET_TODO_SUCCESS,
    GET_TODO_ERROR,
    REMOVE_TODO,
    CHANGE_STATUS_TODO,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR
} from './types';

const INIT_STATE = {
    todos: [],
    todo: null,
    loading: false,
    error: false
}

const Todos = ( state = INIT_STATE, action ) => {
    switch( action.type ) {

        case START_LOAD_TODOS:
            return {
                ...state,
                loading: true,
                error: false
            }

        case LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }

        case LOAD_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case START_SAVE_TODO:
            return {
                ...state,
                loading: true,
                error: false
            }

        case SAVE_TODO_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case SAVE_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case START_GET_TODO:
            return {
                ...state,
                loading: true,
                error: false
            }

        case GET_TODO_SUCCESS:
            return {
                ...state,
                todo: action.payload,
                loading: false
            }

        case GET_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case REMOVE_TODO:
            return {
                ...state,
                todo: null
            }

        case CHANGE_STATUS_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if ( todo.id === action.payload.id ) {
                        todo.completed = !todo.completed;

                        return todo;
                    }

                    return todo;
                })
            }

        /* case START_DELETE_TODO:
            return {
                ...state,
                loading: true,
                error: false
            } */

        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
                loading: false
            }

        case DELETE_TODO_ERROR:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default Todos;
