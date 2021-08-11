const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./todos/todos");
const listRouter = require("./lists/lists");
// const dummyTodos = require("./dummy-todos");
// const dummyLists = require("./dummy-lists");

// Use static server
app.use(express.static("public"));

// Enable cross origin resource sharing
app.use(cors());

// Load todoRouter for todo related routes
app.use("/todos", todoRouter);
app.use("/lists", listRouter);

// // Load dummy todos
// const processThroughDBTodo = async (todo) => {
//   const newTodo = new Todo({
//     todo: todo.todo,
//     dueDate: todo.dueDate,
//     completed: todo.completed,
//     list: todo.list,
//   });

//   const savedTodo = await newTodo.save();
//   console.log(`Dummy todo saved! -> ${savedTodo}`);
//   return savedTodo;
// };

// // So we can res.json all at once afterwards
// const savedTodosArr = [];

// // For each dummyTodoObj, process it with processThroughDB (which creates a new Todo.todoItem and saves it into the db) then we res.send the savedTodo
// dummyTodos.forEach(async (todoItem) => {
//   try {
//     processThroughDBTodo(todoItem);
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Load dummy lists
// const processThroughDBList = async (listName) => {
//   const newList = new List({
//     name: listName,
//   });
//   console.log(newList);
//   const savedList = await newList.save();
//   console.log(`Dummy list saved! -> ${savedList}`);
//   return savedList;
// };

// // For each dummyTodoObj, process it with processThroughDB (which creates a new Todo.todoItem and saves it into the db) then we res.send the savedTodo
// dummyLists.forEach(async (listName) => {
//   try {
//     processThroughDBList(listName);
//   } catch (err) {
//     console.log(err);
//   }
// });

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
