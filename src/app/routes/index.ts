import express from "express";

import { AuthRouter } from "../modules/auth/auth.route";
import { CourseRouter } from "../modules/courses/course.route";
import { EnrolledCourseRoute } from "../modules/enrolledCourse/enrolledCourse.route";
const router = express.Router();

// all module route is here
const AllModuleRoutes = [
  { path: "/auth", router: AuthRouter },
  { path: "/course", router: CourseRouter },
  { path: "/enrolled-course", router: EnrolledCourseRoute },
];

AllModuleRoutes.forEach((route) => router.use(route.path, route.router));

export const RootRoutes = router;
