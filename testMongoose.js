const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/db?authSource=$admin --username superuser",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function () {
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow, my name is " + this.name
      : "I don't have a name";

    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);

  const fluffy = new Kitten({ name: "fluffy" });
  
    //   fluffy.save(function (err, fluffy) {
    //       if (err) return console.error(err);
    //       fluffy.speak();
    //   });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    })
});
