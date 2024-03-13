const mongoose = require("mongoose");

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
  console.log("Connected to MongoDB");
}

main().catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

const john = new User({
  _id: 1,
  name: "John",
  age: 25,
  email: "john@email.com",
});

john
  .save()
  .then(() => {
    console.log("User saved successfully");
  })
  .catch((err) => {
    console.error("Error saving user:", err);
  });
