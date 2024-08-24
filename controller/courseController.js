import * as courseService from '../services/courseService.js';


export const createCourse = async (req, res) => {
    try {
        const { name, instructor_id, description, price } = req.body;
        // Ensure only admin can create a course
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const newCourse = await courseService.createCourseService(name, instructor_id, description, price);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};