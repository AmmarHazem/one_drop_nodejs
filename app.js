import "dotenv/config";
import "express-async-errors";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes";
import routeNotFoundMiddleware from "./middleware/routeNotFoundMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import countryRoutes from "./routes/countryRoutes";
import cityRoutes from "./routes/cityRoutes";

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: oneDay,
    },
  })
);
app.use(express.json());

app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/countries", countryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/testing-here", async (request, response) => {
  console.log("--- session", request.session);
  const user = request.session.user;
  response.json({ user });
});
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
