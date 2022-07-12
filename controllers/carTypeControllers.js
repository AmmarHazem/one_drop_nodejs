import { StatusCodes } from "http-status-codes";
import CarTypeModel from "../models/CarTypeModel";

export const getCarTypes = async (request, response) => {
  const carTypes = await CarTypeModel.find({});
  response.json({
    count: carTypes.length,
    carTypes,
  });
};

export const createCarType = async (request, response) => {
  const { size, washingDurationInSeconds, price } = request.body;
  const carType = await CarTypeModel.create({
    size,
    washingDurationInSeconds,
    price,
  });
  response.status(StatusCodes.CREATED).json({ carType });
};
