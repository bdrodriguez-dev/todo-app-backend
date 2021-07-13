const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./todos");

// Use static server
app.use(express.static("public"));

// Enable cross origin resource sharing
app.use(cors());

// Load todoRouter for todo related routes
app.use("/todos", todoRouter);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
