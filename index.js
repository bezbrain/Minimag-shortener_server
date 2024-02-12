const express = require("express");
require("express-async-error");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authRouter = require("./routes/auth.route");

const app = express();

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
