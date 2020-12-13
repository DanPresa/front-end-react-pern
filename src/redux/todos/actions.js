import clientAxios from './../../config/axios';
import Swal from 'sweetalert2';

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
    START_UPDATE_TODO,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_ERROR,
    CHANGE_STATUS_TODO,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR
} from './types';

/* LOAD TODOS */
export const loadTodosFn = () => {
    return async (dispatch) => {
        dispatch({
            type: START_LOAD_TODOS
        });

        try {
            const { data } = await clientAxios.get('/todos');
            const { todos } = data;

            dispatch({
                type: LOAD_TODOS_SUCCESS,
                payload: todos
            });
        } catch (error) {
            dispatch({
                type: LOAD_TODOS_ERROR
            });
        }
    }
}
/* LOAD TODOS */

/* CREATE TODO */
export const createTodoFn = ( tododata ) => {
    return async ( dispatch ) => {
        dispatch({ type: START_SAVE_TODO });

        try {
            const { data } = await clientAxios.post('/todos', tododata);
            const { todo } = data;

            Swal.fire(todo.name, data.msg, 'success');

            dispatch({ type: SAVE_TODO_SUCCESS });

        } catch (error) {
            dispatch({ type: SAVE_TODO_ERROR });
        }
    }
}
/* CREATE TODO */

/* GET TODO */
export const getTodoFn = ( todoid ) => {
    return async ( dispatch ) => {
        dispatch({ type: START_GET_TODO });

        try {
            const { data } = await clientAxios.get(`/todos/${ todoid }`);
            const { todo } = data;

            dispatch({
                type: GET_TODO_SUCCESS,
                payload: todo
            });
        } catch (error) {
            dispatch({ type: GET_TODO_ERROR });
        }
    }
}
/* GET TODO */

/* REMOVE TODO */
export const removeTodo = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_TODO })
    }
}
/* REMOVE TODO */

/* UPDATE TODO */
export const updateTodoFn = ( todoid, tododata ) => {
    return async ( dispatch ) => {
        dispatch({ type: START_UPDATE_TODO });

        try {
            const { data } = await clientAxios.put(`/todos/${ todoid }`, tododata);
            const { todo } = data;

            Swal.fire(`Todo: ${ todo.name }`, data.msg, 'success');

            dispatch({ type: UPDATE_TODO_SUCCESS });
        } catch (error) {
            dispatch({ type: UPDATE_TODO_ERROR });
        }
    }
}
/* UPDATE TODO */

/* CHANGE STATUS */
export const changeStatusFn = ( todochange ) => {
    return async (dispatch) => {

        const { data } = await clientAxios.patch(`/todos/${ todochange.id }`, todochange);
        const { todo } = data;

        dispatch({
            type: CHANGE_STATUS_TODO,
            payload: todo
        })

    }
}
/* CHANGE STATUS */

/* DELETE TODO */
export const deleteTodoFn = ( tododata ) => {
    return ( dispatch ) => {
        try {
            Swal.fire({
                title: 'Are you sure to delete?:',
                text: tododata.name,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No!',
              }).then((result) => {
                  const { isConfirmed } = result;

                  if ( isConfirmed ) {
                        const resp = clientAxios.delete(`/todos/${ tododata.id }`);

                        resp.then((resp) => {
                            const { data } = resp;

                            Swal.fire(data.msg, '', 'success');

                            dispatch({
                                type: DELETE_TODO_SUCCESS,
                                payload: tododata
                            })
                        });
                  }
              });
        } catch (error) {
            dispatch({
                type: DELETE_TODO_ERROR
            });
        }
    }
}
/* DELETE TODO */
