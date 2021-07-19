const express = require("express");

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
// const { createTodo } = require("./helpers");
// const { todos } = require("./dummyTodos");
// let todosList = [...todos];

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// mongoose.Promise = global.Promise;

// Setting up todoSchema and model
const todoSchema = new mongoose.Schema({
  todo: String,
  dueDate: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Db Helpers

const getAllTodos = () => {
  Todo.find({}).then((todos) => {
    return todos;
  });
};

const getTodoById = (id) => {
  Todo.findById(todoId)
    .then((todoItem) => {
      return todoItem;
    })
    .catch((err) => {
      return err;
    });
};

// const getTodoById = (id) => {
//   Todo.findById(todoId)
//     .then((todoItem) => {
//       res.status(200).send(todoItem);
//     })
//     .catch((err) => {
//       res.sendStatus(404).send(err);
//     });
// }

const createTodo = (todo, dueDate, completed) => {
  const newTodo = new Todo({
    todo: todo,
    dueDate: dueDate,
    completed: completed,
  });

  newTodo.save(function (err, todo) {
    if (err) return err;
  });
};

const updateTodo = (id, newTodo) => {
  //get todo by id
  //update
  //send code and updted todo
};

const deleteAllTodos = () => {
  Todo.deleteMany({})
    .then(() => {
      console.log("Success. Todos deleted");
    })
    .catch((err) => {
      console.error(err);
    });
};

const populateWThreeTodos = () => {
  createTodo("Go to the mall.", "21-08-21", false);
  createTodo("Take Gil to work", "21-07-16", false);
  createTodo("Feed the plants and water the cat", "21-08-21", true);
  Todo.find({}).then((todos) => console.log(todos));
};

/* ------------------------------------- ROUTES ------------------------------------- */

// Get all todos
todoRouter.get("/", (req, res) => {
  // Todo.find({})
  //   .then(function (todoList) {
  //     return res.sendStatus(200).send(todoList);
  //   })
  //   .catch(function (err) {
  //     // console.log('error from catch')
  //     return res.sendStatus(404).send(err);
  //   });

  // Todo.find({}, function(err, todoList) {
  //   if (err) return res.sendStatus(404).send(err);
  //   return res.sendStatus(200).send(todoList);
  // });

  const getTodos = async function () {
    try {
      return await Todo.find({});
    } catch (err) {
      throw err;
    }
  };
  const todoList = getTodos();
  res.send(todoList);

});

// Get todo by id
todoRouter.get("/:id", (req, res) => {
  // Get the id from the urlQuery
  const todoId = req.params.id;

  Todo.findById(todoId)
    .then(() => {
      res.sendStatus(200).send(todoItem);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
});

// Create a todo
todoRouter.post("/", (req, res) => {
  const { todo, dueDate, completed } = req.query;

  const newTodo = new Todo({
    todo: todo,
    dueDate: dueDate,
    completed: completed,
  });

  newTodo.save(function (err, todoItem) {
    if (err) res.sendStatus(400).send(err);
    res.sendStatus(201).send(todoItem);
  });
});

// Update a todo
todoRouter.put("/:id", (req, res) => {
  const todoId = req.params.id;

  //get todoItem by id
  Todo.findById(todoId).then((todoItem) => {
    // For each key that is present in the query, update the todoItem
    Object.keys(req.query).forEach((key) => {
      todoItem[key] = req.query[key];
    });

    // save the updates and respond w err or todoItem
    todoItem.save(function (err, todoItem) {
      if (err) res.sendStatus(400).send(err);
      res.sendStatus(200).send(todoItem);
    });
  });
});

// Delete a todo
todoRouter.delete("/:id", (req, res) => {
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
    console.log(todoToBeDeleted);
  } else {
    res.status(404).send("No todo found with that ID.");
  }
});

// populateWThreeTodos();

module.exports = todoRouter;
