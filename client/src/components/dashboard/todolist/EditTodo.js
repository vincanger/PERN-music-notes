import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo, setTodosChange }) => {
    const [idea, setIdea] = useState(todo);
    //   const {description, song} = idea;

    console.log(`---idea---`);
    console.log(idea);
    console.log(`---todo---`);
    console.log(todo);

    function handleChange(evt) {
        const value = evt.target.value;
        setIdea({
            ...idea,
            [evt.target.name]: value,
        });
    }

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { idea };
            const newHeaders = new Headers();
            newHeaders.append('Content-Type', 'application/json');
            newHeaders.append('token', localStorage.token);
            await fetch(
                `/dashboard/todo/${todo.todo_id}`,
                {
                    method: 'PUT',
                    headers: newHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTodosChange(true);

            //   window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}
            >
                Edit
            </button>

            <div
                className="modal"
                id={`id${todo.todo_id}`}
                onClick={() => setIdea(idea)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Idea</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setIdea(idea)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                name="description"
                                // placeholder="musical idea"
                                className="form-control"
                                value={idea.description}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="song title"
                                className="form-control"
                                value={idea.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="song"
                                placeholder="song URL, i.e. http://..."
                                className="form-control"
                                value={idea.song}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateDescription(e)}
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setIdea(idea)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;
