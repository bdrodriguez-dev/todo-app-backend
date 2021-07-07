const express = require('express');

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
const { createTodo } = require('./helpers');
const { todos } = require('./dummyTodos');
let todosList = [...todos];


/* ROUTES */

// Get all todos
todoRouter.get('/', (req, res) => {
    res.send(todosList);
});

// Get todo by id
todoRouter.get('/:id', (req, res) => {
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
todoRouter.post('/', (req, res) => {
    // If query invalid, use empty string instead
    const todoDescription = req.query.todo || '';
    const dueDate = req.query.dueDate || '';

    const newTodo = createTodo(todoDescription, dueDate);
    todosList.push(newTodo);
    res.status(201).send(newTodo);
});

// Update a todo
todoRouter.put('/:id', (req, res) => {
    /*
        req.query = {
            todo: stuff,
            dueDate: dateStuff,
            completed: booleanStuff
        }
    */
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
todoRouter.delete('/:id', (req, res) => {
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

module.exports = todoRouter;