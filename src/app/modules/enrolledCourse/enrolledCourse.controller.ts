import { Request, Response } from "express";

import sendApiResponse from "../../../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import { EnrolledCourseService } from "./enrolledCourse.services";
import catchAsyncFn from "../../../utils/catchAsynfn";

const createEnrolledCourse = catchAsyncFn(
  async (req: Request, res: Response) => {
    const result = await EnrolledCourseService.createEnrolledCourseFromDB(
      req.body
    );
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course enrolled  successfully",
      data: result,
    });
  }
);

const myEnrolledCourse = catchAsyncFn(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await EnrolledCourseService.myEnrolledCourseFromDB(
    user.userId as string
  );
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My enrolled course Fetch successfully",
    data: result,
  });
});
const deleteEnrolledCourse = catchAsyncFn(
  async (req: Request, res: Response) => {
    const result = await EnrolledCourseService.deleteEnrolledCourseFromDB(
      req.params.id
    );
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course enrolled  delete successfully",
      data: result,
    });
  }
);

const enrolledCourseDetails = catchAsyncFn(
  async (req: Request, res: Response) => {
    const result = await EnrolledCourseService.enrolledCourseDetailsByIdFromId(
      req.params.id
    );
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course enrolled  fetched successfully",
      data: result,
    });
  }
);

const updatedEnrolledCourse = catchAsyncFn(
  async (req: Request, res: Response) => {
    const result = await EnrolledCourseService.enrolledCourseUpdateByIntoDB(
      req.params.id,
      req.body
    );
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course enrolled  updated successfully",
      data: result,
    });
  }
);
export const EnrolledCourseController = {
  createEnrolledCourse,
  myEnrolledCourse,
  deleteEnrolledCourse,
  enrolledCourseDetails,
  updatedEnrolledCourse,
};
