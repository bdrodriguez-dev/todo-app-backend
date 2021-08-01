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
  list: String,
});

module.exports = mongoose.model("Todo", todoSchema);
