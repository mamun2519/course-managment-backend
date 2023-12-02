import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IEnrolledCourse = {
  userId: Types.ObjectId | IUser;
  course: Types.ObjectId | IUser;
};

export type EnrolledCourseModel = Model<
  IEnrolledCourse,
  Record<string, unknown>
>;
