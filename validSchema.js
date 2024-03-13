import mongoose from "mongoose";

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/productsDB");
}

main().catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["Elektronik", "Kleidung", "Lebensmittel", "Haushalt"],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

(async () => {
  try {
    await main();
    console.log("Connected to MongoDB");

    const product = new Product({
      name: "Laptop",
      description: "Ein neuer Laptop",
      price: 1000,
      category: "Elektronik",
      stock: 10,
    });

    await product.save();
    console.log("Product saved successfully");
  } catch (error) {
    console.error("Error saving product:", error);
  }
})();
