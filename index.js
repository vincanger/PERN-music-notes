const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Express Routers
const authRouter = require('./routes/jwtAuth');
const todoRouter = require('./routes/todo');
const dashboardRouter = require('./routes/dashboard');


// MIDDLEWARE
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

// ROUTES
app.use('/auth', authRouter);
app.use('/todos', todoRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`)
});
