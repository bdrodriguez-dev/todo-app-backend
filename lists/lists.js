const express = require("express");

const listRouter = express.Router();

const dummyLists = require("./dummy-lists");

// Mongoose
const { Todo, List } = require("../models/models");

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
    color: req.query.color,
  });

  try {
    const list = await newList.save();
    res.send(list);
  } catch (error) {
    res.send(error);
  }
});

// Fills db with dummy list data
// listRouter.post("/dummy", async (req, res) => {
//   // Helper function which creates a new Todo.todoItem and saves it into the db
//   const processThroughDB = async (listName) => {
//     const newList = new List({
//       name: listName,
//     });
//     console.log(newList);
//     const savedList = await newList.save();
//     console.log(`Dummy list saved! -> ${savedList}`);
//     return savedList;
//   };
//
//   // For each dummyTodoObj, process it with processThroughDB (which creates a new Todo.todoItem and saves it into the db) then we res.send the savedTodo
//   dummyLists.forEach(async (listName) => {
//     try {
//       processThroughDB(listName);
//     } catch (err) {
//       console.log(err);
//     }
//   });
//
//   res.send("Dummy lists created...");
// });

listRouter.put("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    list.name = req.query.name;
    list.color = req.query.color;
    const updatedList = await list.save();
    res.json(updatedList);
  } catch (error) {
    res.send(error);
  }
});

listRouter.delete("/:id", async (req, res) => {
  try {
    // get list that will be deleted
    const listToDelete = await List.findById(req.params.id);
    // get todos attached to that list
    // const todosToDelete = await Todo.find({ list: listToDelete.name });
    // console.log(todosToDelete);
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
