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

const createTodoMongoose = (todo, dueDate, completed) => {
  const newTodo = new Todo({
    todo: todo,
    dueDate: dueDate,
    completed: completed,
  });

  newTodo.save(function (err) {
    if (err) return err;

    Todo.find({}).then((todos) => {
      console.log(todos);
    });
  });
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

const getAllTodos = () => {
  Todo.find({}).then((todos) => {
    console.log(todos);
  });
};

const populateWThreeTodos = () => {
  createTodoMongoose("Go to the mall.", "21-08-21", false);
  createTodoMongoose("Take Gil to work", "21-07-16", false);
  createTodoMongoose("Feed the plants and water the cat", "21-08-21", true);
  Todo.find({}).then((todos) => console.log(todos));
};

/* ------------------------------------- ROUTES ------------------------------------- */

// Get all todos
todoRouter.get("/", (req, res) => {
  // Get all todos from the db and send them to the client
  Todo.find({})
    .then((todos) => {
      return res.send(todos);
    })
    .catch((err) => {
      return res.send(err);
    });
});

// Get todo by id
todoRouter.get("/:id", (req, res) => {
  // Get the id from the urlQuery
  const todoId = req.params.id;
  
  Todo.findById(todoId)
    .then((todoItem) => {
        res.send(todoItem);
    })
    .catch((err) => {
        res.send(err);
    });
});

// Create a todo
todoRouter.post("/", (req, res) => {
  const { todoDescription, dueDate, completed } = req.query;

  const newTodo = new Todo({
    todo: todoDescription,
    dueDate: dueDate,
    completed: completed,
  });

  newTodo.save()
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      res.send(err);
    })
});
  
  
  
  
//   const newTodo = createTodo(todoDescription, dueDate, completed);
//   todosList.push(newTodo);
//   console.log(newTodo);
//   res.status(200).send(newTodo);
// });

// Update a todo
todoRouter.put("/:id", (req, res) => {
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
    const update = { ...req.query, id: req.params.id };
    //set update to array at that index
    todosList[todoIndex] = update;
    console.log(todosList[todoIndex]);
    res.status(200).send(todosList[todoIndex]);
  } else {
    res.status(404).send("No todo found with that ID.");
  }
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
// deleteAllTodos();

module.exports = todoRouter;
