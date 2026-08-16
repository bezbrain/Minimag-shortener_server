import express from "express";
import "express-async-errors";
import "dotenv/config";
import ErrorHandlerMiddleware from "./middleware/error-handler";
import NotFoundMiddleware from "./middleware/not-found";
import authRouter from "./routes/auth.route";
import linkRouter from "./routes/link.route";
import cusLinkRouter from "./routes/cusLink.route";
import linkDetailsRouter from "./routes/linkDetails.route";
import analyticsRouter from "./routes/analytics.routes";
import demoShortLinkRouter from "./routes/demo/shortUrl.route";
import demoCusLinkRouter from "./routes/demo/cusUrl.route";
import demoDetailsRouter from "./routes/demo/demoDetails.route";
import connectDB from "./db/connect";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
import authMiddleware from "./middleware/auth";

const app = express();

app.use(express.json());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 3002;

app.get("/", (_req, res) => {
  res.send("Home page");
});

app.use("/", demoShortLinkRouter);
app.use("/", demoCusLinkRouter);
app.use("/api/v1", demoDetailsRouter);

app.use("/api/v1", authRouter);
app.use("/", linkRouter);
app.use("/", cusLinkRouter);
app.use("/api/v1", authMiddleware, linkDetailsRouter);
app.use("/api/v1", authMiddleware, analyticsRouter);

app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startDB();
