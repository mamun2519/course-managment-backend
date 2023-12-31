import { Schema, model } from "mongoose";
import { CourseModel, ICourse } from "./course.interface";

// Course Schema
export const CourseSchema = new Schema<ICourse, CourseModel>(
  {
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
    like: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Course Model
export const Course = model<ICourse, CourseModel>("Courses", CourseSchema);
