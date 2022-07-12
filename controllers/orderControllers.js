import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/OrderModel";

export const getOrders = async (request, response) => {
  const orders = await OrderModel.find({ createdBy: request.session.user.id });
  response.json({
    count: orders.length,
    orders,
  });
};

export const createOrder = async (request, response) => {
  const { washType, carType, address, coupon } = request.body;
  const order = await OrderModel.create({
    washType,
    carType,
    address,
    coupon,
    createdBy: request.session.user.id,
  });
  response.status(StatusCodes.CREATED).json({ order });
};
