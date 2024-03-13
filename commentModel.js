import mongoose from "mongoose";
import Comment from "./commentModel.js";

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
}

main().catch((err) => console.log(err));

const addComments = async () => {
  try {
    const comment1 = new Comment({
      content: "This is a great post!",
      author: "userId1",
      post: "postId1",
    });

    const comment2 = new Comment({
      content: "Nice work!",
      author: "userId2",
      post: "postId1",
    });

    await comment1.save();
    await comment2.save();

    console.log("Comments added successfully");
  } catch (error) {
    console.error("Error adding comments:", error);
  }
};

addComments();
