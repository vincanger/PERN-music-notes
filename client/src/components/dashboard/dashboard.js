import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';

//
import InputTodo from './todolist/InputTodo';
import ListTodos from './todolist/ListTodos';

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    async function getInfo() {
        try {
            const response = await fetch('/dashboard/', {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setAllTodos(parseRes);

            setName(parseRes[0].name);
        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Bye!");
    }

    useEffect(() => {
        getInfo();
        setTodosChange(false);
    },[todosChange])

    return (
        <div>
            <div className="mt-5">
                
                <div className="d-flex justify-content-between">
                    <h2>{name}'s Notes </h2>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => logout(e)}
                    >
                        Log outta here
                    </button>
                </div>

                <InputTodo setTodosChange={setTodosChange}/>
                <ListTodos allTodos={allTodos} setTodosChange={setTodosChange}/>
            </div>
        </div>
    );
};

export default Dashboard;