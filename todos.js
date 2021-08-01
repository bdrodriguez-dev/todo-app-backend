const express = require("express");

// Setting up express.Router for todo Routes
const todoRouter = express.Router();

// Helper Functions and data
// const { createTodo } = require("./helpers");
// const { todos } = require("./dummyTodos");
// let todosList = [...todos];

// Mongoose models
const { Todo, List } = require("./models/models");

/* ------------------------------------- HELPERS ------------------------------------- */

// const createTodo = (todo, dueDate, completed) => {
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
  // TODO: Update this to add todo to correct list

  const getList = async (listName) => {
    try {
      // check db to see if list by that name exists
      const list = await List.find({ name: listName });
      // if it does return it to assign it to the new todo
      if (list) {
        return list;
      } else {
        // if NOT, create a new list, save it, and return it so we can assign to the new todo

        //create a new list
        const tempList = new List({
          name: listName,
          list: [],
        });

        // save to db
        const newList = await tempList.save();

        return newList;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { todo, dueDate, completed, listName } = req.query;

  try {
    // Create the new todo
    const newTodo = await new Todo({
      todo: todo,
      dueDate: dueDate,
      completed: completed,
      list: getList(listName),
    });

    //save the newTodo
    const dbSavedTodo = await newTodo.save();
    // save the updatedList
    const dbSavedList = await todoAssignedList.save();

    const associatedList = dbSavedTodo.list;

    // add it to its assign list
    associatedList.list.push(newTodo);

    res.status(201).json({
      newTodo: dbSavedTodo,
      updatedList: dbSavedList,
    });
  } catch (error) {
    res.status(400).send(err);
  }

  // const newTodo = new Todo({
  //   todo: todo,
  //   dueDate: dueDate,
  //   completed: completed,
  //   list: list,
  // });

  // try {
  //   const todo = await newTodo.save();
  //   console.log(todo.list);

  //   // Send todo to proper list
  //   const list = await List.find({ name: todo.list });
  //   console.log(list);

  //   const listCopy = { ...list };
  //   console.log(listCopy);

  //   const updatedList = listCopy.save();
  //   console.log(`updatedList: ${updatedList}`);

  //   res.status(201).json({ updatedList });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
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
