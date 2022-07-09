import "dotenv/config";
import "express-async-errors";
import express from "express";
import authRouter from "./routes/authRouter";
import routeNotFoundMiddleware from "./middleware/routeNotFoundMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import EmailVerificationCodeModel from "./models/EmailVerificationCode";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/testing-here", async (request, response) => {
  const codes = await EmailVerificationCodeModel.find().sort("-_id");
  response.json({ codes });
});
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
