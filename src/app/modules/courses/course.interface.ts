import { Model } from "mongoose";
// course interface
export type ICourse = {
  _id: string;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: "Open" | "Closed" | "In Progress";
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  students: {
    id: number;
    name: string;
    email: string;
  }[];
};
export type CourseModel = Model<ICourse, Record<string, unknown>>;
// user filters
export type ICourseFilters = {
  searchTerm: string;
  name: string;
  instructor: string;
};
