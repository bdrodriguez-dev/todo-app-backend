const express = require("express");

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
const { createTodo } = require("./helpers");
// const { todos } = require("./dummyTodos");
// let todosList = [...todos];

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Setting up todoSchema and model
const todoSchema = new mongoose.Schema({
  todo: String,
  dueDate: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// const createTodoMongoose = (todo, dueDate, completed) => {
//   const newTodo = new Todo({
//     todo: todo,
//     dueDate: dueDate,
//     completed: completed,
//   });

//   newTodo.save(function (err) {
//     if (err) return err;

//     Todo.find({}).then((todos) => {
//       console.log(todos);
//     });
//   });
// };

// const deleteAllTodos = () => {
//   Todo.deleteMany({})
//     .then(() => {
//       console.log("Success. Todos deleted");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// const getAllTodos = () => {
//   Todo.find({}).then((todos) => {
//     console.log(todos);
//   });
// };

// const populateWThreeTodos = () => {
//   createTodoMongoose("Go to the mall.", "21-08-21", false);
//   createTodoMongoose("Take Gil to work", "21-07-16", false);
//   createTodoMongoose("Feed the plants and water the cat", "21-08-21", true);
//   Todo.find({}).then((todos) => console.log(todos));
// };

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

// Create a todo
todoRouter.post("/", async (req, res) => {
  const { todo, dueDate, completed } = req.query;

  const newTodo = new Todo({
    todo: todo,
    dueDate: dueDate,
    completed: completed,
  });

  try {
    const todo = await newTodo.save();
    res.status(201).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
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

module.exports = todoRouter;
