import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

const createProduct = async () => {
  try {
    const laptop = new Product({
      name: "Laptop",
      description: "A new laptop",
      price: 1000,
    });
    await laptop.save();
    console.log("Product created successfully:", laptop);
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

createProduct();
