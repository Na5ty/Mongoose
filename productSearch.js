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

const getProductsByCategory = async (category) => {
  try {
    const products = await Product.find({ category });
    console.log(`Products in category ${category}:`, products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }
};

getProductsByCategory("Elektronik");
