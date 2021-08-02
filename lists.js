const express = require("express");

const listRouter = express.Router();

// Mongoose
const { Todo, List } = require("./models/models");

/* ------------------------------------- HELPERS ------------------------------------- */

// const populateWThree = async () => {
//   // Helpers
//   const createTodo = async (todo) => {
//     const todoItem = new Todo(todo);
//     const savedTodo = await todoItem.save();
//     console.log(savedTodo);
//   };

//   const createList = async (listObj) => {
//     const newList = new List({
//       name: listObj.name,
//       list: listObj.list,
//     });
//     const savedList = await newList.save();
//     return savedList;
//   };

// Create Lists
//   [
//     {
//       name: "inbox",
//       list: [
//         {
//           todo: "Defeat neoliberalism",
//           dueDate: "25-01-07",
//           completed: false,
//           listName: "inbox",
//         },
//         {
//           todo: "Become a robot",
//           dueDate: "32-07-07",
//           completed: false,
//           listName: "inbox",
//         },
//         {
//           todo: "Create utopia",
//           dueDate: "50-01-07",
//           completed: false,
//           listName: "inbox",
//         },
//       ].map((todo) => {
//         return new Todo({
//           todo: todo.todo,
//           dueDate: todo.dueDate,
//           completed: todo.completed,
//           listName: todo.list,
//         });
//       }),
//     },
//     {
//       name: "home",
//       list: [
//         {
//           todo: "Water plants",
//           dueDate: "25-01-07",
//           completed: false,
//           listName: "inbox",
//         },
//         {
//           todo: "Clean kitchen",
//           dueDate: "32-07-07",
//           completed: false,
//           listName: "inbox",
//         },
//         {
//           todo: "Drink beer",
//           dueDate: "50-01-07",
//           completed: false,
//           listName: "inbox",
//         },
//       ].map((todo) => {
//         return new Todo({
//           todo: todo.todo,
//           dueDate: todo.dueDate,
//           completed: todo.completed,
//           listName: todo.list,
//         });
//       }),
//     },
//   ].forEach(async (list) => {
//     //trycatch
//     const tempList = createList(list);
//     console.log(await tempList);
//     return tempList;
//   });
// };

//populate with dummy lists
// populateWThree();
/* ------------------------------------- ROUTES ------------------------------------- */

// Get all lists
listRouter.get("/", async (req, res) => {
  try {
    const lists = await List.find({});
    res.json(lists);
  } catch (error) {
    res.send(error);
  }
});

listRouter.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.json(list);
  } catch (error) {
    res.send(error);
  }
});

listRouter.post("/", async (req, res) => {
  const newList = new List({
    name: req.query.name,
  });

  try {
    const list = await newList.save();
    res.json(list);
  } catch (error) {
    res.send(error);
  }
});

// Fills db with dummy list data
listRouter.post("/dummy", async (req, res) => {
  // TODO: this

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

listRouter.put("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    list.name = req.query.name;
    const updatedList = await list.save();
    res.json(updatedList);
  } catch (error) {
    res.send(error);
  }
});

listRouter.delete("/:id", async (req, res) => {
  try {
    // get list that will be deleted
    const listToDelete = await findById(req.params.id);
    // get todos attached to that list
    const todosToDelete = await Todo.find({ list: listToDelete.name });
    console.log(todosToDelete);
    // delete list from List collection
    const deletedList = await List.findByIdAndDelete(req.params.id);
    // delete todos from Todo collection
    const remainingLists = await List.find({});

    res.json({ deletedList: deletedList, remainingLists: remainingLists });
  } catch (error) {
    res.send(error);
  }
});

listRouter.delete("/", async (req, res) => {
  try {
    const deletedLists = await List.deleteMany({});
    res.json(deletedLists);
  } catch (error) {
    res.send(error);
  }
});

module.exports = listRouter;
