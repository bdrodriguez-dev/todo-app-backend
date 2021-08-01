const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Setting up listSchema and model
const listSchema = new mongoose.Schema({
  name: String,
  list: [],
});

module.exports = mongoose.model("List", listSchema);
