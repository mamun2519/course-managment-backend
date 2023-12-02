import express from "express";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.post("/", EnrolledCourseController.createEnrolledCourse);
router.get("/:id", EnrolledCourseController.enrolledCourseDetails);
router.delete("/:id", EnrolledCourseController.deleteEnrolledCourse);
router.patch("/:id", EnrolledCourseController.updatedEnrolledCourse);
router.get("/", auth(), EnrolledCourseController.myEnrolledCourse);
export const EnrolledCourseRoute = router;
