import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import HeaderForm from './../../components/HeaderForm';
import FormTodo from './FormTodo';

import { getTodoFn, removeTodo } from './../../redux/todos/actions';

const EditTodo = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const { id } = match.params;

    useEffect(() => {
        dispatch( getTodoFn( id ) );

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        return () => {
            dispatch( removeTodo() );
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <HeaderForm title="Edit Todo" />
            <FormTodo />
        </>
    )
}

export default EditTodo
