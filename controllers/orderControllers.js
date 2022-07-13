import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/OrderModel";
import WashTypeModel from "../models/WashTypeModel";
import CarTypeModel from "../models/CarTypeModel";
import DiscountCouponModel from "../models/DiscountCouponModel";
import CustomErrors from "../errors";
import UserModel from "../models/UserModel";
import stripe from "stripe";

export const createOrderPaymentIntent = async (request, response) => {
  const stripeInstance = stripe(process.env.STRIPE_SK);
  const { orderID } = request.body;
  const order = await OrderModel.findOne({
    _id: orderID,
    createdBy: request.session.user.id,
    status: "PENDING_PAYMENT",
  });
  if (!order) {
    throw new CustomErrors.NotFoundError("Order not found");
  }
  const total = order.total;
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: total * 100,
    currency: "aed",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  response.json({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (request, response) => {
  const orders = await OrderModel.find({ createdBy: request.session.user.id });
  response.json({
    count: orders.length,
    orders,
  });
};

export const createOrder = async (request, response) => {
  const { washTypeID, carTypeID, addressID, couponCode } = request.body;
  let promiseResults = await Promise.all([
    WashTypeModel.findById(washTypeID),
    CarTypeModel.findById(carTypeID),
    DiscountCouponModel.findOne({ code: couponCode }),
    UserModel.findById(request.session.user.id),
  ]);
  const washType = promiseResults[0];
  const carType = promiseResults[1];
  const coupon = promiseResults[2];
  const user = promiseResults[3];
  const address = user?.addresses.find((address) => address.id === addressID);
  if (!address) {
    throw new CustomErrors.BadRequestError("Invalid address ID");
  }
  if (!washType) {
    throw new CustomErrors.BadRequestError("Invalid wash type ID");
  }
  if (!carType) {
    throw new CustomErrors.BadRequestError("Invalid car type ID");
  }
  const createOrderObject = {
    washType,
    carType,
    address,
    createdBy: request.session.user.id,
  };
  if (coupon) {
    const usedCouponBefore = coupon.usedBy.find(
      (couponUser) => couponUser.user.toString() === request.session.user.id
    );
    if (usedCouponBefore) {
      throw new CustomErrors.BadRequestError("Invalid coupon code");
    }
    coupon.usedBy.push({ user: request.session.user.id, usedAt: new Date() });
    createOrderObject.coupon = coupon;
  }
  promiseResults = await Promise.all([
    coupon?.save(),
    OrderModel.create(createOrderObject),
  ]);
  const order = promiseResults[1];
  response.status(StatusCodes.CREATED).json({ order });
};
