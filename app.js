const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./Router/product");

require("dotenv").config();
require("express-async-errors");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    //Connect DB
    await connectDB(process.env.MONGO_URI);
    console.log("DB connection successful");
    app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
