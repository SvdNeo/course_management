import * as courseService from '../services/courseService.js';


export const createCourse = async (req, res) => {
    try {
        const { name, instructor_id, description, price } = req.body;
         const newCourse = await courseService.createCourseService(name, instructor_id, description, price);
            res.status(201).json({ message: 'Course created successfully', courseId: newCourse.id });
    } catch (err) {
    
        let customMessage;
        if (err.code === 'ER_DUP_ENTRY') {
            customMessage = 'Course already exists. Please choose a different name.';
        } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            customMessage = 'The specified instructor does not exist. Please select a valid instructor.';
        } else if (err.message.includes('validation failed')) {
            customMessage = 'Invalid course data. Please check the inputs and try again.';
        } else {
            customMessage = 'An unexpected error occurred while creating the course.';
        }

        res.status(400).json({ message: customMessage });
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

export const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCourse = await courseService.deleteCourseService(id);
        if (!deletedCourse.affectedRows) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


