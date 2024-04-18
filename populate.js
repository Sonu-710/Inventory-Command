require("dotenv").config();

const connectDB = require("./db/connect");
const connection = require("./db/connect");
const Product = require("./Model/product");

const jsonProducts = require("./products.json");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.create(jsonProducts);
    console.log("Connection successful");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
