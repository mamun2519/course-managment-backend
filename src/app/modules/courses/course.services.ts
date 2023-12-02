import { StatusCodes } from "http-status-codes";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseFromDB = async (data: ICourse): Promise<ICourse> => {
  const course = await Course.create(data);
  return course;
};

const courseDetailsByIdFromId = async (id: string): Promise<ICourse | null> => {
  const course = await Course.findById(id);
  return course;
};

const CourseDeleteByIdFromDB = async (id: string): Promise<ICourse | null> => {
  console.log(id);
  const course = await Course.findByIdAndDelete(id);
  return course;
};

export const TeamService = {
  createCourseFromDB,
  courseDetailsByIdFromId,
  CourseDeleteByIdFromDB,
};
