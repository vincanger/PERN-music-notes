const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validate = require('../middlware/validate');
const authorize = require('../middlware/authorize');



// register
router.post('/register', validate, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(user.rows.length !== 0) {
            return res.status(401).json('User already exists.')
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].id);
        console.log(newUser.rows);
        console.log(newUser.rows[0].id);

        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//login
router.post('/login', validate, async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (user.rows.length === 0) {
            res.status(401).json('Email or Password is incorrect');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword) {
            return res.status(401).json('Password or email is incorrect');
        }

        const token = jwtGenerator(user.rows[0].id);
        console.log(user.rows[0]);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//client-side verification checker
router.post('/is-verify', authorize, (req, res) => {
    try {
        // console.log('I'm reaching here');
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;