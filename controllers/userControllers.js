import UserModel from "../models/UserModel";
import getResponseUser from "../helpers/getResponseUser";

export const getCurrentUser = async (request, response) => {
  const user = await UserModel.findById(request.session.user.id);
  response.json({ user: getResponseUser({ user }) });
};

export const deleteAddress = async (request, response) => {
  const { addressID } = request.params;
  const user = await UserModel.findById(request.session.user.id);
  if (!user.addresses.id(addressID)) {
    return response.json({ user: getResponseUser({ user }) });
  }
  user.addresses.id(addressID).remove();
  await user.save();
  const responseUser = getResponseUser({ user });
  request.session.user = responseUser;
  response.json({ user: responseUser });
};

export const saveAddress = async (request, response) => {
  const { address } = request.body;
  const user = await UserModel.findById(request.session.user.id);
  user.addresses.push(address);
  await user.save();
  const responseUser = getResponseUser({ user });
  request.session.user = responseUser;
  response.json({ user: responseUser });
};
