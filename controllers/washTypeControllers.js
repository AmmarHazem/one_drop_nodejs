import { StatusCodes } from "http-status-codes";
import WashTypeModel from "../models/WashTypeModel";

export const getWashTypes = async (request, response) => {
  const washTypes = await WashTypeModel.find({});
  response.json({
    count: washTypes.length,
    washTypes,
  });
};

export const createWashType = async (request, response) => {
  const { name, description, image, price } = request.body;
  const washType = await WashTypeModel.create({
    name,
    description,
    image,
    price,
  });
  response.status(StatusCodes.CREATED).json({ washType });
};
