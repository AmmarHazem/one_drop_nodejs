import { StatusCodes } from "http-status-codes";
import DiscountCouponModel from "../models/DiscountCouponModel";
import getRandomInt from "../helpers/getRandomInt";

export const getDiscountCoupons = async (request, response) => {
  const coupons = await DiscountCouponModel.find({});
  response.json({
    count: coupons.length,
    coupons,
  });
};

export const createDiscountCoupon = async (request, response) => {
  const { expiryDate, discountPercentage } = request.body;
  const couponChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const couponCode = `${couponChars[getRandomInt(couponChars.length)]}${
    couponChars[getRandomInt(couponChars.length)]
  }${couponChars[getRandomInt(couponChars.length)]}${
    couponChars[getRandomInt(couponChars.length)]
  }${couponChars[getRandomInt(couponChars.length)]}${
    couponChars[getRandomInt(couponChars.length)]
  }`;
  const coupon = await DiscountCouponModel.create({
    code: couponCode,
    expiryDate,
    discountPercentage,
  });
  response.status(StatusCodes.CREATED).json({ coupon });
};
