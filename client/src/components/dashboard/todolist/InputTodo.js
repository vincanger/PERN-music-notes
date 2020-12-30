import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
  const [idea, setDescription] = useState({
      description: "",
      title: "",
      song: ""
  });
 
  function handleChange(evt) {
    const value = evt.target.value;
    setDescription({
      ...idea,
      [evt.target.name]: value
    });
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {

      const newHeaders = new Headers();
      newHeaders.append("Content-Type", "application/json");
      newHeaders.append("token", localStorage.token);
      
      const body = { idea };
      const response = await fetch("/dashboard/todo", {
        method: "POST",
        headers: newHeaders,
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      console.log(parseRes);
      
      setTodosChange(true);
      setDescription({
        description: "",
        title: "",
        song: ""
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center mt-5">Music Notes</h2>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          name="description"
          placeholder="musical idea"
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
          placeholder="song URL"
          className="form-control"
          value={idea.song}
          onChange={handleChange}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
