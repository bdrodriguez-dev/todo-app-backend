const express = require('express');
const app = express();

// Use static server
app.use(express.static('public'));

const { createTodo } = require('./helpers');
const { todos } = require('./dummyTodos');
let todosList = [...todos];

// Get all todos
app.get('/todos', (req, res) => {
    res.send(todosList);
});

// Get todo by id
app.get('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const todoIndex = todosList.findIndex((element) => {
        return todoId === element.id;
    });
    if (todoIndex !== -1) {
        res.status(200).send(todosList[todoIndex]);
    } else {
        res.send(404).send('No todo found with that ID.');
    }
});

// Create a todo
app.post('/todos', (req, res) => {
    // If query invalid, use empty string instead
    const todoDescription = req.query.todo || '';
    const dueDate = req.query.date || '';

    const newTodo = createTodo(todoDescription, dueDate);
    todosList.push(newTodo);
    res.status(201).send(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    //get index
    const todoIndex = todosList.findIndex((element) => {
        return todoId === element.id;
    });
    //Check if index is found || -1
    if (todoIndex !== -1) {
        //get update from req.query
        const update = {...req.query, id: req.params.id};
        //set update to array at that index
        todosList[todoIndex] = update;
        console.log(todosList[todoIndex]);
        res.status(200).send(todosList[todoIndex]);
    } else {
        res.status(404).send('No todo found with that ID.');
    }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    //get index
    const todoIndex = todosList.findIndex((element) => {
        return todoId === element.id;
    });
    //Check if index is found || -1
    if (todoIndex !== -1) {
        todoToBeDeleted = todosList[todoIndex];
        todosList.splice(todoIndex, 1);
        res.status(200).send(todoToBeDeleted);
    } else {
        res.status(404).send('No todo found with that ID.');
    }
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});