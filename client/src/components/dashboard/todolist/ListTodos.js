import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            await fetch(`/dashboard/todo/${id}`, {
                method: 'DELETE',
                headers: { token: localStorage.token },
            });

            setTodos(todos.filter((todo) => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        setTodos(allTodos);
    }, [allTodos]);

    //   console.log(todos);

    return (
        <Fragment>
            {' '}
            <table className="table table-striped mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Song</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length !== 0 &&
                        todos[0].todo_id !== null &&
                        todos.map((todo) => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <a target="_blank" href={todo.song}>
                                        {todo.title}
                                    </a>
                                </td>
                                <td>
                                    <EditTodo
                                        todo={todo}
                                        setTodosChange={setTodosChange}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
