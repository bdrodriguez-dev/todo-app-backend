const express = require('express');
const app = express();
const todoRouter = require('./todos');

// Use static server
app.use(express.static('public'));

// Load todoRouter for todo related routes
app.use('/todos', todoRouter);

app.listen(3000, () => {
    console.log('App started on port 3000');
});