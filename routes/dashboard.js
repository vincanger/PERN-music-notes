const router = require('express').Router();
const pool = require('../db');
const authorize = require('../middlware/authorize');

/* 
I know SQL injection is a risk! 
but this is simply a learning project :)
*/

// get all -- users LEFT JOIN todo
router.get('/', authorize, async (req, res) => {
    try {
        const user = await pool.query(`SELECT users.name, todo.todo_id, todo.description, todo.song, todo.title FROM users LEFT JOIN todo on users.id = todo.user_id WHERE users.id = $1;`, [req.user.id]);
        res.json(user.rows); // <--- user.rows or user.rows[0]?
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error');
    }
});

// create
router.post('/todo', authorize, async(req, res) => {
    try {
        console.log(req.body);
        const { description, song, title } = req.body.idea;
        console.log(description);
        console.log(song);
        const newTodo = await pool.query('INSERT INTO todo (description, user_id, song, title) VALUES ($1, $2, $3, $4) RETURNING *;', [description, req.user.id, song, title]);
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

// update
router.put('/todo/:id', authorize, async(req, res) => {
    try {
        const { id } = req.params;
        const { description, song, title } = req.body.idea;
        const updateTodo = await pool.query('UPDATE todo SET description = $1, song = $4, title = $5 WHERE todo_id = $2 AND user_id = $3 RETURNING *;', [description, id, req.user.id, song, title]);

        if (updateTodo.rows.length === 0) {
            return res.json('This todo id is not assigned to user');
        }
        
        res.json('Update succesful');
    } catch (error) {
        console.error(error.message);
    }
});

//delete
router.delete('/todo/:id', authorize, async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo =  await pool.query('DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *;', [id, req.user.id]);
        
        if(deleteTodo.rows.length === 0) {
            return res.json('This todo id is not assigned to user');
        }
        
        res.status(200).json('Delete successful');
    } catch (error) {
        console.error(error.message);
    }
})


module.exports =  router;