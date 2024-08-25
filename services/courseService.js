import { createCourseQuery,getAllCoursesQuery } from '../database/courseQueries.js';

export const createCourseService = (name, instructor_id, description, price) => {
    return new Promise((resolve, reject) => {
        createCourseQuery(name, instructor_id, description, price, (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, name, instructor_id, description, price });
        });
    });
};

export const getAllCoursesService = () => {
    return new Promise((resolve, reject) => {
        getAllCoursesQuery((err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};