import mongoose from "mongoose";

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
}
main().catch((err) => console.log(err));

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name was Defined!"],
  },
  score: {
    type: Number,
    min: [1, "Score must be at least 1"],
    max: [10, "Score must be at most 10"],
  },
  review: {
    type: String,
    default: "No review DEEZ NUTS!",
  },
});

const personSchema = new mongoose.Schema({
  name: String,
  alter: Number,
  email: String,
  review: reviewSchema,
});

const Review = mongoose.model("Review", reviewSchema);

const Person = mongoose.model("Person", personSchema);

const laptop = new Review({
  name: "Laptop 1",
  score: 9,
  review: "Great Laptop.",
});

const createPerson = async () => {
  try {
    const person = new Person({
      name: "Lukas",
      alter: 34,
      email: "lukas@we.dw",
      review: laptop,
    });
    await person.save();
    console.log("Person created successfully:", person);
  } catch (error) {
    console.error("Error creating person:", error);
  }
};

createPerson();
