import * as courseService from '../services/courseService.js';


export const createCourse = async (req, res) => {
    try {
        const { name, instructor_id, description, price } = req.body;
     
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const newCourse = await courseService.createCourseService(name, instructor_id, description, price);
        res.status(201).json(newCourse.id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCoursesService();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseByIdService(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });   
            }
            res.status(200).json(course);
            } catch (err) {
                res.status(500).json({ message: err.message });
                }
                };

   
export const editCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, instructor_id, description, price } = req.body;
               const updatedCourse = await courseService.editCourseService(id, name, instructor_id, description, price);

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
