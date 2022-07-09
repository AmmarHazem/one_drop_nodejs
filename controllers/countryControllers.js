import CountryModel from "../models/CountryModel";

export const getCountries = async (request, response) => {
  const countries = await CountryModel.find({});
  response.json({ countries });
};

export const createCountry = async (request, response) => {
  const { name } = request.body;
  const country = await CountryModel.create({ name });
  response.json({ country });
};
