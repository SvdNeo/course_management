import express from 'express'
import {createCourse} from '../controller/courseController.js'
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', authenticate, isAdmin, createCourse);


export default router