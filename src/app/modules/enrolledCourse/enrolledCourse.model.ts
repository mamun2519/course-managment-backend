import { Schema, model } from "mongoose";
import {
  EnrolledCourseModel,
  IEnrolledCourse,
} from "./enrolledCourse.interface";

// enrolled Schema
export const EnrolledCourseSchema = new Schema<
  IEnrolledCourse,
  EnrolledCourseModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Course Enrolled Model
export const EnrolledCourse = model<IEnrolledCourse, EnrolledCourseModel>(
  "Enrolled",
  EnrolledCourseSchema
);
