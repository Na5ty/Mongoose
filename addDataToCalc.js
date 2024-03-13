import mongoose from "mongoose";

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
}
main().catch((err) => console.log(err));

const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  rating: Number,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const addFruits = async () => {
  try {
    await Fruit.insertMany([
      { name: "Apple", color: "Red", rating: 8 },
      { name: "Banana", color: "Yellow", rating: 9 },
      { name: "Orange", color: "Orange", rating: 7 },
    ]);
    console.log("Fruits added successfully");
  } catch (error) {
    console.error("Error adding fruits:", error);
  }
};

const calculateAverageRating = async () => {
  try {
    const averageRating = await Fruit.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    console.log("Average rating:", averageRating[0].averageRating);
  } catch (error) {
    console.error("Error calculating average rating:", error);
  }
};

// Funktionen aufrufen
addFruits().then(calculateAverageRating);
