import mongoose from "mongoose";

async function main() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/user");
    console.log("Connected to MongoDB");

    await updateUser();
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

const updateUser = async () => {
  try {
    const userToUpdate = await User.findOne({ _id: 2 });

    if (!userToUpdate) {
      console.log("User not found.");
      return;
    }

    userToUpdate.name = "Updated Name";
    userToUpdate.age = 35;
    userToUpdate.email = "updated@email.com";

    const updatedUser = await userToUpdate.save();
    console.log("User updated successfully:", updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
  }
};
