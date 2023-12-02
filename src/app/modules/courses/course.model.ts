import { Schema, model } from "mongoose";
import { CourseModel, ICourse } from "./course.interface";

// User Schema
export const CourseSchema = new Schema<ICourse, CourseModel>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: {
      type: String,
      enum: ["Open", "Closed", "In Progress"],
      required: true,
    },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: { type: [String], required: true },
    syllabus: {
      type: [
        {
          week: { type: Number, required: true },
          topic: { type: String, required: true },
          content: { type: String, required: true },
        },
      ],
      required: true,
    },
    students: {
      type: [
        {
          id: { type: Number, required: true },
          name: { type: String, required: true },
          email: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// User Model
export const User = model<ICourse, CourseModel>("Courses", CourseSchema);
