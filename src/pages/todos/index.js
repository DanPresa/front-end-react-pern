import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Badge,
    Button
} from 'reactstrap';
import classNames from 'classnames';
import { FiPlusCircle } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

import TableTodos from './TableTodos';
import { loadTodosFn, changeStatusFn, deleteTodoFn } from './../../redux/todos/actions';

const TodoPage = () => {
    const dispatch = useDispatch();
    const { todos, loading } = useSelector(state => state.Todos)

    const history = useHistory();

    const goCreateTodo = () => {
        history.push('/create-todo');
    }

    const deleteTodo = ( todo ) => {
        dispatch( deleteTodoFn(todo) );
    }

    useEffect(() => {
        dispatch( loadTodosFn() );

        // eslint-disable-next-line
    }, [])

    const statusColumn = (cell, row) => (
        <Badge
            className="pointer"
            color={ classNames({ 'danger': !cell, 'success': cell }) }
            onClick={ () => dispatch( changeStatusFn(row) )  }
        >
            { cell ? 'Completed' : 'Incomplete' }
        </Badge>
    )

    const actionColumn = ( cell, row ) => {
        return (
            <>
                <span
                    onClick={ () => history.push(`/edit-todo/${ row.id }`) }
                    className="link pointer"
                >
                    {' '}
                    <BiEditAlt className="icon-table"/>
                </span>
                <span
                    className="pointer"
                    onClick={ () => deleteTodo(row) }
                >
                    {' '}
                    <BsTrash
                        className="icon-table"
                    />
                </span>
            </>
        )
    }

    const columns = [
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'title',
            text: 'Title'
        },
        {
            dataField: 'completed',
            text: 'Status',
            formatter: statusColumn
        },
        {
            dataField: 'actions',
            text: 'Actions',
            formatter: actionColumn
        }
    ]

    return (
        <>
           <h1>Todo List</h1>
           <hr/>
           <Card>
               <CardBody>
                   <Row className="mb-3">
                       <Col xs="12">
                           <Button
                                color="danger"
                                onClick={ goCreateTodo }
                           >
                               <FiPlusCircle /> Add Todo
                            </Button>
                       </Col>
                   </Row>
                   <Row>
                       <Col xs="12">
                            <TableTodos
                                data={ todos }
                                columns={ columns }
                                loading={ loading }
                            />
                       </Col>
                   </Row>
               </CardBody>
           </Card>
        </>
    )
}

export default TodoPage
