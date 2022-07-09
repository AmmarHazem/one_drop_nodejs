import EmailVerificationCodeModel from "../models/EmailVerificationCode";
import getRandomInt from "../helpers/getRandomInt";
import sendEmail from "../helpers/sendEmail";

export const sendEmailVerification = async (request, response) => {
  const { email } = request.body;
  const verificationCode = `${getRandomInt(10)}${getRandomInt(
    10
  )}${getRandomInt(10)}${getRandomInt(10)}`;
  const verficationCodeModel = await EmailVerificationCodeModel.create({
    code: verificationCode,
    email,
  });
  await sendEmail({
    to: email,
    subject: "Onedrop email verification code",
    text: `Your email verfication code is ${verficationCodeModel.code}`,
  });
  response.json({ email: verficationCodeModel.email });
};
