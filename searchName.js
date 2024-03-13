import mongoose from "mongoose";

async function main() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/user");
    console.log("Connected to MongoDB");

    await getUsers();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main().catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

const getUsers = async () => {
  try {
    const users = await User.find({ name: "Sarah" });
    users.forEach((user) => console.log(user));
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};
