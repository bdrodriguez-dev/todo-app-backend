const express = require("express");

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
const dummyTodos = require("./dummyData");

// Mongoose models
const { Todo, List } = require("./models/models");

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
todoRouter.get("/:list", (req, res) => {
  // TODO:
});

// Create a todo
todoRouter.post("/", async (req, res) => {
  const { todo, dueDate, completed, listName } = req.query;
  // console.log([todo, dueDate, completed, listName]);
  try {
    // Create the new todo
    const newTodo = new Todo({
      todo: todo,
      dueDate: dueDate,
      completed: completed,
      listName: listName,
    });

    //save the newTodo
    const dbSavedTodo = await newTodo.save();
    res.status(201).json(dbSavedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Seed dummy todos
todoRouter.post("/dummy", async (req, res) => {
  // Helper function which creates a new Todo.todoItem and saves it into the db
  const processThroughDB = async (todo) => {
    const newTodo = new Todo({
      todo: todo.todo,
      dueDate: todo.dueDate,
      completed: todo.completed,
      listName: todo.listName,
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

todoRouter.delete("/", async (req, res) => {
  try {
    const deletedTodos = await Todo.deleteMany({});
    res.json(deletedTodos);
  } catch (error) {
    res.send(error);
  }
});

module.exports = todoRouter;
