import UserModel from "../models/UserModel";
import getRandomInt from "../helpers/getRandomInt";
import sendEmail from "../helpers/sendEmail";
import CustomErrors from "../errors";

export const logout = async (request, response) => {
  await request.session.destroy();
  response.json({});
};

export const signUp = async (request, response) => {
  const { userID, name, phone, city, neighborhood } = request.body;
  if (!userID || !name || !phone || !city) {
    throw new CustomErrors.BadRequestError(
      "userID, name, phone and city are required"
    );
  }
  const user = await UserModel.findByIdAndUpdate(
    userID,
    {
      name,
      phone,
      city,
      neighborhood,
      didRegister: true,
    },
    { runValidators: true, new: true }
  );
  const responseUser = getResponseUser({ user });
  request.session.user = responseUser;
  response.json({ user: responseUser });
};

export const otpSignIn = async (request, response) => {
  const { email, otp } = request.body;
  const user = await UserModel.findOne({ email, otp });
  if (!user) {
    throw new CustomErrors.NotFoundError("invalid email or otp");
  } else if (user.isOTPExpired) {
    throw new CustomErrors.NotFoundError("invalid email or otp");
  }
  user.otpCreatedAt = null;
  await user.save();
  const responseUser = getResponseUser({ user });
  if (user.didRegister) {
    request.session.user = responseUser;
  }
  response.json({ user: responseUser });
  //   const lastVerificationCodeForThisEmail =
  //     await EmailVerificationCodeModel.find().sort("-_id").findOne({ email });
  //   if (!lastVerificationCodeForThisEmail) {
  //     throw new CustomErrors.BadRequestError("invalid email");
  //   } else if (lastVerificationCodeForThisEmail.isExpired) {
  //     throw new CustomErrors.BadRequestError("invalid email");
  //   } else if (lastVerificationCodeForThisEmail.code !== code) {
  //     throw new CustomErrors.BadRequestError("invalid email");
  //   }
  //   lastVerificationCodeForThisEmail.isVerified = true;
  //   await lastVerificationCodeForThisEmail.save();
  //   response.json({ email });
};

export const sendEmailOTP = async (request, response) => {
  const { email } = request.body;
  const otp = `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(
    10
  )}${getRandomInt(10)}`;
  const user = await UserModel.getOrCreate({
    getQuery: { email },
    createData: { otp, otpCreatedAt: new Date() },
  });
  user.otp = otp;
  await Promise.all([
    user.save(),
    sendEmail({
      to: email,
      subject: "Onedrop email verification code",
      text: `Your email verfication code is ${user.otp}`,
    }),
  ]);
  response.json({
    user: getResponseUser({ user }),
  });
};

const getResponseUser = ({ user }) => {
  return {
    id: user.id,
    email: user.email,
    didRegister: user.didRegister,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    city: user.city,
    name: user.name,
    phone: user.phone,
  };
};
