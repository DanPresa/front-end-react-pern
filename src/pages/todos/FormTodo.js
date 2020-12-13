import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Col, FormGroup, Label, Button } from 'reactstrap';
import { AiOutlineSave } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

import { createTodoFn, updateTodoFn } from './../../redux/todos/actions';

const FormTodo = () => {
    const dispatch = useDispatch();
    const { todo, loading } = useSelector(state => state.Todos);

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const formSubmit = async ( data ) => {
        if ( !todo ) {
            dispatch( createTodoFn(data) );
        } else {
            await dispatch( updateTodoFn( todo.id, data ) );
        }
        history.push('/');
    }

    if ( loading ) return <p>Loading...</p>

    return (
        <Card>
            <CardBody>
                <form
                    onSubmit={ handleSubmit( formSubmit ) }
                >
                    <FormGroup row>
                        <Col xs="12" md="6">
                            <Label  for="name">Name: <span className="text-danger">* { errors.name && <small>Name is required.</small> }</span></Label>
                            <input
                                autoComplete="off"
                                className="form-control"
                                id="name"
                                name="name"
                                defaultValue={ todo ? todo.name : '' }
                                ref={ register({
                                    required: true
                                }) }
                            />
                        </Col>
                        <Col xs="12" md="6">
                            <Label  for="title">Title: <span className="text-danger">* { errors.title && <small>Title is required.</small> }</span></Label>
                            <input
                                autoComplete="off"
                                className="form-control"
                                id="title"
                                name="title"
                                defaultValue={ todo ? todo.title : '' }
                                ref={ register({
                                    required: true
                                }) }
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs="12">
                            <Button
                                color="primary"
                            ><AiOutlineSave /> { !todo ? 'Save Todo' : 'Edit Todo' }</Button>
                        </Col>
                    </FormGroup>
                </form>
            </CardBody>
        </Card>
    )
}

export default FormTodo
