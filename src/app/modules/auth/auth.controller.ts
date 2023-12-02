import { Request, Response } from "express";
import sendApiResponse from "../../../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.services";
import catchAsyncFn from "../../../utils/catchAsynfn";

const signUpUser = catchAsyncFn(async (req: Request, res: Response) => {
  const result = await AuthService.signUpUserFromDB(req.body);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user singUp successfully",
    data: result,
  });
});
const loginUser = catchAsyncFn(async (req: Request, res: Response) => {
  const result = await AuthService.loginUserFromDb(req.body);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user login successfully",
    data: result,
  });
});
const forgetPassword = catchAsyncFn(async (req: Request, res: Response) => {
  const result = await AuthService.forgetPasswordFromDB(req.body);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user password successfully",
    data: result,
  });
});

export const AuthController = {
  signUpUser,
  loginUser,
  forgetPassword,
};
