const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const todoSchema = new mongoose.Schema({
  todo: String,
  dueDate: String,
  completed: Boolean,
  list: listSchema,
});

const listSchema = new mongoose.Schema({
  name: String,
  list: [todoSchema],
});

module.exports = {
  Todo: mongoose.model("Todo", todoSchema),
  List: mongoose.model("List", listSchema),
};
