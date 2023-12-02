import express from "express";
import { CourseController } from "./course.controller";

const router = express.Router();
router.post("/like/:courseId", CourseController.courseLiked);
router.post("/", CourseController.createCourse);
router.get("/:id", CourseController.courseDetails);
router.get("/", CourseController.allCourse);
export const CourseRouter = router;
