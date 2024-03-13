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

calculateAverageRating();
