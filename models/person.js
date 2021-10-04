const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url =
  "mongodb+srv://Siam:chhoaapi@cluster0.lb5pf.mongodb.net/phonebook-app?retryWrites=true&w=majority";

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  number: String,
  date: Date,
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
