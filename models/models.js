const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const todoSchema = new mongoose.Schema({
  todo: String,
  dueDate: String,
  completed: { type: Boolean, default: false},
  list: { type: String, default: "inbox" },
});

const listSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  color: String,
});

module.exports = {
  Todo: mongoose.model("Todo", todoSchema),
  List: mongoose.model("List", listSchema),
};
