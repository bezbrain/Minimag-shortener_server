const express = require("express");
require("express-async-errors");
require("dotenv").config();
const ErrorHandlerMiddleware = require("./middleware/error-handler");
const NotFoundMiddleware = require("./middleware/not-found");
const authRouter = require("./routes/auth.route");
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1", authRouter);

app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startDB();
