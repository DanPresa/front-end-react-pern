import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TodoPage from './../pages/todos';
import CreateTodo from './../pages/todos/CreateTodo';
import EditTodo from './../pages/todos/EditTodo';

const AppRoutes = () => {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={ TodoPage } />
                    <Route exact path="/create-todo" component={ CreateTodo } />
                    <Route exact path="/edit-todo/:id" component={ EditTodo } />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRoutes
