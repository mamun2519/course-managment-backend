import { StatusCodes } from "http-status-codes";
import { ICourse, ICourseFilters } from "./course.interface";
import { Course } from "./course.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { PaginationHelper } from "../../../utils/pagination";
import { CourseSearchAbleFiled } from "./course.constant";
import { SortOrder } from "mongoose";
import API_Error from "../../../error/apiError";
import { User } from "../auth/auth.model";

const createCourseFromDB = async (data: ICourse): Promise<ICourse> => {
  const course = await Course.create(data);
  return course;
};

const courseDetailsByIdFromId = async (id: string): Promise<ICourse | null> => {
  const course = await Course.findById(id);
  return course;
};

// const CourseDeleteByIdFromDB = async (id: string): Promise<ICourse | null> => {
//   console.log(id);
//   const course = await Course.findOneAndDelete({ _id: id });
//   return course;
// };
const getAllCourseFromDB = async (
  filter: ICourseFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(pagination);
  const { searchTerm, ...filtersData } = filter;

  console.log("filterData", filtersData);
  const andConditions = [];
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: CourseSearchAbleFiled.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // FILTERING
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filter).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  console.log(andConditions[0]);
  // Sorting
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // where conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const course = await Course.find(whereConditions).skip(skip).limit(limit);
  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: course,
  };
};

const courseLikedIntoDB = async (userId: string, courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new API_Error(StatusCodes.NOT_FOUND, "Course Not Found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new API_Error(StatusCodes.NOT_FOUND, "User Not Found");
  }

  console.log(course.likes.some((like) => like.user.equals(userId)));

  if (course.likes.some((like) => like.user.equals(userId))) {
    // return res.status(400).json({ message: "User already liked the product" });
    const likeIndex = course.likes.findIndex((like) =>
      like.user.equals(user._id)
    );

    course.like -= 1;
    course.likes.splice(likeIndex, 1);
    await course.save();
  } else {
    // Add like with user ID
    course.like += 1;
    course.likes.push({ user: userId });
    await course.save();
  }
};

export const CourseService = {
  createCourseFromDB,
  courseDetailsByIdFromId,
  // CourseDeleteByIdFromDB,
  getAllCourseFromDB,
  courseLikedIntoDB,
};
