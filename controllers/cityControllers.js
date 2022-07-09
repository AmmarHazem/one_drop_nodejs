import CityModel from "../models/CityModel";

export const getCities = async (request, response) => {
  const cities = await CityModel.find({});
  response.json({ cities });
};

export const createCity = async (request, response) => {
  const { name, country } = request.body;
  const city = await CityModel.create({ name, country });
  response.json({ city });
};
