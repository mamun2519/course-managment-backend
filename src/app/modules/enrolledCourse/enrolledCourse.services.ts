import { StatusCodes } from "http-status-codes";
import { IEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import API_Error from "../../../error/apiError";

const createEnrolledCourseFromDB = async (
  data: IEnrolledCourse
): Promise<IEnrolledCourse> => {
  const existTeam = await EnrolledCourse.findOne({
    userId: data.userId,
    course: data.course,
  });
  if (existTeam) {
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      "Already enrolled this course "
    );
  }

  const course = await EnrolledCourse.create(data);
  return course;
};

const myEnrolledCourseFromDB = async (
  userId: string
): Promise<IEnrolledCourse[]> => {
  const myCourse = await EnrolledCourse.find({ userId }).populate("course");
  return myCourse;
};

const deleteEnrolledCourseFromDB = async (
  id: string
): Promise<{ message: string } | null> => {
  await EnrolledCourse.findByIdAndDelete(id);
  return {
    message: "Deleted",
  };
};

export const EnrolledCourseService = {
  createEnrolledCourseFromDB,
  myEnrolledCourseFromDB,
  deleteEnrolledCourseFromDB,
};
