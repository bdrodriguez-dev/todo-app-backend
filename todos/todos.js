const express = require("express");

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
const dummyTodos = require("./dummy-todos");

// Mongoose models
const { Todo } = require("../models/models");

/* ------------------------------------- ROUTES ------------------------------------- */

// Get all todos
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get todo by id
todoRouter.get("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    res.status(200).send(todo);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get todos by list
todoRouter.get("/:list", async (req, res) => {
  // TODO:
  const list = req.params.list;
  try {
    const dbTodos = await Todo.find({ list: list });
    res.status(200).send(dbTodos);
  } catch (error) {
    res.status(500).send(err);
  }
});

// Create a todo
todoRouter.post("/", async (req, res) => {
  const { todo, dueDate, completed, list } = req.query;
  // console.log([todo, dueDate, completed, list]);
  try {
    const defaultList = 'inbox';
    let actualList = list;
    if (actualList === 'undefined') {
      actualList = defaultList;
    }
    // Create the new todo
    const newTodo = new Todo({
      todo: todo,
      dueDate: dueDate,
      completed: completed,
      list: actualList,
    });

    //save the newTodo
    const dbSavedTodo = await newTodo.save();
    console.log(dbSavedTodo);
    res.status(201).json(dbSavedTodo);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

// Seed dummy todos
todoRouter.get("/dummy", async (req, res) => {
  // Helper function which creates a new Todo.todoItem and saves it into the db
  const processThroughDB = async (todo) => {
    const newTodo = new Todo({
      todo: todo.todo,
      dueDate: todo.dueDate,
      completed: todo.completed,
      list: todo.list,
    });
    console.log(newTodo);
    const savedTodo = await newTodo.save();
    console.log(`Dummy todo saved! -> ${savedTodo}`);
    return savedTodo;
  };

  // So we can res.json all at once afterwards
  const savedTodosArr = [];

  // For each dummyTodoObj, process it with processThroughDB (which creates a new Todo.todoItem and saves it into the db) then we res.send the savedTodo
  dummyTodos.forEach(async (todoItem) => {
    try {
      const savedTodo = processThroughDB(todoItem);
      savedTodosArr.push(todoItem);
    } catch (err) {
      console.log(err);
    }
  });

  console.log(savedTodosArr);

  res.json(savedTodosArr);
});

// Update a todo
todoRouter.put("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    Object.keys(req.query).forEach((key) => {
      todo[key] = req.query[key];
    });
    const savedTodo = await todo.save();
    res.status(200).send(savedTodo);
    console.log(savedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a todo
todoRouter.delete("/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.send(deletedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete all todos
todoRouter.delete("/", async (req, res) => {
  try {
    const deletedTodos = await Todo.deleteMany({});
    res.json(deletedTodos);
  } catch (error) {
    res.send(error);
  }
});

module.exports = todoRouter;
