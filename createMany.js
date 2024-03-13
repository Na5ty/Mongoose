import * as mongoose from "mongoose";

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
}
main().catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

const dave = new User({
  _id: 2,
  name: "Dave",
  age: 30,
  email: "dave@gmail.com",
});

const sarah = new User({
  _id: 3,
  name: "Sarah",
  age: 28,
  email: "sarah@mail.com",
});

const john = new User({
  _id: 4,
  name: "John",
  age: 25,
  email: "jon2@sa.we",
});

User.insertMany([dave, sarah, john])
  .then(() => {
    console.log("Users saved successfully");
  })
  .catch((err) => {
    console.error("Error saving users:", err);
  });
