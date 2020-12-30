const express = require('express');
const router = express.Router();
const pool = require('../db');

/* 
I know SQL injection is a risk! 
but this is simply a learning project :)
*/

// create
router.post('/', async(req, res) => {
    try {
        
        const { description } = req.body;
        const newTodo = await pool.query(`INSERT INTO todo (description) VALUES ($1) RETURNING *;`, [description]);
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

// get all
router.get('/', async(req, res) => {
    try {
        const allTodos = await pool.query(`SELECT * FROM todo;`);
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get by id
router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id; // const { id } = req.params;
        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1;`, [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// update
router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2;`, [description, id]);
        res.json('Update succesful');
    } catch (error) {
        console.error(error.message);
    }
});

//delete
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`DELETE FROM todo WHERE todo_id = $1;`, [id]);
        res.status(200).json('Delete successful');
    } catch (error) {
        console.error(error.message);
    }
})


module.exports = router;