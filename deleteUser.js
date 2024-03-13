import mongoose from "mongoose";

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

User.deleteOne({ _id: 2 })
  .then(() => {
    console.log("User deleted successfully");
  })
  .catch((err) => {
    console.error("Error deleting user:", err);
  });
