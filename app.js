import "dotenv/config";
import "express-async-errors";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes";
import routeNotFoundMiddleware from "./middleware/routeNotFoundMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import countryRoutes from "./routes/countryRoutes";
import cityRoutes from "./routes/cityRoutes";
import userRoutes from "./routes/userRoutes";
import carTypeRoutes from "./routes/carTypeRoutes";
import discountCouponRoutes from "./routes/discountCouponRoutes";
import washTypeRoutes from "./routes/washTypeRoutes";
import uploadFileRoutes from "./routes/uploadFileRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
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

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload-file", uploadFileRoutes);
app.use("/api/v1/wash-types", washTypeRoutes);
app.use("/api/v1/discount-coupons", discountCouponRoutes);
app.use("/api/v1/car-types", carTypeRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/countries", countryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/testing-here", async (request, response) => {
  const user = request.session.user;
  response.json({ user });
});
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
