import express from 'express'
import {createCourse,getAllCourses} from '../controller/courseController.js'
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', authenticate, isAdmin, createCourse);
router.get('/', authenticate, getAllCourses);


export default router