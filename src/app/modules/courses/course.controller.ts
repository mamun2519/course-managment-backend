import { Request, Response } from "express";

import sendApiResponse from "../../../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import catchAsyncFn from "../../../utils/catchAsynfn";
import { CourseService } from "./course.services";
import pick from "../../../utils/pick";
import { CourseFilterAbleFiled } from "./course.constant";
import { paginationSpeared } from "../../../constants/pagination";

const createCourse = catchAsyncFn(async (req: Request, res: Response) => {
  const result = await CourseService.createCourseFromDB(req.body);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "team create successfully",
    data: result,
  });
});

const allCourse = catchAsyncFn(async (req: Request, res: Response) => {
  // search and filter speared

  const filter: any = pick(req.query, CourseFilterAbleFiled);
  console.log(filter);
  // pagination speared
  const pagination = pick(req.query, paginationSpeared);
  const result = await CourseService.getAllCourseFromDB(filter, pagination);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "my team Fetch successfully",
    data: result,
  });
});
const courseDetails = catchAsyncFn(async (req: Request, res: Response) => {
  const result = await CourseService.courseDetailsByIdFromId(req.params.id);
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "deleteTeam successfully",
    data: result,
  });
});

export const CourseController = {
  allCourse,
  createCourse,
  courseDetails,
};
