const express = require("express");
require("express-async-errors");
require("dotenv").config();
const ErrorHandlerMiddleware = require("./middleware/error-handler");
const NotFoundMiddleware = require("./middleware/not-found");
const authRouter = require("./routes/auth.route");
const linkRouter = require("./routes/link.route");
const cusLinkRouter = require("./routes/cusLink.route");
const linkDetailsRouter = require("./routes/linkDetails.route");
const analyticsRouter = require("./routes/analytics.routes");
const connectDB = require("./db/connect");

// Security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(express.json());

// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per window (here, per 15 minutes).
//     standardHeaders: "draft-7", // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
//     legacyHeaders: false, // Disable the X-RateLimit-* headers.
//     // store: ... , // Use an external store for consistency across multiple server instances.
//   })
// );
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1", authRouter);
app.use("/", linkRouter);
app.use("/", cusLinkRouter);
app.use("/api/v1", authMiddleware, linkDetailsRouter);
app.use("/api/v1", authMiddleware, analyticsRouter);

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
