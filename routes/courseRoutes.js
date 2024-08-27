import express from 'express'
import {createCourse,getAllCourses,getCourseById,editCourse,deleteCourse} from '../controller/courseController.js'
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', authenticate, isAdmin, createCourse);
router.get('/', authenticate, getAllCourses);
router.get('/:id',authenticate,getCourseById)
router.put('/:id', authenticate, editCourse);
router.delete('/:id',authenticate,deleteCourse)

export default router